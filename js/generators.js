import { getAllNormalEntries, getAllHardEntries, getInsaneEntries, getLevelEntries } from './data/entries.js';
import { getRandom, getRandomSet } from './utils/random.js';
import { state } from './state.js';

export const generateLevel = () => {
    try {
        const levelEntry = getRandom(getLevelEntries());
        state.currentLevel = levelEntry;
        return levelEntry;
    } catch (e) {
        console.error("生成关卡失败:", e);
        const defaultLevel = { text: "当期活动1关", color: "yellow", type: 'level' };
        state.currentLevel = defaultLevel;
        return defaultLevel;
    }
};

export const generateConstraints = () => {
    try {
        let constraints = [];
        switch (state.currentDifficulty) {
            case 'easy':
                constraints.push(getRandom(getAllNormalEntries()));
                break;
            case 'normal':
                constraints.push(...getRandomSet(getAllNormalEntries(), 2));
                break;
            case 'hard':
                constraints.push(...getRandomSet(getAllHardEntries(), 2));
                constraints.push(getRandom(getAllNormalEntries()));
                break;
            case 'insane':
                constraints.push(getRandom(getInsaneEntries()));
                break;
        }
        state.currentConstraints = constraints;
        return constraints;
    } catch (e) {
        console.error("生成限制条件失败:", e);
        const defaultConstraints = [{ text: "3星及以下", color: "green", type: 'forbid' }];
        state.currentConstraints = defaultConstraints;
        return defaultConstraints;
    }
};
