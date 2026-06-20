import { pickNonConflicting } from '../data/conflicts.js';

export const getRandom = (arr) => {
    if (!arr || arr.length === 0) return { text: "Default restriction", color: "green", type: 'forbid' };
    return arr[Math.floor(Math.random() * arr.length)];
};

export const getRandomSet = (arr, n) => {
    const picked = pickNonConflicting(arr, n);
    if (picked.length > 0) return picked;
    if (!arr || arr.length === 0) return [{ text: "Default restriction", color: "green", type: 'forbid' }];
    return [getRandom(arr)];
};
