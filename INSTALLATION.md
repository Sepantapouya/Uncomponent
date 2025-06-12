# 🚀 Uncomponent Installation Guide

## Quick Installation (No Node.js Required)

Since all the necessary files are already compiled and ready to use, you can install this plugin directly into Figma without needing Node.js or any build tools.

### Step-by-Step Installation

1. **Download the Plugin Files**
   - Download or clone this repository to your local machine
   - You should have these files:
     - `manifest.json`
     - `code.js`
     - `ui.html`

2. **Open Figma Desktop**
   - Make sure you have Figma Desktop installed (not the web version)
   - Open Figma Desktop application

3. **Import the Plugin**
   - Go to **Plugins** → **Development** → **Import plugin from manifest...**
   - Browse to the folder where you downloaded the plugin files
   - Select the `manifest.json` file
   - Click **Open**

4. **Plugin is Ready!**
   - The plugin should now appear in your Plugins menu
   - Look for **"Uncomponent"** in **Plugins** → **Development**

5. **Run the plugin**:
   - Go to **Plugins** → **Development** → **Uncomponent**
   - Or use the keyboard shortcut (if you set one up)

6. **Click "Uncomponent"** in the plugin interface

7. **Done!** Your components are now regular frames

### Troubleshooting Installation

**❌ "Plugin failed to load"**
- Make sure all three files (`manifest.json`, `code.js`, `ui.html`) are in the same folder
- Check that you selected the `manifest.json` file (not any other file)

**❌ "Plugin not showing in menu"**
- Try restarting Figma Desktop
- Check **Plugins** → **Development** (not the main Plugins menu)

**❌ "No components selected" message**
- Make sure you have actual components selected (not frames or other elements)
- Components have a purple diamond icon in the layers panel

### What Gets Uncomponented?

The plugin works with:
- ✅ **Components** (purple diamond icon)
- ✅ **Component Instances** (hollow purple diamond icon)  
- ✅ **Component Sets** (processes all variants)

### File Structure
```
Uncomponent/
├── manifest.json      ← Import this file
├── code.js           ← Plugin logic (pre-compiled)
├── ui.html           ← Plugin interface
├── README.md         ← Documentation
└── INSTALLATION.md   ← This guide
```

### Advanced: Development Setup (Optional)

If you want to modify the plugin, you can install Node.js and use the development setup:

1. **Install Node.js** (v16 or higher) from [nodejs.org](https://nodejs.org)
2. **Install dependencies**: `npm install`
3. **Build the plugin**: `npm run build`
4. **Watch for changes**: `npm run watch`

But for regular use, the simple installation above is all you need!

---

**Need help?** Check the [README.md](README.md) for usage instructions and troubleshooting. 