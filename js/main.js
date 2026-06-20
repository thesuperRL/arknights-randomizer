import { difficultyColorMap } from './config/constants.js';
import { generateLevel, generateConstraints } from './generators.js';
import { renderLevel, renderConstraints, addToHistory } from './render.js';
import { state } from './state.js';
import { createModal } from './ui/modal.js';

const difficultySelect = document.getElementById('difficulty-select');
const initialTip = document.getElementById('initial-tip');
const resultPanel = document.getElementById('result-panel');
const levelContainer = document.getElementById('level-container');
const constraintsContainer = document.getElementById('constraints-container');
const typingCursor = document.querySelector('.typing-cursor');
const historyPanel = document.getElementById('history-panel');
const skinIllustSwitch = document.getElementById('skinIllustSwitch');
const unownedSkinSwitch = document.getElementById('unownedSkinSwitch');
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalClose = document.getElementById('modalClose');
const generateLevelBtn = document.getElementById('generate-level-btn');
const generateConstraintsBtn = document.getElementById('generate-constraints-btn');

const { showModal, hideModal } = createModal({ modalOverlay, modalTitle, modalMessage });

const setDifficultySelectColor = (value) => {
    if (!difficultySelect) return;
    difficultySelect.style.color = difficultyColorMap[value] || '#E0E0E0';
};

difficultySelect.addEventListener('change', (e) => {
    state.currentDifficulty = e.target.value;
    setDifficultySelectColor(state.currentDifficulty);
    state.currentLevel = null;
    state.currentConstraints = null;
    resultPanel.classList.add('hidden');
    initialTip.classList.remove('hidden');
    typingCursor.textContent = "DIFFICULTY UPDATED. PLEASE REGENERATE.";
});

skinIllustSwitch.addEventListener('change', () => {
    const isChecked = skinIllustSwitch.checked;
    const message = isChecked
        ? '挑战中可以包括皮肤和立绘'
        : '挑战中不可以包括皮肤和立绘';
    showModal('皮肤和立绘规则变更', message);
});

unownedSkinSwitch.addEventListener('change', () => {
    const isChecked = unownedSkinSwitch.checked;
    const message = isChecked
        ? '挑战中可以包括未拥有的皮肤'
        : '挑战中不可以包括未拥有的皮肤';
    showModal('未拥有皮肤规则变更', message);
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

    typingCursor.textContent = "LEVEL GENERATED. " + new Date().toLocaleTimeString();

    if (state.currentConstraints) {
        addToHistory(historyPanel);
    }
});

generateConstraintsBtn.addEventListener('click', () => {
    resultPanel.classList.remove('hidden');
    initialTip.classList.add('hidden');

    const constraints = generateConstraints();
    renderConstraints(constraints, constraintsContainer);

    typingCursor.textContent = "CONSTRAINTS GENERATED. " + new Date().toLocaleTimeString();

    if (state.currentLevel) {
        addToHistory(historyPanel);
    }
});

setDifficultySelectColor(state.currentDifficulty);
