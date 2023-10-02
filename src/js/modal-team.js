const modalTeam = document.querySelector('[data-modalTeam]');
const closeModalTeamButton = modal.querySelector('[data-modalTeam-close]');
const backdrop = modal.querySelector('.backdrop');

function closeModalTeam() {
  modalTeam.classList.add('is-hidden'); // Dodaj klasę is-hidden, aby ukryć modal
}
closeModalTeamButton.addEventListener('click', closeModalTeam);

backdrop.addEventListener('click', event => {
  if (event.target === backdrop) {
    closeModalTeam();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModalTeam();
  }
});
