# 🔧 Uncomponent

A Figma plugin that allows you to "uncomponent" components, converting them back to regular frames while preserving their content and layout properties.

## ✨ Features

- **Smart Selection Detection**: Automatically detects when you have components selected
- **Batch Processing**: Uncomponent multiple components at once
- **Property Preservation**: Maintains layout, styling, and positioning
- **Real-time Feedback**: Live updates based on your current selection
- **Clean UI**: Modern, Figma-native interface

## 🚀 What It Does

When you select a component in Figma and click "Uncomponent", the plugin will:

1. ✅ Remove the component wrapper
2. ✅ Create a new frame with the same properties
3. ✅ Move all child elements to the new frame
4. ✅ Preserve layout modes (Auto Layout, constraints, etc.)
5. ✅ Maintain styling (fills, strokes, effects, etc.)
6. ✅ Keep the same position and naming

## 📥 Installation

### Development Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the plugin:
   ```bash
   npm run build
   ```
4. Open Figma Desktop
5. Go to **Plugins** → **Development** → **Import plugin from manifest**
6. Select the `manifest.json` file from this project

### Production Installation
*(Coming soon - will be available in the Figma Community)*

## 🎯 How to Use

1. **Select Components**: Select one or more components in your Figma file
2. **Open Plugin**: Go to **Plugins** → **Uncomponent**
3. **Review Selection**: The plugin will show you how many components are selected
4. **Uncomponent**: Click the "Uncomponent" button
5. **Done!**: Your components are now regular frames with all content preserved

## 🔧 Supported Node Types

- ✅ **Components** (`COMPONENT`)
- ✅ **Component Instances** (`INSTANCE`)
- ✅ **Component Sets** (`COMPONENT_SET`) - processes all variants

## 💡 Use Cases

- **Design System Cleanup**: Remove unnecessary component wrappers
- **Legacy Component Migration**: Convert old components to new structures
- **Rapid Prototyping**: Quickly break down components for experimentation
- **Component Debugging**: Inspect the underlying structure of components

## 🛠 Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Figma Desktop app

### Scripts
```bash
# Install dependencies
npm install

# Build the plugin
npm run build

# Watch for changes during development
npm run watch
```

### Project Structure
```
Uncomponent/
├── manifest.json      # Plugin configuration
├── code.ts           # Main plugin logic
├── ui.html           # Plugin user interface
├── package.json      # Node.js dependencies
├── tsconfig.json     # TypeScript configuration
└── README.md         # This file
```

## 🎨 UI/UX Features

- **Figma Native Styling**: Uses Figma's design tokens for consistent appearance
- **Dark/Light Mode Support**: Automatically adapts to Figma's theme
- **Responsive Design**: Works well at different plugin sizes
- **Accessibility**: Proper focus management and keyboard navigation
- **Real-time Updates**: Status updates as you change selection

## 🐛 Troubleshooting

### Common Issues

**"No components selected"**
- Make sure you have selected actual components, not just frames or other elements

**"Component has no parent"**
- This happens with top-level components. The plugin will still process them correctly.

**"Operation failed"**
- Try selecting fewer components at once
- Ensure components aren't locked or have special constraints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♀️ Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the troubleshooting section above
- Review Figma's plugin documentation

## 🎉 Acknowledgments

- Built with ❤️ for the Figma design community
- Inspired by the need for better component management tools
- Thanks to all beta testers and contributors

---

**Made with ❤️ by Sepanta Pouya** | [Report Bug](../../issues) | [Request Feature](../../issues) 