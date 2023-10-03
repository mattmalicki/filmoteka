import * as api from './fetchAll';
import { createCard } from './filmCard';
import { getFilter } from './filter';
import Notiflix from 'notiflix';
import './modalFilm';
import pagination from './pagination';
import { loaderToggle } from './loader';


const header = document.querySelector('.header-library');
const data = {
  page: 1,
  allPages: 0,
  keyname: '',
  filters: [],
};
const formEl = document.querySelector('#search-form');
const listEl = document.querySelector('.films__grid');
const inputEl = document.querySelector('[name="searchQuery"]');
if (!header) {
  formEl.addEventListener('submit', onSubmit);
}

function onSubmit(event) {
  event.preventDefault();
  data.page = 1;
  data.filters = getFilter();
  data.keyname = inputEl.value;
  showFilms();
}

function showFilms() {
  clearList();
  if (data.filters.length > 0) {
    if (data.keyname === '') {
      genreNoName();
    } else {
      genreWithName();
    }
  } else {
    if (data.keyname === '') {
      noNameNoGenre();
    } else {
      nameNoGenre();
    }
  }
}

showFilms();

function clearList() {
  while (listEl.firstChild) {
    listEl.firstChild.remove();
  }
}

async function genreNoName() {
  try {
    loaderToggle();
    const movies = await api.fetchMovieOnlyGenres(data.filters, data.page);
    const arrayEl = await createCard(movies.results);
    data.allPages = movies.total_pages;
    data.page++;
    !arrayEl.length ? new Notiflix.Notify.failure('No movies found') : null;
    listEl.append(...arrayEl);
  } catch (err) {
    console.log(`Error: ${err.toString()}`);
  } finally {
    loaderToggle();
  }
}

function genreWithName() {
  new Notiflix.Notify.failure("Can't search movies by name and genres.");
}

async function nameNoGenre() {
  try {
    loaderToggle();
    const movies = await api.fetchMoviesWithName(data.keyname, data.page);
    const arrayEl = await createCard(sortArray(movies.results));
    data.allPages = movies.total_pages;
    data.page++;
    !arrayEl.length ? new Notiflix.Notify.failure('No movies found') : null;
    listEl.append(...arrayEl);
  } catch (err) {
    console.log(`Error: ${err.toString()}`);
  } finally {
    loaderToggle();
  }
}

async function noNameNoGenre() {
  try {
    loaderToggle();
    const movies = await api.fetchTrendingMovies(data.page);
    const arrayEl = await createCard(movies.results);
    data.allPages = movies.total_pages;
    data.page++;
    !arrayEl.length ? new Notiflix.Notify.failure('No movies found') : null;
    listEl.append(...arrayEl);
  } catch (err) {
    console.log(`Error: ${err.toString()}`);
  } finally {
    loaderToggle();
  }
}

function sortArray(array) {
  return array.sort((firsObj, secObj) => secObj.popularity - firsObj.popularity);
}
