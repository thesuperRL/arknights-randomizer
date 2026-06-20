export const difficultyColorMap = {
    easy: '#90ee90',
    normal: '#87ceeb',
    hard: '#c4b5d4'
};

export const getColorClass = (color) => {
    const colorMap = {
        green: 'text-green',
        blue: 'text-blue',
        purple: 'text-purple',
        orange: 'text-orange',
        red: 'text-red',
        pink: 'text-pink',
        yellow: 'text-yellow'
    };
    return colorMap[color] || '';
};

export const getDifficultyInfo = (difficulty) => {
    const difficultyMap = {
        easy: {
            text: 'Easy Tier',
            badgeClass: 'badge-easy',
            name: 'Easy Tier Restricted Ops'
        },
        normal: {
            text: 'Normal Tier',
            badgeClass: 'badge-normal',
            name: 'Normal Tier Restricted Ops'
        },
        hard: {
            text: 'Hard Tier',
            badgeClass: 'badge-hard',
            name: 'Hard Tier Restricted Ops'
        }
    };
    return difficultyMap[difficulty] || difficultyMap.normal;
};
