const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let goServer = null;
const GO_PORT = 8080;

// Start Go server
function startGoServer() {
  return new Promise((resolve, reject) => {
    console.log('Starting Go server...');
    
    // Determine the Go executable name based on platform
    const goExe = process.platform === 'win32' ? 'server.exe' : './server';
    
    // Set environment variables
    const env = Object.assign({}, process.env, {
      PORT: GO_PORT.toString()
    });
    
    // Spawn Go server process
    goServer = spawn(goExe, [], { env, shell: true });
    
    goServer.stdout.on('data', (data) => {
      console.log(`[Go Server] ${data.toString().trim()}`);
    });
    
    goServer.stderr.on('data', (data) => {
      console.error(`[Go Server Error] ${data.toString().trim()}`);
    });
    
    goServer.on('error', (error) => {
      console.error('Failed to start Go server:', error.message);
      console.log('Note: Make sure to build the Go server first: go build server.go');
      reject(error);
    });
    
    goServer.on('close', (code) => {
      console.log(`Go server exited with code ${code}`);
      goServer = null;
    });
    
    // Give the server a moment to start
    setTimeout(() => {
      console.log(`Go server should be running on http://localhost:${GO_PORT}`);
      resolve();
    }, 1000);
  });
}

// Stop Go server
function stopGoServer() {
  if (goServer) {
    console.log('Stopping Go server...');
    goServer.kill();
    goServer = null;
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    backgroundColor: '#1a1a2e',
    show: false,
    icon: path.join(__dirname, 'assets/icon.png') // Optional: add your own icon
  });

  mainWindow.loadFile('index.html');

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Open DevTools in development mode (remove in production)
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(async () => {
  // Start Go server first
  try {
    await startGoServer();
  } catch (error) {
    console.error('Go server failed to start, continuing without it');
  }
  
  createWindow();

  app.on('activate', () => {
    // On macOS, re-create a window when dock icon is clicked and no other windows open
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  stopGoServer();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Cleanup on app quit
app.on('before-quit', () => {
  stopGoServer();
});

// IPC handlers for communication between main and renderer processes
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

ipcMain.handle('get-platform', () => {
  return process.platform;
});

ipcMain.handle('get-go-server-url', () => {
  return `http://localhost:${GO_PORT}`;
});

