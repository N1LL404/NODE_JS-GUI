# Electron + Go Desktop App 🚀

A modern, beautiful desktop GUI application combining **Node.js/Electron** (frontend) with **Golang** (backend). This cross-platform desktop app features a sleek dark theme, smooth animations, and powerful Go backend integration.

## Features ✨

- **Modern UI**: Beautiful, responsive interface with smooth animations
- **Go Backend Integration**: Powerful Go server for heavy computations and system operations
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Secure**: Built with Electron's security best practices (context isolation, preload scripts)
- **Multiple Pages**: Home, Dashboard, Tasks, Go Backend, and Settings
- **Task Manager**: Create and manage tasks with priority levels
- **Go API Demos**: System info, file operations, computations, and more
- **Dark Theme**: Easy on the eyes with a modern dark color scheme
- **Interactive**: Real-time notifications and smooth page transitions

## What's Inside

The app includes:
- 🏠 **Home Page**: Welcome screen with feature cards
- 📊 **Dashboard**: Statistics and activity overview
- ✅ **Tasks**: Task management with priorities
- 🐹 **Go Backend**: Live integration with Go server (system info, file operations, Fibonacci calculator)
- ⚙️ **Settings**: Customizable app preferences

## Prerequisites 📋

Before running this application, make sure you have:

- **Node.js** (version 16 or higher) - [Download from nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Go** (version 1.21 or higher) - [Download from golang.org](https://golang.org/dl/)

Check if you have them installed:

```bash
# Check Node.js
node --version

# Check Go
go version
```

## Quick Start 🚀

Get your app running in 3 easy steps!

### Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install Electron and all required dependencies.

### Step 2: Build the Go Server

**Windows:**
```bash
go build -o server.exe server.go
```

**macOS/Linux:**
```bash
go build -o server server.go
chmod +x server
```

Or use the build script:

**Windows:** Double-click `build.bat` or run:
```bash
build.bat
```

**macOS/Linux:**
```bash
chmod +x build.sh
./build.sh
```

### Step 3: Run the App

```bash
npm start
```

That's it! The app will:
1. ✅ Start the Go backend server on port 8080
2. ✅ Launch the Electron window
3. ✅ Show you a beautiful desktop app!

### What to Try First 🎯

1. **Click the "Go Backend" page** (🐹 icon in sidebar)
2. **Try the demos:**
   - Get System Info
   - Calculate Fibonacci numbers
   - List files in the directory
   - Get a greeting

## Building Executable Files (.exe) 📦

Want to create a standalone executable for distribution? Follow these steps:

### The Easiest Way

**Just run the build script:**

**Windows:**
```bash
build-exe.bat
```

**macOS/Linux:**
```bash
chmod +x build-exe.sh
./build-exe.sh
```

That's it! The script will automatically:
1. ✅ Install electron-builder (if needed)
2. ✅ Build the Go server
3. ✅ Create executables
4. ✅ Put them in the `dist/` folder

### Manual Build (Alternative)

```bash
# 1. Install electron-builder (one time only)
npm install --save-dev electron-builder

# 2. Build Go server
go build -o server.exe server.go  # Windows
go build -o server server.go      # macOS/Linux

# 3. Build the executable
npm run dist          # Build for current platform
npm run dist:win      # Windows
npm run dist:mac      # macOS
npm run dist:linux    # Linux
```

### What You Get

After building, check the `dist/` folder:

**Windows:**
```
dist/
├── My Desktop App Setup 1.0.0.exe   (~100 MB) - Full installer
└── My Desktop App 1.0.0.exe         (~100 MB) - Portable version
```

- **Installer**: Full installer with Start Menu shortcuts, can be uninstalled
- **Portable**: No installation needed, just double-click and run

**macOS:**
- `My Desktop App-1.0.0.dmg` - Standard macOS installer

**Linux:**
- `My Desktop App-1.0.0.AppImage` - Self-contained executable
- `My Desktop App-1.0.0.deb` - Debian/Ubuntu package

### Distribution

You can share these files with anyone:
1. **Cloud Storage**: Google Drive, Dropbox, OneDrive
2. **USB Drive**: Copy and run anywhere
3. **Your Website**: Host for download
4. **Email**: If file size allows

### First Run Warning ⚠️

Windows may show **"Windows protected your PC"** because the app isn't code-signed. This is normal!

**Users should:**
1. Click "More info"
2. Click "Run anyway"

To remove this warning permanently, you need code signing (which costs money). For personal/internal use, this warning is fine.

### Build Options

```bash
npm run pack       # Test build without creating installer
npm run dist       # Build for current platform
npm run dist:win   # Build for Windows
npm run dist:mac   # Build for macOS  
npm run dist:linux # Build for Linux
```

### Customization

**Change App Name** - Edit `package.json`:
```json
"build": {
  "productName": "Your Awesome App Name"
}
```

**Add Custom Icon** - Create:
- Windows: `build/icon.ico` (256x256 or larger)
- macOS: `build/icon.icns`
- Linux: `build/icon.png` (512x512)

**Change Version** - Edit `package.json`:
```json
"version": "2.0.0"
```

### Build Tips 💡

- **First build takes 5-10 minutes** - Subsequent builds are faster
- **File size is ~100MB** - Normal for Electron apps (includes Chromium)
- **Test the portable version first** - Easier to debug
- **Delete old builds** - Clean `dist/` folder to save space

For more advanced build options, see [BUILD.md](BUILD.md)


## Project Structure 📁

```
electron-go-app/
├── main.js           # Main process (Electron entry point + Go server launcher)
├── preload.js        # Preload script (secure IPC bridge)
├── index.html        # Main HTML file
├── styles.css        # All styling
├── renderer.js       # Renderer process (UI logic + Go API calls)
├── server.go         # Go backend server (HTTP API)
├── go.mod            # Go module file
├── server.exe        # Compiled Go server (Windows)
├── server            # Compiled Go server (macOS/Linux)
├── package.json      # Node.js project configuration
└── README.md         # This file
```

## How It Works 🔍

### Architecture Overview

This app combines **Electron** (for the GUI) with **Go** (for backend processing):

```
┌─────────────────────────────────────┐
│         Electron App                │
│  ┌───────────┐      ┌────────────┐ │
│  │           │      │            │ │
│  │  Frontend │ HTTP │  Go Server │ │
│  │  (HTML/JS)│◄────►│  (port     │ │
│  │           │      │   8080)    │ │
│  └───────────┘      └────────────┘ │
└─────────────────────────────────────┘
```

### Main Process (`main.js`)
- Creates and manages the application window
- **Spawns and manages the Go server process**
- Handles system-level operations
- Manages IPC (Inter-Process Communication)
- Automatically starts/stops Go server with the app

### Go Backend (`server.go`)
- HTTP server running on localhost:8080
- Provides REST API endpoints
- Handles heavy computations (Fibonacci, etc.)
- System information and file operations
- Can be extended with database, file I/O, etc.

### Preload Script (`preload.js`)
- Provides secure bridge between main and renderer processes
- Exposes limited API to the renderer using `contextBridge`
- Follows Electron security best practices

### Renderer Process (`renderer.js`)
- Handles UI interactions
- **Makes HTTP requests to Go backend**
- Manages page navigation
- Implements task manager functionality
- Shows notifications

## Go Backend API Endpoints 🔌

The Go server provides the following REST API endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check - verify server is running |
| `/system` | GET | Get system information (OS, CPU, Go version) |
| `/greet?name=X` | GET | Get a personalized greeting |
| `/compute` | POST | Calculate Fibonacci numbers (send `{"number": N}`) |
| `/files` | GET | List files in the project directory |

### Example Go API Call

```javascript
// From renderer.js
const response = await fetch('http://localhost:8080/system');
const data = await response.json();
console.log(data);
```

### Adding New Go Endpoints

1. Add a new handler function in `server.go`:
```go
func myNewHandler(w http.ResponseWriter, r *http.Request) {
    // Your Go code here
    response := map[string]string{"message": "Hello!"}
    json.NewEncoder(w).Encode(response)
}
```

2. Register the route in `main()`:
```go
http.HandleFunc("/myendpoint", enableCORS(myNewHandler))
```

3. Call it from `renderer.js`:
```javascript
const response = await fetch(`${goServerUrl}/myendpoint`);
```

## Customization 🎨

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6C63FF;
    --secondary-color: #FF6584;
    --bg-dark: #1a1a2e;
    /* ... more variables */
}
```

### Adding New Pages

1. Add a new navigation button in `index.html`:
```html
<button class="nav-item" data-page="yourpage">
    <span class="icon">🎯</span>
    <span>Your Page</span>
</button>
```

2. Add the page content:
```html
<div class="page" id="yourpage-page">
    <!-- Your content here -->
</div>
```

3. Update the titles object in `renderer.js`:
```javascript
const titles = {
    'yourpage': 'Your Page Title',
    // ... other pages
};
```

## Development Tips 💡

### Enable Developer Tools

Uncomment this line in `main.js`:

```javascript
mainWindow.webContents.openDevTools();
```

### Hot Reload

For automatic reloading during development, install `electron-reload`:

```bash
npm install --save-dev electron-reload
```

Add to the top of `main.js`:

```javascript
require('electron-reload')(__dirname);
```

## Troubleshooting 🔧

### App won't start
- Make sure you ran `npm install`
- Check that Node.js is installed: `node --version`
- Try deleting `node_modules` and running `npm install` again

### "Go server not available" error

The app will still work, but without Go features. To fix:

1. Make sure you built the Go server first:
   ```bash
   # Windows
   go build -o server.exe server.go
   
   # macOS/Linux
   go build -o server server.go
   chmod +x server
   ```

2. Check that the executable exists in the project folder

3. Try running the Go server manually to test it:
   ```bash
   # Windows
   .\server.exe
   
   # macOS/Linux
   ./server
   ```

4. You should see: `🚀 Go server starting on http://localhost:8080`

5. Make sure port 8080 is not already in use

### Go server not connecting
- Check that Go is installed: `go version`
- Check console for Go server logs (errors will show in terminal)
- On macOS/Linux, make sure the file is executable: `chmod +x server`
- Try running Go server manually first to debug issues

### Blank white screen
- Check the browser console (DevTools) for errors
- Verify all file paths are correct
- Make sure `index.html` is in the root directory
- Check if there are JavaScript errors preventing load

### CORS errors
- The Go server includes CORS headers by default
- If you modify server.go, ensure `Access-Control-Allow-Origin` is set in responses

### Build Issues

**"Cannot find module 'electron-builder'"**
```bash
npm install --save-dev electron-builder
```

**"server.exe not found" during build**
- Build the Go server first: `go build -o server.exe server.go`
- Make sure the file exists before running `npm run dist`

**Build takes forever**
- First build takes 5-10 minutes (normal)
- Subsequent builds are faster
- Check your internet connection (downloads dependencies)

**Installer is huge (>500MB)**
- This is normal! Electron includes Chromium browser engine (~70MB)
- Your app adds additional size
- Go binary is relatively small (5-10 MB)

**App won't start after building**
1. Test the unpacked version first: `npm run pack`
2. Check `dist/win-unpacked/My Desktop App.exe`
3. Look for errors in the console output
4. Make sure `server.exe` is included in the build

### Performance Issues
- Check for console errors
- Disable DevTools in production
- Check Go server logs for performance issues
- Monitor memory usage in Task Manager

## Security Considerations 🔒

This app follows Electron security best practices:

✅ Context isolation enabled  
✅ Node integration disabled  
✅ Preload script for secure IPC  
✅ Content Security Policy in HTML  

## Why Electron + Go? 🤔

Combining Electron with Go gives you the best of both worlds:

### Electron Strengths:
- ✅ Beautiful, native-looking UI
- ✅ Cross-platform (Windows, macOS, Linux)
- ✅ Rich ecosystem of npm packages
- ✅ Fast UI development with HTML/CSS/JS

### Go Strengths:
- ✅ Excellent performance for heavy computations
- ✅ Strong concurrency support (goroutines)
- ✅ Small, self-contained binaries
- ✅ Great for system operations, file I/O, networking
- ✅ Static typing and excellent standard library

### Use Cases:
- Desktop apps that need heavy backend processing
- System utilities with beautiful UI
- Database-heavy applications
- File processing tools
- Network applications with GUI

## Technologies Used 🛠️

- **Electron**: Desktop application framework
- **Go (Golang)**: Backend server and API
- **Node.js**: JavaScript runtime
- **HTML5**: Structure
- **CSS3**: Styling with modern features
- **JavaScript (ES6+)**: Application logic

## Future Enhancements 🚀

Consider adding:
- [ ] Database integration (SQLite/PostgreSQL via Go)
- [ ] File system operations with Go
- [ ] WebSocket communication between Electron and Go
- [ ] Auto-updates
- [ ] System notifications
- [ ] Keyboard shortcuts
- [ ] Multiple themes
- [ ] Authentication and user management
- [ ] Data persistence with Go backend
- [ ] Export/Import functionality
- [ ] Package Go server as single binary with embedded files

## Resources 📚

### Electron
- [Electron Documentation](https://www.electronjs.org/docs)
- [Electron API Demos](https://github.com/electron/electron-api-demos)
- [Node.js Documentation](https://nodejs.org/docs)

### Go
- [Go Documentation](https://golang.org/doc/)
- [Go by Example](https://gobyexample.com/)
- [Effective Go](https://golang.org/doc/effective_go)
- [Go Web Programming](https://astaxie.gitbooks.io/build-web-application-with-golang/)

### Integration Tutorials
- [Building Desktop Apps with Electron](https://www.electronjs.org/docs/latest/tutorial/tutorial-prerequisites)
- [Go REST API Tutorial](https://go.dev/doc/tutorial/web-service-gin)

## License 📄

MIT License - feel free to use this project for learning or as a starting point for your own applications!

## Contributing 🤝

Feel free to fork this project and customize it for your needs!

---

**Happy Coding!** 🎉

If you have any questions or run into issues, check the Electron documentation or open an issue.

