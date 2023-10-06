import { createCard } from './filmCard';
import { loadStorage } from './localStorage';
const headerLibrary = document.querySelector('.header-library');
const watchedButton = document.querySelector('#libraryWatchedButton');
const watchedButtonSticky = document.querySelector('#libraryWatchedButton-sticky');
const queuedButton = document.querySelector('#libraryQueuedButton');
const queuedButtonSticky = document.querySelector('#libraryQueuedButton-sticky');
const grid = document.querySelector('.films__grid');

if (headerLibrary) {
  watchedButton.addEventListener('click', handleWatchedButton);
  watchedButtonSticky.addEventListener('click', handleWatchedButton);
  queuedButton.addEventListener('click', handleQueuedButton);
  queuedButtonSticky.addEventListener('click', handleQueuedButton);
  handleWatchedButton();
}

async function handleWatchedButton() {
  grid.innerHTML = '';
  const watchedFilms = loadStorage('watchedFilms');
  watchedButton.classList.add('my-library-header__button--current');
  watchedButtonSticky.classList.add('my-library-header__button--current');
  queuedButton.classList.remove('my-library-header__button--current');
  queuedButtonSticky.classList.remove('my-library-header__button--current');
  if (watchedFilms.length > 0) {
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
  queuedButtonSticky.classList.add('my-library-header__button--current');
  watchedButton.classList.remove('my-library-header__button--current');
  watchedButtonSticky.classList.remove('my-library-header__button--current');
  if (queuedFilms.length > 0) {
    const array = await createCard(queuedFilms);
    grid.append(...array);
    return;
  }
  grid.textContent = 'So empty! 🍿';
}
