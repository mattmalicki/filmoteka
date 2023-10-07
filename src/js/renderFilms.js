import * as api from './fetchAll';
import { createCard } from './filmCard';
import { getFilter } from './filter';
import Notiflix from 'notiflix';
import './modalFilm';
import { loaderToggle } from './loader';
import { filmClicked } from './modalFilm';
import { showLoader, hideLoader } from './pagination';

const headerLibrary = document.querySelector('.header-library');
const data = {
  page: 1,
  allPages: 0,
  keyname: '',
  filters: [],
};
const formEl = document.querySelector('#search-form');
const formSticky = document.querySelector('#sticky-search-form');
const loadMore = document.querySelector('.pagination__button');
const listEl = document.querySelector('.films__grid');
const inputEl = document.querySelector('#inputHeader');
const inputSticky = document.querySelector('#inputSticky');

if (!headerLibrary) {
  formEl.addEventListener('submit', onSubmit);
  formSticky.addEventListener('submit', onSubmit);
  loadMore.addEventListener('click', showFilms);
  showFilms();
}

function onSubmit(event) {
  event.preventDefault();
  const input = event.target[0];
  clearList();
  data.keyname = input.value;
  data.page = 1;
  data.filters = getFilter();
  checkInput(input);
  showFilms();
}

function checkInput(input) {
  input.id === 'inputHeader' ? (inputSticky.value = input.value) : (inputEl.value = input.value);
}

function showFilms() {
  loaderToggle();
  listEl.addEventListener('click', filmClicked);
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

function clearList() {
  while (listEl.firstChild) {
    listEl.firstChild.remove();
  }
}

async function genreNoName() {
  try {
    const movies = await api.fetchMovieOnlyGenres(data.filters, data.page);
    const arrayEl = await createCard(movies.results);
    data.allPages = movies.total_pages;
    data.page++;
    !arrayEl.length ? noMovie() : showLoader();
    listEl.append(...arrayEl);
  } catch (err) {
    console.log(`Error: ${err.toString()}`);
  } finally {
    loaderToggle();
  }
}
listEl.addEventListener('click', filmClicked);

function noMovie() {
  new Notiflix.Notify.failure('No movies found');
  listEl.removeEventListener('click', filmClicked);
  hideLoader();
}
function genreWithName() {
  new Notiflix.Notify.failure("Can't search movies by name and genres.");
  listEl.removeEventListener('click', filmClicked);
  hideLoader();
}

async function nameNoGenre() {
  try {
    const movies = await api.fetchMoviesWithName(data.keyname, data.page);
    const arrayEl = await createCard(sortArray(movies.results));
    data.allPages = movies.total_pages;
    data.page++;
    !arrayEl.length ? noMovie() : showLoader();
    listEl.append(...arrayEl);
  } catch (err) {
    console.log(`Error: ${err.toString()}`);
  } finally {
    loaderToggle();
  }
}

async function noNameNoGenre() {
  try {
    const movies = await api.fetchTrendingMovies(data.page);
    const arrayEl = await createCard(movies.results);
    data.allPages = movies.total_pages;
    data.page++;
    !arrayEl.length ? noMovie() : showLoader();
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
