import { getAllGenres } from './getGenres';

createChck();
const filter = document.querySelector('.filter');

const filterOpen = document.querySelector('#filter-open');
const mobileClose = document.querySelector('.filter__button');

filterOpen.addEventListener('mouseover', showFilters);
mobileClose.addEventListener('click', hideFilters);

filterOpen.addEventListener('mouseleave', hideFilters);

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
    filter.style.top = `230px`;
    filter.style.left = `0px`;
  } else {
    filter.style.top = `${event.clientY}px`;
    filter.style.left = `${event.clientX}px`;
  }
  filter.classList.remove('is-hidden');
}

function hideFilters() {
  isMobile()
    ? filter.classList.add('is-hidden')
    : setTimeout(() => {
        filter.classList.add('is-hidden');
      }, 500);
}

export function getFilter() {
  const genres = document.querySelectorAll('[name="genres"]');
  const media = document.querySelectorAll('[name="media-type"]');
  const filterGenres = [];
  genres.forEach(el => {
    el.checked ? filterGenres.push(el.id) : null;
  });
  const filterMedia = [];
  media.forEach(el => {
    el.checked ? filterMedia.push(el.id) : null;
  });
  console.log({ filterMedia, filterGenres });
  return { filterMedia, filterGenres };
}

function isMobile() {
  return window.matchMedia('(max-width: 767.99px)').matches;
}
