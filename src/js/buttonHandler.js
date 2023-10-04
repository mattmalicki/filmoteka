import { createCard } from './filmCard';
import { loadStorage } from './localStorage';
const watchedButton = document.querySelector('#libraryWatchedButton');
const queuedButton = document.querySelector('#libraryQueuedButton');
const grid = document.querySelector('.films__grid');

if (watchedButton) {
  watchedButton.addEventListener('click', handleWatchedButton);
  handleWatchedButton();
}
if (queuedButton) {
  queuedButton.addEventListener('click', handleQueuedButton);
}

async function handleWatchedButton() {
  grid.innerHTML = '';
  const watchedFilms = loadStorage('watchedFilms');
  watchedButton.classList.add('my-library-header__button--current');
  queuedButton.classList.remove('my-library-header__button--current');
  if (watchedFilms.length !== 0) {
    const array = await createCard(watchedFilms);
    grid.append(...array);
    return;
  }
  grid.textContent = 'So empty! 🍿';
}

async function handleQueuedButton() {
  grid.innerHTML = '';

  const queuedFilms = loadStorage('queueFilms');

  queuedButton.classList.add('my-library-header__button--current');
  watchedButton.classList.remove('my-library-header__button--current');
  if (queuedFilms.length !== 0) {
    const array = await createCard(queuedFilms);
    grid.append(...array);
    return;
  }
  grid.textContent = 'So empty! 🍿';
}
