import { getColorClass, getDifficultyInfo } from './config/constants.js';
import { state } from './state.js';

export const renderLevel = (level, levelContainer) => {
    if (!levelContainer || !level) return;
    levelContainer.innerHTML = '';

    const levelEl = document.createElement('div');
    levelEl.className = "bg-ark-panel p-4 rounded border border-ark-panel hover:border-ark-cyan transition-colors group relative overflow-hidden";

    const iconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-ark-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
    `;

    levelEl.innerHTML = `
        <div class="absolute right-0 top-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
            ${iconSvg}
        </div>
        <h3 class="text-ark-cyan text-sm font-bold mb-2 flex items-center">
            <span class="w-2 h-2 bg-ark-cyan mr-2"></span>Challenge Stage
        </h3>
        <p class="text-lg ${getColorClass(level.color)}">Stage: [${level.text}]</p>
    `;

    levelContainer.appendChild(levelEl);
};

export const renderConstraints = (constraints, constraintsContainer) => {
    if (!constraintsContainer || !constraints) return;
    constraintsContainer.innerHTML = '';

    constraints.forEach((constraint, index) => {
        const constraintEl = document.createElement('div');
        constraintEl.className = "bg-ark-panel p-4 rounded border border-ark-panel hover:border-ark-cyan transition-colors group relative overflow-hidden";

        let textPrefix, iconSvg;
        if (constraint.type === 'allow') {
            textPrefix = 'Only use';
            iconSvg = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-ark-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
            `;
        } else {
            textPrefix = 'Cannot use';
            iconSvg = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-ark-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            `;
        }

        constraintEl.innerHTML = `
            <div class="absolute right-0 top-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                ${iconSvg}
            </div>
            <h3 class="text-ark-cyan text-sm font-bold mb-2 flex items-center">
                <span class="w-2 h-2 bg-ark-cyan mr-2"></span>Restriction ${index + 1}
            </h3>
            <p class="text-lg ${getColorClass(constraint.color)}">${textPrefix} [${constraint.text}] operators</p>
        `;

        constraintsContainer.appendChild(constraintEl);
    });
};

export const renderHistory = (historyPanel) => {
    if (!historyPanel) return;
    historyPanel.innerHTML = '';

    if (state.historyRecords.length === 0) {
        historyPanel.innerHTML = '<p class="text-ark-muted text-center" id="empty-history">No operation records</p>';
        return;
    }

    state.historyRecords.forEach((record, index) => {
        const difficultyInfo = getDifficultyInfo(record.difficulty);
        const recordEl = document.createElement('div');
        recordEl.className = 'border-b border-ark-panel pb-2 last:border-0 last:pb-0';

        const constraintsHtml = `
            <p class="text-xs ${getColorClass(record.constraints[0].color)} mt-1">▸ Restrictions: ${record.constraints.map(c => (c.type === 'allow' ? 'Only use' : 'Cannot use') + ' [' + c.text + ']').join(', ')}</p>
            <p class="text-xs ${getColorClass(record.level.color)} mt-1">▸ Stage: [${record.level.text}]</p>
        `;

        recordEl.innerHTML = `
            <div class="flex items-center justify-between">
                <p class="text-sm text-ark-yellow">#${index + 1} ${record.title}</p>
                <span class="text-xs px-2 py-0.5 rounded ${difficultyInfo.class}">${difficultyInfo.text}</span>
            </div>
            ${constraintsHtml}
        `;

        historyPanel.appendChild(recordEl);
    });
};

export const addToHistory = (historyPanel) => {
    if (!state.currentLevel || !state.currentConstraints) return;

    const difficultyInfo = getDifficultyInfo(state.currentDifficulty);
    const record = {
        difficulty: state.currentDifficulty,
        title: difficultyInfo.name,
        level: state.currentLevel,
        constraints: state.currentConstraints
    };

    state.historyRecords.unshift(record);
    if (state.historyRecords.length > 3) {
        state.historyRecords.pop();
    }
    renderHistory(historyPanel);
};
