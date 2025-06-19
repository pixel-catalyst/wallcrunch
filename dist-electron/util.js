"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppVersion = exports.getAppDataPath = exports.isLinux = exports.isWindows = exports.isMac = exports.isDev = void 0;
const electron_1 = require("electron");
exports.isDev = process.env.NODE_ENV === 'development';
exports.isMac = process.platform === 'darwin';
exports.isWindows = process.platform === 'win32';
exports.isLinux = process.platform === 'linux';
const getAppDataPath = () => {
    return electron_1.app.getPath('userData');
};
exports.getAppDataPath = getAppDataPath;
const getAppVersion = () => {
    return electron_1.app.getVersion();
};
exports.getAppVersion = getAppVersion;
//# sourceMappingURL=util.js.map