const CLASSES = new Set([
    'Medic', 'Vanguard', 'Guard', 'Sniper', 'Caster', 'Defender', 'Supporter', 'Specialist',
    'Healer', 'Summoner'
]);

const ORIGINS = new Set([
    'Rhodes Island', 'Lungmen', 'Laterano', 'Ursus', 'Sarkaz', 'Feline', 'Canine', 'Avian',
    'Kazimierz', 'Higashi', 'Sargon', 'Minos', 'Columbia', 'Yan', 'Leithanien', 'Victoria',
    'Iberia', 'Kjerag', 'Rim Billiton'
]);

const RARITY_PHRASES = {
    '3 stars or below': 'Cannot use operators at 3★ or below',
    '4-5 stars': 'Cannot use 4★ or 5★ operators',
    'Non-6★': 'Only use 6★ operators',
    '5 stars or below': 'Cannot use operators at 5★ or below',
    '1-2 stars': 'Cannot use 1★ or 2★ operators',
    '3★ only': 'Only use 3★ operators',
    '4★ only': 'Only use 4★ operators',
    '5★ only': 'Only use 5★ operators',
    '4 stars or above': 'Cannot use operators at 4★ or above',
    '6★': 'Cannot use 6★ operators',
    'Limited 6★': 'Cannot use limited 6★ operators',
    'Non-limited 6★': 'Only use limited 6★ operators'
};

const PROGRESSION_PHRASES = {
    'Level 0': 'Cannot use unpromoted (L0) operators',
    'Trust not maxed': 'Cannot use operators without max trust',
    'Alter': 'Cannot use alter operators',
    'Unpromoted': 'Cannot use unpromoted operators',
    'No module': 'Cannot use operators without a module',
    'Elite 1': 'Cannot use E1 operators',
    'Elite 2': 'Cannot use E2 operators',
    'Max level': 'Cannot use max-level operators',
    'M3': 'Cannot use M3 operators',
    "Never M3'd": 'Cannot use operators without M3',
    'Max trust': 'Cannot use max-trust operators',
    'Dual-module': 'Cannot use dual-module operators',
    'Non-alter': 'Only use alter operators'
};

const TAG_PHRASES = {
    'Limited': 'Cannot use limited operators',
    'Anniversary': 'Cannot use anniversary operators',
    'Summer event': 'Cannot use summer event operators',
    'Free': 'Cannot use free operators',
    'Collab': 'Cannot use collaboration operators',
    'Integrated Strategies': 'Cannot use Integrated Strategies operators',
    'Mirror Ops': 'Cannot use Mirror Ops operators',
    'Robot': 'Cannot use robot operators',
    'Mechanical': 'Cannot use mechanical operators',
    'Female': 'Cannot use female operators',
    'Male': 'Cannot use male operators',
    'Melee': 'Cannot use melee operators',
    'Ranged': 'Cannot use ranged operators',
    'High ground': 'Cannot use high-ground operators',
    'Ground': 'Cannot use ground operators',
    'Hold skill': 'Cannot use operators with hold skills',
    'Automatic skill': 'Cannot use operators with automatic skills'
};

const NON_PREFIX_PHRASES = {
    'Non-limited': 'Only use limited operators',
    'Non-anniversary': 'Only use anniversary operators',
    'Non-summer event': 'Only use summer event operators',
    'Non-free': 'Only use free operators',
    'Non-collab': 'Only use collaboration operators'
};

const COMBAT_PHRASES = {
    'AoE type': 'Cannot use operators with AoE normal attacks',
    'Single-target type': 'Cannot use operators with single-target normal attacks',
    'Both AoE and single-target': 'Cannot use operators with both AoE and single-target attacks',
    'Skill AoE type': 'Cannot use operators with AoE skills',
    'Skill single-target type': 'Cannot use operators with single-target skills',
    'Attack range over 1 tile': 'Cannot use operators with attack range over 1 tile',
    'Attack range 1 tile or less': 'Cannot use operators with attack range of 1 tile or less',
    'Attack recovery skill': 'Cannot use operators with attack recovery skills',
    'Auto recovery skill': 'Cannot use operators with automatic recovery skills',
    'On-hit recovery skill': 'Cannot use operators with on-hit recovery skills',
    'Attack-type skill': 'Cannot use operators with attack-type skills',
    'Buff-type skill': 'Cannot use operators with buff-type skills',
    'Global-range skill': 'Cannot use operators with global-range skills',
    'Switch skill': 'Cannot use operators with switch skills',
    'Healing skill': 'Cannot use operators with healing skills',
    'Stun skill': 'Cannot use operators with stun skills',
    'Bind skill': 'Cannot use operators with bind skills',
    'Physical damage': 'Cannot use operators who deal physical damage',
    'Arts damage': 'Cannot use operators who deal arts damage',
    'Low DP cost (≤10)': 'Cannot use operators with DP cost ≤10',
    'High DP cost (≥20)': 'Cannot use operators with DP cost ≥20',
    'Summon skill': 'Cannot use operators with summon skills',
    'Crowd control skill': 'Cannot use operators with crowd control skills',
    'Self-buff skill': 'Cannot use operators with self-buff skills'
};

const APPEARANCE_PHRASES = {
    'Mostly blue': 'Cannot use operators that are mostly blue',
    'Mostly pink': 'Cannot use operators that are mostly pink',
    'Mostly red': 'Cannot use operators that are mostly red',
    'Mostly yellow': 'Cannot use operators that are mostly yellow',
    'Mostly white': 'Cannot use operators that are mostly white',
    'Mostly green': 'Cannot use operators that are mostly green',
    'Warm colors': 'Cannot use warm-colored operators',
    'Cool colors': 'Cannot use cool-colored operators',
    'Under 160cm tall': 'Cannot use operators under 160 cm tall',
    'Over 160cm tall': 'Cannot use operators over 160 cm tall',
    'Has horns': 'Cannot use operators with horns',
    'No horns': 'Cannot use operators without horns',
    'Has limited skin': 'Cannot use operators with a limited skin',
    'Wears gloves': 'Cannot use operators who wear gloves',
    'No gloves': 'Cannot use operators who do not wear gloves',
    'Carries utensils': 'Cannot use operators who carry utensils',
    'Has tail': 'Cannot use operators with a tail',
    'No tail': 'Cannot use operators without a tail',
    'Carries food': 'Cannot use operators who carry food',
    'No food': 'Cannot use operators who do not carry food',
    'Only one skin': 'Cannot use operators with only one skin',
    'No skins': 'Cannot use operators with no skins',
    'At least two skins': 'Cannot use operators with at least two skins',
    'Smooth texture': 'Cannot use operators with smooth texture',
    'Uses cold weapons': 'Cannot use operators who use cold weapons',
    'Uses firearms': 'Cannot use operators who use firearms',
    'No weapons': 'Cannot use operators who use no weapons',
    "Has weapons but doesn't use them": 'Cannot use operators who carry unused weapons',
    'Uses multiple weapons': 'Cannot use operators who use multiple weapons',
    'Wears armor': 'Cannot use operators who wear armor',
    'Wears a dress': 'Cannot use operators who wear a dress',
    'Wears a hat': 'Cannot use operators who wear a hat',
    'Wears glasses': 'Cannot use operators who wear glasses',
    'Wears a mask': 'Cannot use operators who wear a mask',
    'Something in mouth': 'Cannot use operators with something in their mouth',
    'Has animated skin': 'Cannot use operators with an animated skin',
    'Blue eyes': 'Cannot use operators with blue eyes',
    'Red eyes': 'Cannot use operators with red eyes',
    'Closed eyes': 'Cannot use operators with closed eyes',
    'No hair': 'Cannot use operators with no hair',
    'Non-humanoid': 'Cannot use non-humanoid operators',
    'Relative on the island': 'Cannot use operators with a relative on the island',
    'Loud voice lines': 'Cannot use operators with loud voice lines',
    'Quiet voice lines': 'Cannot use operators with quiet voice lines',
    'Joined before 2020': 'Cannot use operators who joined before 2020',
    'Joined after 2020': 'Cannot use operators who joined after 2020',
    'White hair': 'Cannot use operators with white hair',
    'Pink hair': 'Cannot use operators with pink hair',
    'Blonde hair': 'Cannot use operators with blonde hair',
    'Green hair': 'Cannot use operators with green hair',
    'Brown hair': 'Cannot use operators with brown hair',
    'Black hair': 'Cannot use operators with black hair',
    'Purple hair': 'Cannot use operators with purple hair',
    "Doesn't talk much": 'Cannot use operators who do not talk much',
    'Talkative': 'Cannot use talkative operators',
    'Visual effects heavy': 'Cannot use operators with heavy visual effects',
    'One eye covered': 'Cannot use operators with one eye covered',
    'Bare arms': 'Cannot use operators with bare arms',
    'Long sleeves': 'Cannot use operators with long sleeves',
    'Ear visible': 'Cannot use operators with visible ears',
    'Scarf or cloak': 'Cannot use operators who wear a scarf or cloak'
};

const LOOKUP = {
    ...RARITY_PHRASES,
    ...PROGRESSION_PHRASES,
    ...TAG_PHRASES,
    ...NON_PREFIX_PHRASES,
    ...COMBAT_PHRASES,
    ...APPEARANCE_PHRASES
};

const formatAllow = (text) => {
    if (LOOKUP[text]) {
        return LOOKUP[text].replace(/^Cannot use /, 'Only use ').replace(/^Cannot use operators /, 'Only use operators ');
    }
    if (text.includes(' or ')) {
        return `Only use ${text} operators`;
    }
    if (CLASSES.has(text)) {
        return `Only use ${text} operators`;
    }
    if (ORIGINS.has(text)) {
        return `Only use ${text} operators`;
    }
    return `Only use ${text} operators`;
};

const formatForbid = (text) => {
    if (LOOKUP[text]) return LOOKUP[text];

    if (text.startsWith('Non-')) {
        const rest = text.slice(4);
        return `Only use ${rest.charAt(0).toLowerCase()}${rest.slice(1)} operators`;
    }

    if (text.includes(' or ')) {
        return `Cannot use ${text} operators`;
    }

    if (CLASSES.has(text) || ORIGINS.has(text)) {
        return `Cannot use ${text} operators`;
    }

    return `Cannot use ${text} operators`;
};

/** @param {{ text: string, type?: string }} constraint */
export const formatConstraint = (constraint) => {
    const { text, type = 'forbid' } = constraint;
    if (type === 'allow') return formatAllow(text);
    return formatForbid(text);
};

/** @param {{ text: string }} level */
export const formatLevel = (level) => {
    if (!level?.text) return '';
    return `Play ${level.text}`;
};

export const isAllowConstraint = (constraint) => {
    const phrase = formatConstraint(constraint);
    return phrase.startsWith('Only use');
};
