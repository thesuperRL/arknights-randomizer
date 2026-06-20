// Entries in the same mutex group cannot appear together in one draw.
const MUTEX_GROUPS = [
    ['6★', 'Non-6★'],
    ['3 stars or below', '4 stars or above'],
    ['Alter', 'Non-alter'],
    ['Limited', 'Non-limited'],
    ['Limited 6★', 'Non-limited 6★'],
    ['Anniversary', 'Non-anniversary'],
    ['Summer event', 'Non-summer event'],
    ['Free', 'Non-free'],
    ['Collab', 'Non-collab'],
    ['Female', 'Male'],
    ['Melee', 'Ranged'],
    ['High ground', 'Ground'],
    ['M3', "Never M3'd"],
    ['Max trust', 'Trust not maxed'],
    ['Max level', 'Level 0'],
    ['Has horns', 'No horns'],
    ['Wears gloves', 'No gloves'],
    ['Has tail', 'No tail'],
    ['Carries food', 'No food'],
    ['Only one skin', 'No skins'],
    ['Only one skin', 'At least two skins'],
    ['No skins', 'At least two skins'],
    ['No skins', 'Has limited skin'],
    ['No skins', 'Has animated skin'],
    ['Joined before 2020', 'Joined after 2020'],
    ['Loud voice lines', 'Quiet voice lines'],
    ["Doesn't talk much", 'Talkative'],
    ['Under 160cm tall', 'Over 160cm tall'],
    ['Attack range over 1 tile', 'Attack range 1 tile or less'],
    ['AoE type', 'Single-target type'],
    ['Skill AoE type', 'Skill single-target type'],
    ['Physical damage', 'Arts damage'],
    ['Low DP cost (≤10)', 'High DP cost (≥20)'],
    ['3★ only', '6★'],
    ['4★ only', '6★'],
    ['5★ only', '6★'],
    ['1-2 stars', '6★'],
];

const textToMutexGroups = new Map();
MUTEX_GROUPS.forEach((group, groupId) => {
    group.forEach((text) => {
        if (!textToMutexGroups.has(text)) {
            textToMutexGroups.set(text, new Set());
        }
        textToMutexGroups.get(text).add(groupId);
    });
});

const normalizePair = (a, b) => (a < b ? `${a}|${b}` : `${b}|${a}`);

const oppositePairs = new Set();
MUTEX_GROUPS.forEach((group) => {
    for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {
            oppositePairs.add(normalizePair(group[i], group[j]));
        }
    }
});

const sharesMutexGroup = (textA, textB) => {
    const groupsA = textToMutexGroups.get(textA);
    const groupsB = textToMutexGroups.get(textB);
    if (!groupsA || !groupsB) return false;
    for (const id of groupsA) {
        if (groupsB.has(id)) return true;
    }
    return false;
};

export const entriesConflict = (a, b) => {
    if (!a || !b) return false;
    if (a.text === b.text) return true;

    if (oppositePairs.has(normalizePair(a.text, b.text))) return true;

    if (sharesMutexGroup(a.text, b.text)) return true;

    return false;
};

export const filterCompatible = (pool, selected) => {
    if (!selected.length) return [...pool];
    return pool.filter((entry) => !selected.some((s) => entriesConflict(s, entry)));
};

export const pickNonConflicting = (pool, count, alreadySelected = []) => {
    const selected = [...alreadySelected];

    for (let i = 0; i < count; i++) {
        const candidates = filterCompatible(pool, selected);
        if (candidates.length === 0) break;
        const pick = candidates[Math.floor(Math.random() * candidates.length)];
        selected.push(pick);
    }

    return selected.slice(alreadySelected.length);
};
