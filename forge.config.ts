// forge.config.ts
import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
// Removed MakerSnap for current focus
import path from 'path';

const config: ForgeConfig = {
  packagerConfig: {
    name: 'DyWall',
    executableName: 'dywall',
    // This is the primary icon for the bundled app.
    // It's good practice to provide .ico (Windows), .icns (macOS), and .png (Linux)
    // and let electron-packager pick. If you only provide .png, it will work for Linux.
    icon: path.join(__dirname, 'assets', 'icons', 'icon'), // Omit extension for cross-platform
    appBundleId: 'com.dywall.app',
    appCategoryType: 'public.app-category.utilities',
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}), // For Windows
    new MakerZIP({}, ['darwin']), // For macOS
    new MakerDeb({ // For Debian/Ubuntu
      options: {
        // 🔥 Add icon here specifically for the .deb package metadata
        icon: path.join(__dirname, 'assets', 'icons', 'icon.png'),
        // You might also want to set other options for MakerDeb
        productName: 'DyWall', // Important for deb package name
        description: 'DyWall creates GNOME-compatible dynamic wallpapers with ease.',
        name: "DyWall",
        categories: ['Utility', 'Settings'],
        productDescription: 'Create GNOME dynamic wallpapers',
        suggests: ['gnome-shell', 'gnome-tweaks'],
        // homepage: 'https://your-app-website.com',
      }
    })
  // If you were using MakerSnap, it would also need its own icon:
    /*
    new MakerSnap({
        icon: path.join(__dirname, 'assets', 'icons', 'icon.png'),
        // ... other snap options
    }),
    */
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig: './webpack.main.config.js',
      renderer: {
        config: './webpack.renderer.config.js',
        entryPoints: [
          {
            html: './src/index.html',
            js: './src/renderer.ts',
            name: 'main_window',
            preload: {
              js: './src/preload.ts',
            },
          },
        ],
      },
    }),
  ],
  hooks: {},
};

export default config;