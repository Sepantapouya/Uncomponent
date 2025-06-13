// Main plugin code for Uncomponent
// This code runs in the Figma plugin sandbox

// Show the plugin UI
figma.showUI(__html__, { 
  width: 320, 
  height: 240,
  themeColors: true 
});

// Handle messages from the UI
figma.ui.onmessage = function(msg) {
  switch (msg.type) {
    case 'uncomponent':
      handleUncomponent();
      break;
    case 'cancel':
      figma.closePlugin();
      break;
    case 'check-selection':
      checkSelection();
      break;
  }
};

// Check current selection and update UI accordingly
function checkSelection() {
  var selection = figma.currentPage.selection;
  
  if (selection.length === 0) {
    figma.ui.postMessage({
      type: 'selection-status',
      hasValidSelection: false,
      message: 'Please select a component to uncomponent'
    });
    return;
  }

  var validComponents = selection.filter(function(node) {
    return node.type === 'COMPONENT' || 
           node.type === 'INSTANCE' ||
           node.type === 'COMPONENT_SET';
  });

  if (validComponents.length === 0) {
    figma.ui.postMessage({
      type: 'selection-status',
      hasValidSelection: false,
      message: 'Selected items are not components. Please select a component or component instance.'
    });
    return;
  }

  figma.ui.postMessage({
    type: 'selection-status',
    hasValidSelection: true,
    message: validComponents.length + ' component(s) selected and ready to uncomponent',
    count: validComponents.length
  });
}

// Main function to handle the uncomponent operation
function handleUncomponent() {
  var selection = figma.currentPage.selection;
  
  if (selection.length === 0) {
    figma.ui.postMessage({
      type: 'error',
      message: 'No selection found. Please select a component first.'
    });
    return;
  }

  var processedCount = 0;
  var errors = [];

  for (var i = 0; i < selection.length; i++) {
    var node = selection[i];
    try {
      if (node.type === 'COMPONENT' || node.type === 'INSTANCE') {
        uncomponentNode(node);
        processedCount++;
      } else if (node.type === 'COMPONENT_SET') {
        // Handle component sets by processing each variant
        for (var j = 0; j < node.children.length; j++) {
          var variant = node.children[j];
          if (variant.type === 'COMPONENT') {
            uncomponentNode(variant);
            processedCount++;
          }
        }
      } else {
        errors.push('Item ' + (i + 1) + ': Not a component (' + node.type + ')');
      }
    } catch (error) {
      errors.push('Item ' + (i + 1) + ': ' + (error.message || 'Unknown error'));
    }
  }

  // Send result message to UI
  if (processedCount > 0) {
    figma.ui.postMessage({
      type: 'success',
      message: 'Successfully uncomponented ' + processedCount + ' component(s)',
      errors: errors.length > 0 ? errors : undefined
    });
  } else {
    figma.ui.postMessage({
      type: 'error',
      message: 'No components were processed',
      errors: errors
    });
  }
}

// Function to uncomponent a single node
function uncomponentNode(node) {
  var parent = node.parent;
  var nodeIndex = parent ? parent.children.indexOf(node) : -1;
  
  if (!parent) {
    throw new Error('Component has no parent');
  }

  // Store the original properties
  var originalX = node.x;
  var originalY = node.y;
  var originalName = node.name;
  
  // Create a frame to hold the uncomponented content
  // Remove ALL existing (uncomponented) suffixes and add just one
  var newName = originalName
    .split('(uncomponented)')
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
  newName = newName + ' (uncomponented)';
  
  var newFrame = figma.createFrame();
  newFrame.name = newName;
  newFrame.x = originalX;
  newFrame.y = originalY;
  
  // Copy basic properties
  newFrame.resize(node.width, node.height);
  newFrame.fills = node.fills;
  newFrame.strokes = node.strokes;
  newFrame.strokeWeight = node.strokeWeight;
  newFrame.cornerRadius = node.cornerRadius || 0;
  newFrame.effects = node.effects;
  newFrame.opacity = node.opacity;
  newFrame.blendMode = node.blendMode;
  
  // Copy layout properties if they exist
  if (node.layoutMode && node.layoutMode !== 'NONE') {
    newFrame.layoutMode = node.layoutMode;
    newFrame.primaryAxisSizingMode = node.primaryAxisSizingMode;
    newFrame.counterAxisSizingMode = node.counterAxisSizingMode;
    newFrame.primaryAxisAlignItems = node.primaryAxisAlignItems;
    newFrame.counterAxisAlignItems = node.counterAxisAlignItems;
    newFrame.itemSpacing = node.itemSpacing;
    newFrame.paddingTop = node.paddingTop;
    newFrame.paddingRight = node.paddingRight;
    newFrame.paddingBottom = node.paddingBottom;
    newFrame.paddingLeft = node.paddingLeft;
  }

  // Clone and move all children
  var childrenToMove = [];
  for (var i = 0; i < node.children.length; i++) {
    childrenToMove.push(node.children[i]);
  }
  
  for (var i = 0; i < childrenToMove.length; i++) {
    var child = childrenToMove[i];
    var clonedChild = child.clone();
    newFrame.appendChild(clonedChild);
  }

  // Insert the new frame at the same position as the original component
  if (nodeIndex >= 0) {
    parent.insertChild(nodeIndex, newFrame);
  } else {
    parent.appendChild(newFrame);
  }

  // Remove the original component
  node.remove();
  
  // Select the new frame
  figma.currentPage.selection = [newFrame];
}

// Initialize by checking selection
checkSelection();

// Listen for selection changes
figma.on('selectionchange', function() {
  checkSelection();
}); 