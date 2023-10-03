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
  if (filters.filterMedia.length === 0) {
    new Notiflix.Notify.failure('Please choose media type in filter.');
    return;
  }
  const keyname = inputEl.value;
  if (filters.filterGenres.length > 0) {
    if (filters.filterMedia.length === 2) {
      const movies = await api.fetchAllOnlyGenres(filters.filterGenres, page);
      const arrayEl = await createCard(movies);
      !arrayEl.length ? new Notiflix.Notify.failure('No movies found') : null;
      listEl.append(...arrayEl);
    } else {
      const movies =
        filters.filterMedia.indexOf('movie') >= 0
          ? await api.fetchMovieOnlyGenres(filters.filterGenres, page)
          : await api.fetchTvOnlyGenres(filters.filterGenres, page);
      const arrayEl = await createCard(movies.results);
      !arrayEl.length ? new Notiflix.Notify.failure('No movies found') : null;
      listEl.append(...arrayEl);
    }
  } else if (keyname === '') {
    if (filters.filterMedia.length === 2) {
      const movies = await api.fetchTrendingAll(page);
      const arrayEl = await createCard(movies.results);
      !arrayEl.length ? new Notiflix.Notify.failure('No movies found') : null;
      listEl.append(...arrayEl);
    } else {
      const movies =
        filters.filterMedia.indexOf('movie') >= 0
          ? await api.fetchTrendingMovies(page)
          : await api.fetchTrendingTv(page);
      const arrayEl = await createCard(movies.results);
      !arrayEl.length ? new Notiflix.Notify.failure('No movies found') : null;
      listEl.append(...arrayEl);
    }
  } else {
    if (filters.filterMedia.length === 2) {
      const movies = await api.fetchAllWithName(keyname, page);
      const arrayEl = await createCard(movies);
      !arrayEl.length ? new Notiflix.Notify.failure('No movies found') : null;
      listEl.append(...arrayEl);
    } else {
      const movies =
        filters.filterMedia.indexOf('movie') >= 0
          ? await api.fetchMoviesWithName(keyname, page)
          : await api.fetchTvWithName(keyname, page);
      const arrayEl = await createCard(movies.results);
      !arrayEl.length ? new Notiflix.Notify.failure('No movies found') : null;
      listEl.append(...arrayEl);
    }
  }
}
