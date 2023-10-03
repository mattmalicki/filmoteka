import * as api from './fetchAll';
import { createCard } from './filmCard';
import { getFilter } from './filter';
import Notiflix from 'notiflix';
import './modalFilm';

const header = document.querySelector('.header-library');
const formEl = document.querySelector('#search-form');
const listEl = document.querySelector('.films__grid');
const inputEl = document.querySelector('[name="searchQuery"]');
let page = 1;
if (!header) {
  formEl.addEventListener('submit', showFilms);
}
async function showFilms(event) {
  event.preventDefault();
  while (listEl.firstChild) {
    listEl.firstChild.remove();
  }
  const filters = getFilter();
  const keyname = inputEl.value;
  if (filters.length > 0) {
    if (keyname === '') {
      const movies = await api.fetchMovieOnlyGenres(filters, page);
      const arrayEl = await createCard(movies.results);
      !arrayEl.length ? new Notiflix.Notify.failure('No movies found') : null;
      listEl.append(...arrayEl);
    } else {
      const movies = await api.fetchMovieOnlyGenres(filters, page);
      const arrayEl = await createCard(movies.results);
      !arrayEl.length ? new Notiflix.Notify.failure('No movies found') : null;
      listEl.append(...arrayEl);
    }
  } else {
    const movies = await api.fetchTrendingMovies(page);
    const arrayEl = await createCard(movies.results);
    !arrayEl.length ? new Notiflix.Notify.failure('No movies found') : null;
    listEl.append(...arrayEl);
  }
}
