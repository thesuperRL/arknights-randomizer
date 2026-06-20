export const difficultyColorMap = {
    easy: '#4ade80',
    normal: '#60a5fa',
    hard: '#a855f7',
    insane: '#ff69b4'
};

export const getColorClass = (color) => {
    const colorMap = {
        green: 'text-green-400',
        blue: 'text-blue-400',
        purple: 'text-purple-400',
        orange: 'text-orange-400',
        red: 'text-red-500 font-bold',
        pink: 'text-pink-500 font-bold',
        yellow: 'text-yellow-400 font-bold'
    };
    return colorMap[color] || 'text-ark-text';
};

export const getDifficultyInfo = (difficulty) => {
    const difficultyMap = {
        easy: { text: '简单级限制作战', class: 'bg-green-900/30 text-green-400 border border-green-900/50', name: '简单级限制作战' },
        normal: { text: '普通级限制作战', class: 'bg-blue-900/30 text-blue-400 border border-blue-900/50', name: '普通级限制作战' },
        hard: { text: '困难级限制作战', class: 'bg-purple-900/30 text-purple-400 border border-purple-900/50', name: '困难级限制作战' },
        insane: { text: '变态级限制作战', class: 'bg-pink-900/30 text-pink-400 border border-pink-900/50', name: '变态级限制作战' }
    };
    return difficultyMap[difficulty] || difficultyMap.normal;
};
