import { fetchDetailsMovie } from './fetchAll';
import {
  addFilmToLocalStorage,
  removeFilmFromLocalStorage,
  setMoviesInDB,
} from './firebase/database';

import { loadStorage } from './localStorage';
import { Report } from 'notiflix';

let film = null;

const modalFilm = document.querySelector('[data-modal]');
const closeButton = document.querySelector('[data-modal-close]');

closeButton.addEventListener('click', closeModal);

const IMG_PATH = 'https://image.tmdb.org/t/p/original';
const NO_POSTER = './images/no-movie.jpg';

const movie = {
  image: document.querySelector('#movie-poster'),
  title: document.querySelector('#movie-title'),
  avrgVote: document.querySelector('#movie-vote-avrg'),
  allVotes: document.querySelector('#movie-vote-all'),
  popularity: document.querySelector('#movie-popularity'),
  originalTitle: document.querySelector('#movie-original-title'),
  description: document.querySelector('#movie-description'),
  genres: document.querySelector('#movie-genres'),
};

function fillData(obj) {
  obj.poster_path ? (movie.image.src = IMG_PATH + obj.poster_path) : (movie.image.src = NO_POSTER);
  movie.title.textContent = obj.title;
  movie.avrgVote.textContent = obj.vote_average;
  movie.allVotes.textContent = obj.vote_count;
  movie.popularity.textContent = obj.popularity;
  movie.description.textContent = obj.overview;
  movie.originalTitle.textContent = obj.original_title;
  movie.genres.textContent = showGenres(obj.genres);
  return (film = obj);
}

async function fetchReturn(id) {
  try {
    const obj = await fetchDetailsMovie(id);
    fillData(obj);
  } catch (err) {
    console.log(`Error: ${err.toString()}`);
  }
}

function clearData() {
  movie.image.src = NO_POSTER;
  movie.title.textContent = '';
  movie.avrgVote.textContent = '';
  movie.allVotes.textContent = '';
  movie.popularity.textContent = '';
  movie.description.textContent = '';
  movie.originalTitle.textContent = '';
  movie.genres.textContent = '';
}

function closeModal() {
  modalFilm.classList.toggle('is-hidden');
  clearData();
}

function openModal() {
  modalFilm.classList.toggle('is-hidden');
}

function showGenres(genres) {
  const array = [];
  genres.forEach(genre => {
    array.push(genre.name);
  });
  return array;
}

async function filmClicked(event) {
  if (event.target.nodeName === 'UL') {
    return;
  }
  const liElement = event.target.closest('li');
  fetchReturn(liElement.dataset.movieId);
  openModal();
}

document.querySelector('.films__grid').addEventListener('click', filmClicked);

const watchedBtn = document.querySelector('#watchedFilmBtn');
const queueBtn = document.querySelector('#queueFilmBtn');

watchedBtn.addEventListener('click', btnHandler);
queueBtn.addEventListener('click', btnHandler);

function btnHandler(e) {
  const user = loadStorage('user');

  const button = e.target;

  const storage = button.dataset.list === 'watched' ? 'watched' : 'queue';

  const KEYS = {
    WATCHED: 'watchedFilms',
    QUEUE: 'queueFilms',
  };

  const storageKey = button.dataset.list === 'watched' ? KEYS.WATCHED : KEYS.QUEUE;

  const currentAction = button.dataset.action;

  switch (currentAction) {
    case 'remove': {
      removeFilmFromLocalStorage(storageKey, film);
      button.dataset.action = 'add';
      button.blur();
      button.textContent = `Add to ${storage}`;
      if (user) {
        setMoviesInDB(user);
      }
      break;
    }
    case 'add': {
      addFilmToLocalStorage(storageKey, film);
      //Report.success('', 'Film added to storage');
      button.dataset.action = 'remove';
      button.blur();
      button.textContent = `Remove from ${storage}`;
      if (user) {
        setMoviesInDB(user);
      }
      break;
    }

    default:
      return;
  }
}
