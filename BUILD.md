# Building Executable Files 🚀

This guide shows you how to build your Electron + Go app into a standalone executable for distribution.

## Prerequisites ✅

Before building, make sure you have:

1. **Node.js and npm** installed
2. **Go** installed
3. All dependencies installed: `npm install`
4. Go server built: `go build -o server.exe server.go`

## Quick Build (Recommended) 🎯

### For Windows:

```bash
npm run dist
```

This will:
1. Build the Go server (`server.exe`)
2. Package everything into a Windows installer
3. Create files in the `dist/` folder

You'll get:
- **Installer** (`My Desktop App Setup 1.0.0.exe`) - For installing on other computers
- **Portable** (`My Desktop App 1.0.0.exe`) - Runs without installation

## Step-by-Step Build Process 📋

### Step 1: Install electron-builder

```bash
npm install --save-dev electron-builder
```

### Step 2: Build the Go Server

**Windows:**
```bash
npm run build:go:win
```

**macOS/Linux:**
```bash
npm run build:go
```

### Step 3: Build the Electron App

**Build for Windows:**
```bash
npm run dist:win
```

**Build for macOS:**
```bash
npm run dist:mac
```

**Build for Linux:**
```bash
npm run dist:linux
```

### Step 4: Find Your Executable

Look in the `dist/` folder:
- Windows: `dist/My Desktop App Setup 1.0.0.exe`
- macOS: `dist/My Desktop App-1.0.0.dmg`
- Linux: `dist/My Desktop App-1.0.0.AppImage`

## Build Options 🛠️

### Test Build (Without Creating Installer)

To test packaging without creating the final installer:

```bash
npm run pack
```

This creates an unpacked version in `dist/win-unpacked/` that you can run to test.

### Build for All Platforms

You can build for multiple platforms (though you need to be on that platform for best results):

```bash
# Build for all platforms
electron-builder -mwl
```

Note: Building for macOS requires macOS, and Linux builds work best on Linux.

## Customization 🎨

### Change App Name

Edit `package.json`:

```json
"build": {
  "productName": "Your App Name",
  "appId": "com.yourcompany.yourapp"
}
```

### Add App Icon

1. Create icons in these formats:
   - Windows: `build/icon.ico` (256x256 or larger)
   - macOS: `build/icon.icns`
   - Linux: `build/icon.png` (512x512)

2. Place them in a `build/` folder in your project

3. The icons will be automatically included

### Change Version

Edit `package.json`:

```json
"version": "1.0.0"
```

The version will appear in the installer name and app info.

## Build Configuration ⚙️

The build configuration in `package.json` includes:

```json
"build": {
  "appId": "com.electron.go.app",
  "productName": "My Desktop App",
  "files": [
    "main.js",
    "preload.js",
    "renderer.js",
    "index.html",
    "styles.css",
    "server.exe",    // Go binary for Windows
    "server",        // Go binary for macOS/Linux
    "package.json"
  ],
  "win": {
    "target": ["nsis", "portable"]  // Creates installer + portable version
  }
}
```

### Important: Including the Go Binary

The `"files"` array includes both `server.exe` (Windows) and `server` (macOS/Linux). Make sure to build the Go server BEFORE running electron-builder!

## Distribution 📦

### Windows

**Installer (.exe):**
- Users double-click to install
- Installs to Program Files
- Creates desktop/start menu shortcuts
- Can be uninstalled from Control Panel

**Portable (.exe):**
- No installation needed
- Runs directly when double-clicked
- Can be put on USB drive
- Great for users who can't install software

### macOS

**DMG File:**
- Users drag app to Applications folder
- Standard macOS distribution format

### Linux

**AppImage:**
- Self-contained executable
- Works on most Linux distributions
- Just make executable and run

**DEB Package:**
- For Debian/Ubuntu-based systems
- Install with `dpkg -i` or double-click

## File Sizes 📊

Expected file sizes:
- Windows Installer: 80-150 MB (includes Electron + Go + Chromium)
- Portable: 80-150 MB
- macOS DMG: 100-180 MB
- Linux AppImage: 90-160 MB

The Go binary adds minimal size (usually 5-10 MB).

## Code Signing (Optional) 🔐

For production apps, you should sign your executables:

### Windows:
```json
"win": {
  "certificateFile": "path/to/cert.pfx",
  "certificatePassword": "password"
}
```

### macOS:
```json
"mac": {
  "identity": "Developer ID Application: Your Name"
}
```

Without code signing:
- Windows will show "Unknown Publisher" warning
- macOS will require users to right-click and open
- Not a problem for internal/personal use

## Auto-Update (Advanced) 🔄

To add auto-updates, use `electron-updater`:

```bash
npm install electron-updater
```

See [electron-updater docs](https://www.electron.build/auto-update) for setup.

## Troubleshooting 🔧

### "Cannot find module 'electron-builder'"

Install it:
```bash
npm install --save-dev electron-builder
```

### Build fails on "server.exe not found"

Build the Go server first:
```bash
npm run build:go:win
```

### Installer is huge (>500MB)

This is normal! Electron includes:
- Chromium (browser engine)
- Node.js runtime
- Your app code
- Go binary

### App won't start after building

1. Test the unpacked version first: `npm run pack`
2. Check `dist/win-unpacked/My Desktop App.exe`
3. Look for errors in the console
4. Make sure `server.exe` is in the same folder as the main executable

### "Windows protected your PC" message

This is normal for unsigned apps. Users can click "More info" → "Run anyway". For production, consider code signing.

## Next Steps 🎓

1. **Test thoroughly**: Test the built executable on a clean machine
2. **Add icons**: Create proper icons for professional look
3. **Consider code signing**: For public distribution
4. **Set up CI/CD**: Automate builds with GitHub Actions or similar
5. **Create installer scripts**: For any post-installation setup

## Resources 📚

- [electron-builder Documentation](https://www.electron.build/)
- [Electron Security Guide](https://www.electronjs.org/docs/latest/tutorial/security)
- [Code Signing Guide](https://www.electron.build/code-signing)

---

**Questions?** Check the main [README.md](README.md) or electron-builder documentation.

