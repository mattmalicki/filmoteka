import * as api from './fetchAll';
import { createCard } from './filmCard';
import { getFilter } from './filter';
import Notiflix from 'notiflix';
import './modalFilm';

const header = document.querySelector('.header-library');
const data = {
  apiPage: 1,
  apiAll: 0,
  page: 1,
  all: 0,
  keyname: '',
  filters: [],
};
const formEl = document.querySelector('#search-form');
const listEl = document.querySelector('.films__grid');
const inputEl = document.querySelector('[name="searchQuery"]');
if (!header) {
  formEl.addEventListener('submit', showFilms);
}
async function showFilms(event) {
  event.preventDefault();
  clearList();
  data.filters = getFilter();
  data.keyname = inputEl.value;
  if (data.filters.length > 0) {
    if (data.keyname === '') {
      const movies = await api.fetchMovieOnlyGenres(data.filters, data.page);
      const arrayEl = await createCard(movies.results);
      !arrayEl.length ? new Notiflix.Notify.failure('No movies found') : null;
      listEl.append(...arrayEl);
    } else {
      const movies = await api.fetchMovieOnlyGenres(data.filters, data.page);
      const arrayEl = await createCard(movies.results);
      !arrayEl.length ? new Notiflix.Notify.failure('No movies found') : null;
      listEl.append(...arrayEl);
    }
  } else {
    if (data.keyname === '') {
      const movies = await api.fetchTrendingMovies(data.page);
      console.log(movies);
      const arrayEl = await createCard(movies.results);
      !arrayEl.length ? new Notiflix.Notify.failure('No movies found') : null;
      listEl.append(...arrayEl);
    } else {
      const movies = await api.fetchMoviesWithName(data.keyname, data.page);
      const arrayEl = await createCard(movies.results);
      !arrayEl.length ? new Notiflix.Notify.failure('No movies found') : null;
      listEl.append(...arrayEl);
    }
  }
}

function clearList() {
  while (listEl.firstChild) {
    listEl.firstChild.remove();
  }
}

function fillData() {}
