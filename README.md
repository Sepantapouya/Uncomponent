# 🔧 Uncomponent

A Figma plugin that converts components back to regular frames while preserving all their content, layout, and styling properties.

## What does it do?

When you have a component in Figma that you want to "break" or convert back to a regular frame (perhaps for one-off customizations), Uncomponent does exactly that. It takes your selected component(s) and creates identical frames with all the same content, but without the component constraints.

## Features

- ✅ **Convert components to frames** - Maintains all visual properties
- ✅ **Preserve layout properties** - Auto-layout, padding, spacing all maintained  
- ✅ **Batch processing** - Select multiple components and convert them all at once
- ✅ **Smart naming** - Adds "(uncomponented)" suffix without duplicates
- ✅ **Instance support** - Works with both master components and instances
- ✅ **Component set support** - Handles component variants

## How to use in Figma

### Step 1: Install the plugin
1. Open Figma
2. Go to **Plugins** → **Browse plugins in Community**
3. Search for "Uncomponent"
4. Click **Install**

### Step 2: Select components
1. In your Figma file, select one or more components you want to convert
2. You can select:
   - Master components
   - Component instances  
   - Component sets (variants)

### Step 3: Run the plugin
1. Go to **Plugins** → **Uncomponent**
2. The plugin will show how many components are selected
3. Click the **"Uncomponent"** button
4. Done! Your components are now regular frames

## What gets preserved?

When you uncomponent, the new frame will have:
- ✅ All visual styling (fills, strokes, effects, opacity)
- ✅ Size and position
- ✅ Auto-layout properties (if any)
- ✅ Padding and spacing
- ✅ All child elements and their properties
- ✅ Layer structure and hierarchy

## Example

**Before:** `Button Component`  
**After:** `Button Component (uncomponented)` ← Now a regular frame

If you uncomponent the same item multiple times, it won't add duplicate suffixes:
`Button (uncomponented) (uncomponented)` → `Button (uncomponented)`

## When to use this plugin

- 🎨 **One-off customizations** - When you need to modify a component instance beyond what variants allow
- 🔄 **Component cleanup** - Converting old components back to frames
- 📋 **Design exploration** - Breaking components to experiment with different layouts
- 🛠️ **Legacy file maintenance** - Simplifying complex component structures

## Requirements

- Figma (desktop or web)
- Components, instances, or component sets to convert

## Support

Created by [Sepanta Pouya](https://sepantapouya.com)

## License

MIT License - see [LICENSE](LICENSE) file for details. 