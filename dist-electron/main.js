"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = require("path");
const util_1 = require("./util");
class AppUpdater {
    constructor() {
        console.log('AppUpdater');
    }
}
function createWindow() {
    // Create the browser window.
    const mainWindow = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        show: false,
        autoHideMenuBar: true,
        webPreferences: {
            preload: (0, path_1.join)(__dirname, 'preload/preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false, // Disable sandbox for development
        },
    });
    // Debug: Log the preload path
    console.log('Preload path:', (0, path_1.join)(__dirname, 'preload/preload.js'));
    console.log('__dirname:', __dirname);
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });
    // Debug: Check if preload is working
    mainWindow.webContents.once('dom-ready', () => {
        console.log('DOM is ready, checking preload...');
        mainWindow.webContents.executeJavaScript('console.log("electronAPI available:", !!window.electronAPI);');
    });
    const port = process.env.PORT || 3000;
    const url = util_1.isDev ? `http://localhost:${port}` : (0, path_1.join)(__dirname, '../out/index.html');
    // and load the index.html of the app.
    if (util_1.isDev) {
        mainWindow.loadURL(url);
    }
    else {
        mainWindow.loadFile(url);
    }
    // Open the DevTools only in development mode
    if (util_1.isDev && process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
    }
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
    new AppUpdater();
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// IPC Handlers
electron_1.ipcMain.on('message', (event, message) => {
    console.log('Received message from renderer:', message);
    event.reply('reply', 'Message received by Electron main process!');
});
electron_1.ipcMain.handle('get-version', () => {
    return electron_1.app.getVersion();
});
electron_1.ipcMain.handle('minimize-window', () => {
    const focusedWindow = electron_1.BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
        focusedWindow.minimize();
    }
});
electron_1.ipcMain.handle('maximize-window', () => {
    const focusedWindow = electron_1.BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
        if (focusedWindow.isMaximized()) {
            focusedWindow.unmaximize();
        }
        else {
            focusedWindow.maximize();
        }
    }
});
electron_1.ipcMain.handle('close-window', () => {
    const focusedWindow = electron_1.BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
        focusedWindow.close();
    }
});
//# sourceMappingURL=main.js.map