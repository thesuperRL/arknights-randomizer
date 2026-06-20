import { getAllNormalEntries, getAllHardEntries, getLevelEntries } from './data/entries.js';
import { pickNonConflicting, filterCompatible } from './data/conflicts.js';
import { getRandom } from './utils/random.js';
import { state } from './state.js';

export const generateLevel = () => {
    try {
        const levelEntry = getRandom(getLevelEntries());
        state.currentLevel = levelEntry;
        return levelEntry;
    } catch (e) {
        console.error("Failed to generate stage:", e);
        const defaultLevel = { text: "Current event Stage 1", color: "yellow", type: 'level' };
        state.currentLevel = defaultLevel;
        return defaultLevel;
    }
};

export const generateConstraints = () => {
    try {
        let constraints = [];
        switch (state.currentDifficulty) {
            case 'easy':
                constraints.push(...pickNonConflicting(getAllNormalEntries(), 1));
                break;
            case 'normal':
                constraints.push(...pickNonConflicting(getAllNormalEntries(), 2));
                break;
            case 'hard':
                const hardPicks = pickNonConflicting(getAllHardEntries(), 2);
                const normalPool = filterCompatible(getAllNormalEntries(), hardPicks);
                const normalPick = pickNonConflicting(
                    normalPool.length > 0 ? normalPool : getAllNormalEntries(),
                    1,
                    hardPicks
                );
                constraints.push(...hardPicks, ...normalPick);
                break;
        }

        if (constraints.length === 0) {
            constraints.push(getRandom(getAllNormalEntries()));
        }

        state.currentConstraints = constraints;
        return constraints;
    } catch (e) {
        console.error("Failed to generate restrictions:", e);
        const defaultConstraints = [{ text: "3 stars or below", color: "green", type: 'forbid' }];
        state.currentConstraints = defaultConstraints;
        return defaultConstraints;
    }
};
