import { entryLibrary } from './entryLibrary.js';

export const getAllNormalEntries = () => {
    try {
        return [
            ...entryLibrary.green.map(item => ({ text: item, color: 'green', type: 'forbid' })),
            ...entryLibrary.blue.map(item => ({ text: item, color: 'blue', type: 'forbid' })),
            ...entryLibrary.purple.map(item => ({ text: item, color: 'purple', type: 'forbid' })),
            ...entryLibrary.orange.map(item => ({ text: item, color: 'orange', type: 'forbid' }))
        ];
    } catch (e) {
        console.error("Failed to load normal entries:", e);
        return [{ text: "3 stars or below", color: "green", type: 'forbid' }];
    }
};

export const getAllHardEntries = () => {
    try {
        return entryLibrary.red.map(item => ({ text: item, color: 'red', type: 'forbid' }));
    } catch (e) {
        console.error("Failed to load hard entries:", e);
        return [{ text: "Has horns", color: "red", type: 'forbid' }];
    }
};

export const getLevelEntries = () => {
    try {
        return entryLibrary.levels.map(item => ({ text: item, color: 'yellow', type: 'level' }));
    } catch (e) {
        console.error("Failed to load stage entries:", e);
        return [{ text: "Current event Stage 1", color: "yellow", type: 'level' }];
    }
};
