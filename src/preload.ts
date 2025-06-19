// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

type ImagePath = {
    path: string;
    name: string;
};

contextBridge.exposeInMainWorld('electronAPI', {
    createWallpaper: (images: ImagePath[]) => ipcRenderer.invoke('create-wallpaper', images),
});


contextBridge.exposeInMainWorld('Electron', {
    ipcRenderer: {
        invoke: (channel: string, args: any) => ipcRenderer.invoke(channel, args),
    }
});