import { getColorClass, getDifficultyInfo } from './config/constants.js';
import { formatConstraint, formatLevel, isAllowConstraint } from './utils/formatConstraint.js';
import { state } from './state.js';

export const renderLevel = (level, levelContainer) => {
    if (!levelContainer || !level) return;
    levelContainer.innerHTML = '';

    const levelEl = document.createElement('div');
    levelEl.className = 'result-card';

    const iconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: var(--accent-1)">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
    `;

    levelEl.innerHTML = `
        <div class="result-card-icon">${iconSvg}</div>
        <h3 class="section-heading">
            <span class="section-marker"></span>
            Challenge Stage
        </h3>
        <p class="result-card-body ${getColorClass(level.color)}">${formatLevel(level)}</p>
    `;

    levelContainer.appendChild(levelEl);
};

export const renderConstraints = (constraints, constraintsContainer) => {
    if (!constraintsContainer || !constraints) return;
    constraintsContainer.innerHTML = '';

    constraints.forEach((constraint, index) => {
        const constraintEl = document.createElement('div');
        constraintEl.className = 'result-card';

        const allowed = isAllowConstraint(constraint);
        const iconSvg = allowed
            ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: var(--accent-2)">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
               </svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: var(--tier-ex)">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
               </svg>`;

        constraintEl.innerHTML = `
            <div class="result-card-icon">${iconSvg}</div>
            <h3 class="section-heading">
                <span class="section-marker"></span>
                Restriction ${index + 1}
            </h3>
            <p class="result-card-body ${getColorClass(constraint.color)}">${formatConstraint(constraint)}</p>
        `;

        constraintsContainer.appendChild(constraintEl);
    });
};

export const renderHistory = (historyPanel) => {
    if (!historyPanel) return;
    historyPanel.innerHTML = '';

    if (state.historyRecords.length === 0) {
        historyPanel.innerHTML = '<p class="empty-history" id="empty-history">No challenges generated yet</p>';
        return;
    }

    state.historyRecords.forEach((record, index) => {
        const difficultyInfo = getDifficultyInfo(record.difficulty);
        const recordEl = document.createElement('div');
        recordEl.className = 'history-item';

        const constraintsHtml = `
            <p class="history-detail ${getColorClass(record.constraints[0].color)}">${record.constraints.map(c => formatConstraint(c)).join('; ')}</p>
            <p class="history-detail ${getColorClass(record.level.color)}">${formatLevel(record.level)}</p>
        `;

        recordEl.innerHTML = `
            <div class="history-item-header">
                <p class="history-item-title">#${index + 1} ${record.title}</p>
                <span class="history-badge ${difficultyInfo.badgeClass}">${difficultyInfo.text}</span>
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
