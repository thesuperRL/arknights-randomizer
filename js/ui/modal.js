export const createModal = (elements) => {
    const { modalOverlay, modalTitle, modalMessage } = elements;

    const showModal = (title, message) => {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modalOverlay.classList.add('active');
    };

    const hideModal = () => {
        modalOverlay.classList.remove('active');
    };

    return { showModal, hideModal };
};
