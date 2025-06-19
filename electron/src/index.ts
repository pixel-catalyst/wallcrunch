import { app, BrowserWindow, ipcMain } from 'electron';
import { mkdir, copyFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { create } from 'xmlbuilder2';
import os from 'os';

const BACKGROUND_PROPERTIES_DIR = join(os.homedir(), '.local/share/gnome-background-properties/');
const WALLPAPER_DIR = join(os.homedir(), '.local/share/backgrounds/');

async function createDynamicWallpaper(imagePaths: { path: string, name: string }[]) {
  try {
    await mkdir(BACKGROUND_PROPERTIES_DIR, { recursive: true });
    await mkdir(WALLPAPER_DIR, { recursive: true });

    const validImagePaths = imagePaths.filter(img => img && img.path && img.name);
    if (validImagePaths.length !== 2) {
      throw new Error('Exactly two valid image paths are required for light/dark mode.');
    }

    const lightImage = validImagePaths[0];
    const darkImage = validImagePaths[1];

    console.log('Light Image:', lightImage);
    console.log('Dark Image:', darkImage);

    const lightDest = join(WALLPAPER_DIR, lightImage.name);
    const darkDest = join(WALLPAPER_DIR, darkImage.name);

    await copyFile(lightImage.path, lightDest);
    await copyFile(darkImage.path, darkDest);

    const xmlRoot = create({ version: '1.0', encoding: 'UTF-8' })
      .ele('wallpapers')
      .ele('wallpaper');

    xmlRoot.ele('name').txt('Dynamic Light/Dark Wallpaper');
    xmlRoot.ele('filename').txt(lightDest);
    xmlRoot.ele('filename-dark').txt(darkDest);
    xmlRoot.ele('options').txt('zoom');
    xmlRoot.ele('pcolor').txt('#2c001e');
    xmlRoot.ele('scolor').txt('#2c001e');
    xmlRoot.ele('shade_type').txt('solid');

    const xmlString = xmlRoot.end({ prettyPrint: true });
    const xmlFileName = `my_wallpaper_${Date.now()}.xml`;
    const xmlPath = join(BACKGROUND_PROPERTIES_DIR, xmlFileName);

    await writeFile(xmlPath, xmlString);

    return { success: true, xmlPath };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

// IPC handler to expose to preload → renderer
ipcMain.handle('create-wallpaper', async (_, imagePaths) => {
  console.log('Received image paths:', imagePaths);
  return await createDynamicWallpaper(imagePaths);
});

// Boilerplate window creation
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const createWindow = (): void => {
  let mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.on('closed', () => {
    mainWindow = null!;
  });
};

if (require('electron-squirrel-startup')) app.quit();

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
