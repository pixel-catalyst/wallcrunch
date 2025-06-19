import { contextBridge, ipcRenderer } from 'electron';

console.log('Preload script loaded!');

// Define the API that will be exposed to the renderer
const electronAPI = {
  // IPC Communication
  sendMessage: (message: string) => {
    ipcRenderer.send('message', message);
    return Promise.resolve();
  },
  onReply: (callback: (message: string) => void) => {
    ipcRenderer.on('reply', (_event, message) => callback(message));
  },
  
  // System Info
  getVersion: () => ipcRenderer.invoke('get-version'),
  getPlatform: () => process.platform,
  
  // Window Controls
  minimize: () => ipcRenderer.invoke('minimize-window'),
  maximize: () => ipcRenderer.invoke('maximize-window'),
  close: () => ipcRenderer.invoke('close-window'),
};

// Expose the API to the renderer process
contextBridge.exposeInMainWorld('electronAPI', electronAPI);
console.log('electronAPI exposed to window!');

// Types for TypeScript
declare global {
  interface Window {
    electronAPI: typeof electronAPI;
  }
}

