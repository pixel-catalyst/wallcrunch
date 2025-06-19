import { mkdir, copyFile, writeFile } from 'fs/promises';
import { join, basename } from 'path';
import { create } from 'xmlbuilder2'; // NOTE: xmlbuilder2 is preferred over deprecated xmlbuilder
import os from 'os'; // For home directory

// User-specific GNOME wallpaper directories
const BACKGROUND_PROPERTIES_DIR = join(os.homedir(), '.local/share/gnome-background-properties/');
const WALLPAPER_DIR = join(os.homedir(), '.local/share/backgrounds/');

type ImagePath = {
    path: string;
    name: string;
  };

// Main logic to generate XML and copy wallpapers
async function createDynamicWallpaper(imagePaths: ImagePath[]): Promise<{ success: boolean; xmlPath?: string; error?: string }> {
    try {
        await mkdir(BACKGROUND_PROPERTIES_DIR, { recursive: true });
        await mkdir(WALLPAPER_DIR, { recursive: true });

        const validImagePaths = imagePaths.filter(img => img && img.path && img.name);

        if (validImagePaths.length !== 2) {
            throw new Error('Exactly two valid image paths are required for light/dark mode.');
        }

        const lightModeImage = validImagePaths[0];
        const darkModeImage = validImagePaths[1];

        const lightModeDestPath = join(WALLPAPER_DIR, lightModeImage.name);
        await copyFile(lightModeImage.path, lightModeDestPath);

        const darkModeDestPath = join(WALLPAPER_DIR, darkModeImage.name);
        await copyFile(darkModeImage.path, darkModeDestPath);

        const xmlRoot = create({ version: '1.0', encoding: 'UTF-8' })
            .ele('wallpapers')
            .ele('wallpaper');

        xmlRoot.ele('name').txt('My Custom Light/Dark Wallpaper');
        xmlRoot.ele('filename').txt(lightModeDestPath);
        xmlRoot.ele('filename-dark').txt(darkModeDestPath);
        xmlRoot.ele('options').txt('zoom');
        xmlRoot.ele('pcolor').txt('#2c001e');
        xmlRoot.ele('scolor').txt('#2c001e');
        xmlRoot.ele('shade_type').txt('solid');

        const xmlString = xmlRoot.end({ prettyPrint: true });
        const xmlFileName = `my_light_dark_wallpaper_${Date.now()}.xml`;
        const xmlFilePath = join(BACKGROUND_PROPERTIES_DIR, xmlFileName);

        await writeFile(xmlFilePath, xmlString);

        console.log(`XML written to: ${xmlFilePath}`);
        return { success: true, xmlPath: xmlFilePath };

    } catch (error) {
        console.error('Error creating dynamic wallpaper:', error);
        return { success: false, error: error.message };
    }
}

export { createDynamicWallpaper };