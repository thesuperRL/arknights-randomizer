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
        console.error("获取普通词条失败:", e);
        return [{ text: "3星及以下", color: "green", type: 'forbid' }];
    }
};

export const getAllHardEntries = () => {
    try {
        return entryLibrary.red.map(item => ({ text: item, color: 'red', type: 'forbid' }));
    } catch (e) {
        console.error("获取困难词条失败:", e);
        return [{ text: "长角", color: "red", type: 'forbid' }];
    }
};

export const getInsaneEntries = () => {
    try {
        return entryLibrary.insane.map(item => ({ text: item, color: 'pink', type: 'allow' }));
    } catch (e) {
        console.error("获取变态级词条失败:", e);
        return [{ text: "黑丝", color: "pink", type: 'allow' }];
    }
};

export const getLevelEntries = () => {
    try {
        return entryLibrary.levels.map(item => ({ text: item, color: 'yellow', type: 'level' }));
    } catch (e) {
        console.error("获取关卡词条失败:", e);
        return [{ text: "当期活动1关", color: "yellow", type: 'level' }];
    }
};
