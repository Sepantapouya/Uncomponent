// Main plugin code for Uncomponent
// This code runs in the Figma plugin sandbox

// Show the plugin UI
figma.showUI(__html__, { 
  width: 320, 
  height: 240,
  themeColors: true 
});

// Handle messages from the UI
figma.ui.onmessage = (msg) => {
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
  const selection = figma.currentPage.selection;
  
  if (selection.length === 0) {
    figma.ui.postMessage({
      type: 'selection-status',
      hasValidSelection: false,
      message: 'Please select a component to uncomponent'
    });
    return;
  }

  const validComponents = selection.filter(node => 
    node.type === 'COMPONENT' || 
    node.type === 'INSTANCE' ||
    (node.type === 'COMPONENT_SET')
  );

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
    message: `${validComponents.length} component(s) selected and ready to uncomponent`,
    count: validComponents.length
  });
}

// Main function to handle the uncomponent operation
function handleUncomponent() {
  const selection = figma.currentPage.selection;
  
  if (selection.length === 0) {
    figma.ui.postMessage({
      type: 'error',
      message: 'No selection found. Please select a component first.'
    });
    return;
  }

  let processedCount = 0;
  const errors: string[] = [];

  selection.forEach((node, index) => {
    try {
      if (node.type === 'COMPONENT' || node.type === 'INSTANCE') {
        uncomponentNode(node as ComponentNode | InstanceNode);
        processedCount++;
      } else if (node.type === 'COMPONENT_SET') {
        // Handle component sets by processing each variant
        const componentSet = node as ComponentSetNode;
        componentSet.children.forEach(variant => {
          if (variant.type === 'COMPONENT') {
            uncomponentNode(variant);
            processedCount++;
          }
        });
      } else {
        errors.push(`Item ${index + 1}: Not a component (${node.type})`);
      }
    } catch (error) {
      errors.push(`Item ${index + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  // Send result message to UI
  if (processedCount > 0) {
    figma.ui.postMessage({
      type: 'success',
      message: `Successfully uncomponented ${processedCount} component(s)`,
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
function uncomponentNode(node: ComponentNode | InstanceNode) {
  const parent = node.parent;
  const nodeIndex = parent ? parent.children.indexOf(node) : -1;
  
  if (!parent) {
    throw new Error('Component has no parent');
  }

  // Store the original properties
  const originalX = node.x;
  const originalY = node.y;
  const originalName = node.name;
  
  // Create a frame to hold the uncomponented content
  // Remove ALL existing (uncomponented) suffixes and add just one
  let newName = originalName
    .split('(uncomponented)')
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
  newName = `${newName} (uncomponented)`;
  
  const newFrame = figma.createFrame();
  newFrame.name = newName;
  newFrame.x = originalX;
  newFrame.y = originalY;
  
  // Copy basic properties
  newFrame.resize(node.width, node.height);
  newFrame.fills = node.fills;
  newFrame.strokes = node.strokes;
  newFrame.strokeWeight = node.strokeWeight;
  newFrame.cornerRadius = (node as any).cornerRadius || 0;
  newFrame.effects = node.effects;
  newFrame.opacity = node.opacity;
  newFrame.blendMode = node.blendMode;
  
  // Copy layout properties if they exist
  if ('layoutMode' in node && node.layoutMode !== 'NONE') {
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
  const childrenToMove = [...node.children];
  childrenToMove.forEach(child => {
    const clonedChild = child.clone();
    newFrame.appendChild(clonedChild);
  });

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
figma.on('selectionchange', () => {
  checkSelection();
}); 