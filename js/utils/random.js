export const getRandom = (arr) => {
    if (!arr || arr.length === 0) return { text: "默认限制", color: "green", type: 'forbid' };
    return arr[Math.floor(Math.random() * arr.length)];
};

export const getRandomSet = (arr, n) => {
    if (!arr || arr.length === 0) return [{ text: "默认限制", color: "green", type: 'forbid' }];
    if (arr.length <= n) return [...arr];
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
};
