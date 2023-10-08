const modalTeam = document.querySelector('[data-modalTeam]');
const backdropTeam = document.querySelector('.team-backdrop');
const goitStudentsLink = document.querySelector('.footer__container--modal');

goitStudentsLink.addEventListener('click', openModalTeam);
backdropTeam.addEventListener('click', closeModal);

function closeModal(event) {
  const clicked = event.target;
  if (clicked.nodeName === 'use' || clicked.nodeName === 'svg') {
    'modalteamClose' in clicked.closest('button').dataset ? closeModalTeam() : null;
    return;
  } else if (clicked.className.includes('team-backdrop')) {
    closeModalTeam();
    clearData();
    return;
  }
  return;
}

function closeModalTeam() {
  modalTeam.classList.toggle('is-hidden');
}

function keydownClose(event) {
  event.key === 'Escape' ? closeModalTeam() : null;
  document.removeEventListener('keydown', keydownClose);
}

function openModalTeam() {
  modalTeam.classList.toggle('is-hidden');
  document.addEventListener('keydown', keydownClose);
}
