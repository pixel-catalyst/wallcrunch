export interface ElectronAPI {
  // IPC Communication
  sendMessage: (message: string) => Promise<void>;
  onReply: (callback: (message: string) => void) => void;
  
  // System Info
  getVersion: () => Promise<string>;
  getPlatform: () => string;
  
  // Window Controls
  minimize: () => Promise<void>;
  maximize: () => Promise<void>;
  close: () => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

