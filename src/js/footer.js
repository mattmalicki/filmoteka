const footer = document.getElementById('footer');
const toggleButton = document.getElementById('toggle-footer');
const iconUp = toggleButton.querySelector('.icon-circle-up');
const iconDown = toggleButton.querySelector('.icon-circle-down');
const openModalButton = document.querySelector('.footer__container--modal');
const modal = document.querySelector('[data-modal]');
const closeModalButton = modal.querySelector('[data-modal-close]');

function toggleFooter() {
  footer.classList.toggle('active');

  // Przełącz widoczność ikon w zależności od stanu footera
  iconUp.classList.toggle('hidden', footer.classList.contains('active'));
  iconDown.classList.toggle('hidden', !footer.classList.contains('active'));

  if (footer.classList.contains('active')) {
    toggleButton.style.bottom = '45px';
  } else {
    toggleButton.style.bottom = '15px'; // Domyślna pozycja przycisku
  }
}

toggleButton.addEventListener('click', toggleFooter);

// Dodaj obsługę otwierania i zamykania modalu po kliknięciu w "GOIT Students"
openModalButton.addEventListener('click', () => {
  modal.classList.remove('is-hidden');
});

closeModalButton.addEventListener('click', () => {
  modal.classList.add('is-hidden');
});
