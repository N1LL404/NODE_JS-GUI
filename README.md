# Electron Desktop App 🚀

A modern, beautiful Node.js desktop GUI application built with Electron. This cross-platform desktop app features a sleek dark theme, smooth animations, and an intuitive user interface.

## Features ✨

- **Modern UI**: Beautiful, responsive interface with smooth animations
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Secure**: Built with Electron's security best practices (context isolation, preload scripts)
- **Multiple Pages**: Home, Dashboard, Tasks, and Settings
- **Task Manager**: Create and manage tasks with priority levels
- **Dark Theme**: Easy on the eyes with a modern dark color scheme
- **Interactive**: Real-time notifications and smooth page transitions

## Screenshots

The app includes:
- 🏠 **Home Page**: Welcome screen with feature cards
- 📊 **Dashboard**: Statistics and activity overview
- ✅ **Tasks**: Task management with priorities
- ⚙️ **Settings**: Customizable app preferences

## Prerequisites 📋

Before running this application, make sure you have:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

## Installation 🔧

1. **Install Dependencies**

   Open your terminal in the project directory and run:

   ```bash
   npm install
   ```

   This will install Electron and all required dependencies.

## Running the App 🏃

### Development Mode

To start the application in development mode:

```bash
npm start
```

Or:

```bash
npm run dev
```

The application window will open automatically.

### Building for Production

To build the app for distribution, you can add electron-builder:

```bash
npm install --save-dev electron-builder
```

Then add these scripts to your `package.json`:

```json
"scripts": {
  "start": "electron .",
  "build": "electron-builder",
  "build:win": "electron-builder --win",
  "build:mac": "electron-builder --mac",
  "build:linux": "electron-builder --linux"
}
```

## Project Structure 📁

```
electron-desktop-app/
├── main.js           # Main process (Electron entry point)
├── preload.js        # Preload script (secure IPC bridge)
├── index.html        # Main HTML file
├── styles.css        # All styling
├── renderer.js       # Renderer process (UI logic)
├── package.json      # Project configuration
└── README.md         # This file
```

## How It Works 🔍

### Main Process (`main.js`)
- Creates and manages the application window
- Handles system-level operations
- Manages IPC (Inter-Process Communication)

### Preload Script (`preload.js`)
- Provides secure bridge between main and renderer processes
- Exposes limited API to the renderer using `contextBridge`
- Follows Electron security best practices

### Renderer Process (`renderer.js`)
- Handles UI interactions
- Manages page navigation
- Implements task manager functionality
- Shows notifications

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

## Common Issues & Solutions 🔧

### App won't start
- Make sure you ran `npm install`
- Check that Node.js is installed: `node --version`
- Try deleting `node_modules` and running `npm install` again

### Blank white screen
- Check the browser console (DevTools) for errors
- Verify all file paths are correct
- Make sure `index.html` is in the root directory

### App is slow
- Check for console errors
- Disable DevTools in production
- Optimize images and assets

## Security Considerations 🔒

This app follows Electron security best practices:

✅ Context isolation enabled  
✅ Node integration disabled  
✅ Preload script for secure IPC  
✅ Content Security Policy in HTML  

## Technologies Used 🛠️

- **Electron**: Desktop application framework
- **Node.js**: JavaScript runtime
- **HTML5**: Structure
- **CSS3**: Styling with modern features
- **JavaScript (ES6+)**: Application logic

## Future Enhancements 🚀

Consider adding:
- [ ] File system operations
- [ ] Database integration (SQLite)
- [ ] Auto-updates
- [ ] System notifications
- [ ] Keyboard shortcuts
- [ ] Multiple themes
- [ ] Data persistence
- [ ] Export/Import functionality

## Resources 📚

- [Electron Documentation](https://www.electronjs.org/docs)
- [Electron API Demos](https://github.com/electron/electron-api-demos)
- [Node.js Documentation](https://nodejs.org/docs)

## License 📄

MIT License - feel free to use this project for learning or as a starting point for your own applications!

## Contributing 🤝

Feel free to fork this project and customize it for your needs!

---

**Happy Coding!** 🎉

If you have any questions or run into issues, check the Electron documentation or open an issue.

