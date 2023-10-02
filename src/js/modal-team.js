const modalTeam = document.querySelector('[data-modalTeam]');
const closeModalTeamButton = document.querySelector('[data-modalTeam-close]');
const backdropTeam = document.querySelector('.team-backdrop');

function closeModalTeam() {
  modalTeam.classList.add('is-hidden'); // Dodaj klasę is-hidden, aby ukryć modal
}
closeModalTeamButton.addEventListener('click', closeModalTeam);

backdrop.addEventListener('click', event => {
  if (event.target === backdropTeam) {
    closeModalTeam();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModalTeam();
  }
});
