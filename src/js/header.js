import { loadStorage, saveStorage } from './localStorage';

const chk = document.getElementById('chk');

chk.addEventListener('click', changeTheme);

function changeTheme() {
  document.querySelector('body').classList.toggle('dark');

  loadStorage('darkTheme') ? saveStorage('darkTheme', false) : saveStorage('darkTheme', true);
}

loadTheme();

function loadTheme() {
  if (loadStorage('darkTheme')) {
    addDark();
    chk.checked = true;
  }
}

function addDark() {
  document.querySelector('body').classList.add('dark');
}
