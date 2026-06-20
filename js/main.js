import { difficultyColorMap } from './config/constants.js';
import { MAIN_SITE_URL, ORIGINAL_AUTHOR } from './config/site.js';
import { generateLevel, generateConstraints } from './generators.js';
import { renderLevel, renderConstraints, addToHistory } from './render.js';
import { state } from './state.js';
import { createModal } from './ui/modal.js';

const difficultySelect = document.getElementById('difficulty-select');
const initialTip = document.getElementById('initial-tip');
const resultPanel = document.getElementById('result-panel');
const levelContainer = document.getElementById('level-container');
const constraintsContainer = document.getElementById('constraints-container');
const statusText = document.getElementById('status-text');
const historyPanel = document.getElementById('history-panel');
const skinIllustSwitch = document.getElementById('skinIllustSwitch');
const unownedSkinSwitch = document.getElementById('unownedSkinSwitch');
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalClose = document.getElementById('modalClose');
const generateLevelBtn = document.getElementById('generate-level-btn');
const generateConstraintsBtn = document.getElementById('generate-constraints-btn');

for (const id of ['nav-logo', 'nav-home', 'footer-home']) {
    const link = document.getElementById(id);
    if (link) link.href = MAIN_SITE_URL;
}

for (const id of ['original-author-link', 'original-author-bilibili']) {
    const link = document.getElementById(id);
    if (link) {
        link.href = ORIGINAL_AUTHOR.bilibiliUrl;
        if (id === 'original-author-bilibili') {
            link.textContent = `Original author: ${ORIGINAL_AUTHOR.name} (Bilibili)`;
        } else {
            link.textContent = ORIGINAL_AUTHOR.name;
        }
    }
}

const { showModal, hideModal } = createModal({ modalOverlay, modalTitle, modalMessage });

const setDifficultySelectColor = (value) => {
    if (!difficultySelect) return;
    difficultySelect.style.color = difficultyColorMap[value] || '#F2F2F2';
};

const setStatus = (message) => {
    if (statusText) statusText.textContent = message;
};

difficultySelect.addEventListener('change', (e) => {
    state.currentDifficulty = e.target.value;
    setDifficultySelectColor(state.currentDifficulty);
    state.currentLevel = null;
    state.currentConstraints = null;
    resultPanel.classList.add('hidden');
    initialTip.classList.remove('hidden');
    setStatus('Difficulty updated. Draw a new stage or restrictions.');
});

skinIllustSwitch.addEventListener('change', () => {
    const isChecked = skinIllustSwitch.checked;
    const message = isChecked
        ? 'Skins and illustrations are allowed in this challenge.'
        : 'Skins and illustrations are not allowed in this challenge.';
    showModal('Skins & Illustrations Rule Changed', message);
});

unownedSkinSwitch.addEventListener('change', () => {
    const isChecked = unownedSkinSwitch.checked;
    const message = isChecked
        ? 'Unowned skins are allowed in this challenge.'
        : 'Unowned skins are not allowed in this challenge.';
    showModal('Unowned Skins Rule Changed', message);
});

modalClose.addEventListener('click', hideModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        hideModal();
    }
});

generateLevelBtn.addEventListener('click', () => {
    resultPanel.classList.remove('hidden');
    initialTip.classList.add('hidden');

    const level = generateLevel();
    renderLevel(level, levelContainer);

    setStatus('Stage generated at ' + new Date().toLocaleTimeString() + '.');

    if (state.currentConstraints) {
        addToHistory(historyPanel);
    }
});

generateConstraintsBtn.addEventListener('click', () => {
    resultPanel.classList.remove('hidden');
    initialTip.classList.add('hidden');

    const constraints = generateConstraints();
    renderConstraints(constraints, constraintsContainer);

    setStatus('Restrictions generated at ' + new Date().toLocaleTimeString() + '.');

    if (state.currentLevel) {
        addToHistory(historyPanel);
    }
});

setDifficultySelectColor(state.currentDifficulty);
