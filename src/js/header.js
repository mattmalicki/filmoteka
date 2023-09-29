import { loadStorage, saveStorage } from './localStorage';

const chk = document.getElementById('chk');

chk.addEventListener('click', changeTheme);

function changeTheme() {
  //sam sprawdzi czy jest dark czy nie i albo usunie albo doda
  document.querySelector('body').classList.toggle('dark');

  //pobiera dane z local i sprawdza ktore jest i zapisuje przeciwne do tego co jest.
  loadStorage('theme') === 'dark' ? saveStorage('theme', 'light') : saveStorage('theme', 'dark');
}
loadStorage('theme') === 'dark' ? changeTheme() : null;
