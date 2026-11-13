export function initNavigation() {
    const hamButton = document.querySelector('#menu');
    const navigation = document.querySelector('.navigation');

    if (hamButton && navigation) {
        hamButton.addEventListener('click', () => {
            const isOpen = navigation.classList.toggle('open');
            hamButton.classList.toggle('open');
            hamButton.setAttribute('aria-expanded', String(isOpen));
        });
    }
}

export function initFooterDates() {
    const yearEl = document.getElementById('currentyear');
    const modEl = document.getElementById('lastModified');

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
    if (modEl) {
        modEl.textContent = `Last Modification: ${document.lastModified}`;
    }
}