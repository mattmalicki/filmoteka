import { createCard } from './filmCard';
import { loadStorage } from './localStorage';
import { filmClicked } from './modalFilm';

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
  while (grid.firstChild) {
    grid.firstChild.remove();
  }

  const watchedFilms = loadStorage('watchedFilms');
  watchedButton.classList.add('header-library__button--current');
  watchedButtonSticky.classList.add('header-library__button--current');
  queuedButton.classList.remove('header-library__button--current');
  queuedButtonSticky.classList.remove('header-library__button--current');
  if (watchedFilms && watchedFilms.length > 0) {
    grid.addEventListener('click', filmClicked);
    const array = await createCard(watchedFilms);
    grid.append(...array);
    return;
  }
  grid.append(empty());
  grid.removeEventListener('click', filmClicked);
}

async function handleQueuedButton() {
  while (grid.firstChild) {
    grid.firstChild.remove();
  }

  const queuedFilms = loadStorage('queueFilms');

  queuedButton.classList.add('header-library__button--current');
  queuedButtonSticky.classList.add('header-library__button--current');
  watchedButton.classList.remove('header-library__button--current');
  watchedButtonSticky.classList.remove('header-library__button--current');
  if (queuedFilms && queuedFilms.length > 0) {
    grid.addEventListener('click', filmClicked);
    const array = await createCard(queuedFilms);
    grid.append(...array);
    return;
  }
  grid.append(empty());
  grid.removeEventListener('click', filmClicked);
}

function empty() {
  const liElement = document.createElement('li');
  liElement.textContent = 'So empty! 🍿';
  return liElement;
}
