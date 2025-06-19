import path from 'path';
import snapInstaller from 'electron-installer-snap';
// Ensure ForgeMutatingHookFn is imported
import type { ForgeMutatingHookFn, ForgeMakeResult } from '@electron-forge/shared-types';


// 🔥 THIS is the key fix: Use ForgeMutatingHookFn
const postMakeSnap: ForgeMutatingHookFn<'postMake'> = async (config, makeResults): Promise<ForgeMakeResult[]> => {
    const linuxResult = makeResults.find(result => result.platform === 'linux' && result.arch === 'x64');

    if (!linuxResult || linuxResult.artifacts.length === 0) {
        console.warn('No suitable Linux artifacts found. Skipping Snap packaging.');
        return makeResults;
    }

    const buildPath = path.dirname(linuxResult.artifacts[0]);

    // Added a try-catch for better error handling during snap packaging
    try {
        await snapInstaller({
            src: buildPath,
            dest: path.resolve(__dirname, '../../snap-out'),
            arch: 'amd64',
            options: {
                name: 'wallcrunch',
                summary: 'Create GNOME dynamic wallpapers',
                description: 'WallCrunch creates GNOME-compatible dynamic wallpapers with ease.',
                grade: 'devel',
                confinement: 'strict',
            },
        });
        console.log('Snap package created successfully.');
    } catch (error) {
        console.error('Failed to create Snap package:', error);
        // Depending on your preference, you might want to throw the error
        // or just log it and continue. For now, we'll just log and continue.
    }


    return makeResults;
};

export default postMakeSnap;