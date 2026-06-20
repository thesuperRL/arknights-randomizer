export const difficultyColorMap = {
    easy: '#4ade80',
    normal: '#60a5fa',
    hard: '#a855f7'
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
        easy: { text: 'Easy Tier', class: 'bg-green-900/30 text-green-400 border border-green-900/50', name: 'Easy Tier Restricted Ops' },
        normal: { text: 'Normal Tier', class: 'bg-blue-900/30 text-blue-400 border border-blue-900/50', name: 'Normal Tier Restricted Ops' },
        hard: { text: 'Hard Tier', class: 'bg-purple-900/30 text-purple-400 border border-purple-900/50', name: 'Hard Tier Restricted Ops' }
    };
    return difficultyMap[difficulty] || difficultyMap.normal;
};
