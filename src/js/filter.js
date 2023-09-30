import { getAllGenres } from './getGenres';

createChck();
const filter = document.querySelector('.filter');

const headerBttn = document.querySelector('.header__search-button');
const test = document.querySelector('#test');

headerBttn.addEventListener('mouseover', showFilters);
test.addEventListener('click', showFilters);

headerBttn.addEventListener('mouseleave', hideFilters);

async function createChck() {
  const element = document.querySelector('.filter__genres');
  const genresArray = await getAllGenres();
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
}

function showFilters(event) {
  if (isMobile()) {
    filter.style.top = `0px`;
    filter.style.left = `0px`;
  } else {
    filter.style.top = `${event.clientY}px`;
    filter.style.left = `${event.clientX}px`;
  }
  filter.classList.remove('is-hidden');
}

function hideFilters() {
  setTimeout(() => {
    filter.classList.add('is-hidden');
  }, 500);
}

export function getFilter() {
  const genres = document.querySelectorAll('[name="genres"]');
  const types = document.querySelectorAll('[name="media-type"]');
  const type = [];
  genres.forEach(el => {
    el.checked ? type.push(el.id) : null;
  });
  console.log(type);
}

function isMobile() {
  return false;
}
