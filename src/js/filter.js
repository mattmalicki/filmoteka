import { getMoviesGenres } from './getGenres';

const filter = document.querySelector('.filter');
const header = document.querySelector('.header-library');
const form = document.querySelector('#search-form');

const filterOpen = document.querySelector('#filter-open');
const filterOpenSticky = document.querySelector('#filter-open-sticky');
const filterClose = document.querySelector('.filter__button');

if (!header) {
  filterOpen.addEventListener('click', showFilters);
  filterOpenSticky.addEventListener('click', showFiltersSticky);
  filterClose.addEventListener('click', hideFilters);
}

function outsideWindow(event) {
  if (event.target.closest('.filter__button-open') || event.target.closest('#filter')) {
    return;
  }
  hideFilters();
  window.removeEventListener('click', outsideWindow);
}

async function createChck() {
  if (header) {
    return;
  }
  try {
    const element = document.querySelector('.filter__genres');
    const genresArray = await getMoviesGenres();
    genresArray.forEach(genre => {
      const genreEl = document.createElement('input');
      const label = document.createElement('label');
      genreEl.value = genre.id;
      genreEl.id = genre.id;
      genreEl.type = 'checkbox';
      genreEl.dataset.idName = genre.name;
      genreEl.name = 'genres';
      genreEl.classList.add('filter__genres-check');
      label.for = 'genres';
      label.classList.add('filter__item');
      label.textContent = genre.name;
      label.prepend(genreEl);
      element.append(label);
    });
  } catch (err) {
    console.log(`Error: ${err.toString()}`);
  }
}

function showFilters(event) {
  if (isMobile()) {
    filter.style.top = `230px`;
    filter.style.left = `0px`;
  } else if (isTablet()) {
    filter.style.top = `${form.getBoundingClientRect().top + 25}px`;
    filter.style.left = `${form.getBoundingClientRect().left}px`;
  } else {
    filter.style.top = `${event.clientY}px`;
    filter.style.left = `${event.clientX}px`;
  }
  filter.classList.remove('is-hidden');
  window.addEventListener('click', outsideWindow);
}

function showFiltersSticky(event) {
  const formSticky = document.querySelector('.header__sticky__search-form');

  if (isMobile()) {
    filter.style.top = `${formSticky.getBoundingClientRect().top + 75}px`;
    filter.style.left = `0px`;
  } else if (isTablet()) {
    filter.style.top = `${formSticky.getBoundingClientRect().top + 25}px`;
    filter.style.left = `${formSticky.getBoundingClientRect().left}px`;
  } else {
    filter.style.top = `${event.clientY}px`;
    filter.style.left = `${event.clientX}px`;
  }
  filter.classList.remove('is-hidden');
  window.addEventListener('click', outsideWindow);
}

function hideFilters() {
  filter.classList.add('is-hidden');
}

export function getFilter() {
  const genres = document.querySelectorAll('[name="genres"]');
  const filterGenres = [];
  genres.forEach(el => {
    el.checked ? filterGenres.push(el.id) : null;
  });
  return filterGenres;
}

function isMobile() {
  return window.matchMedia('(max-width: 767.99px)').matches;
}
function isTablet() {
  return window.matchMedia('(min-width: 768px) and (max-width: 1279.99px)').matches;
}
createChck();
