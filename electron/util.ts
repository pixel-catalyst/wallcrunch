import { app } from 'electron';

export const isDev = process.env.NODE_ENV === 'development';

export const isMac = process.platform === 'darwin';

export const isWindows = process.platform === 'win32';

export const isLinux = process.platform === 'linux';

export const getAppDataPath = () => {
  return app.getPath('userData');
};

export const getAppVersion = () => {
  return app.getVersion();
};

