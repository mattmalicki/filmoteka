const modal = document.querySelector('[data-modal]');
const closeModalButton = modal.querySelector('[data-modal-close]');
const backdrop = modal.querySelector('.backdrop');

function closeModal() {
  modal.classList.add('is-hidden'); // Dodaj klasę is-hidden, aby ukryć modal
}
closeModalButton.addEventListener('click', closeModal);

backdrop.addEventListener('click', event => {
  if (event.target === backdrop) {
    closeModal();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModal();
  }
});
