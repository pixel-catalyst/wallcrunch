"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
console.log('Preload script loaded!');
// Define the API that will be exposed to the renderer
const electronAPI = {
    // IPC Communication
    sendMessage: (message) => {
        electron_1.ipcRenderer.send('message', message);
        return Promise.resolve();
    },
    onReply: (callback) => {
        electron_1.ipcRenderer.on('reply', (_event, message) => callback(message));
    },
    // System Info
    getVersion: () => electron_1.ipcRenderer.invoke('get-version'),
    getPlatform: () => process.platform,
    // Window Controls
    minimize: () => electron_1.ipcRenderer.invoke('minimize-window'),
    maximize: () => electron_1.ipcRenderer.invoke('maximize-window'),
    close: () => electron_1.ipcRenderer.invoke('close-window'),
};
// Expose the API to the renderer process
electron_1.contextBridge.exposeInMainWorld('electronAPI', electronAPI);
console.log('electronAPI exposed to window!');
//# sourceMappingURL=preload.js.map