const footer = document.getElementById('footer');
const toggleButton = document.getElementById('toggle-footer');
const iconUp = toggleButton.querySelector('.icon-circle-up');
const iconDown = toggleButton.querySelector('.icon-circle-down');
const goitStudentsLink = document.querySelector('.footer__container--modal');

// Funkcja do otwierania modala
function openModalTeam() {
  modalTeam.classList.remove('is-hidden'); // Usuń klasę is-hidden, aby pokazać modal
}

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
goitStudentsLink.addEventListener('click', openModalTeam);
toggleButton.addEventListener('click', toggleFooter);
