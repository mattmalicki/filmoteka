import { fetchDetailsMovie } from './fetchAll';
import {
  addFilmToLocalStorage,
  removeFilmFromLocalStorage,
  setMoviesInDB,
  isInclude,
} from './firebase/database';
import { showVideo, hideVideo } from './modalVideo';
import { loadStorage } from './localStorage';
import Notiflix, { Report } from 'notiflix';
import { getTrailer } from './getTrailer';

let film = null;

const KEYS = {
  WATCHED: 'watchedFilms',
  QUEUE: 'queueFilms',
};

const modalFilm = document.querySelector('[data-modal]');
const closeButton = document.querySelector('[data-modal-close]');
const playTrailer = document.querySelector('#modal-film-trailer');
const listEl = document.querySelector('.films__grid');

listEl.addEventListener('click', filmClicked);
closeButton.addEventListener('click', closeModal);
modalFilm.addEventListener('click', closeModalOutside);
playTrailer.addEventListener('click', showTrailer);

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
  trailer: document.querySelector('#movie-trailer'),
  trailerBttn: document.querySelector('#modal-film-trailer'),
};

async function fillData(obj) {
  obj.poster_path ? (movie.image.src = IMG_PATH + obj.poster_path) : (movie.image.src = NO_POSTER);
  movie.title.textContent = obj.title;
  movie.avrgVote.textContent = obj.vote_average;
  movie.allVotes.textContent = obj.vote_count;
  movie.popularity.textContent = obj.popularity;
  movie.description.textContent = obj.overview;
  movie.originalTitle.textContent = obj.original_title;
  movie.genres.textContent = showGenres(obj.genres);
  movie.trailerBttn.dataset.movieId = obj.id;
  return (film = obj);
}

async function showTrailer(event) {
  modalFilm.classList.toggle('is-hidden');
  const id = event.target.dataset.movieId;
  const src = await getTrailer(id);
  src ? showVideo(src) : noMovie();
  return;
}

async function fetchReturn(id) {
  try {
    const obj = await fetchDetailsMovie(id);
    const trailer = await fillData(obj);
    movie.trailer.src = trailer;
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

function closeModalOutside(event) {
  if (event.target.className.includes('backdrop')) {
    modalFilm.classList.toggle('is-hidden');
    clearData();
  }
}

function openModal() {
  modalFilm.classList.toggle('is-hidden');
}

function showGenres(genres) {
  const array = [];
  genres.forEach(genre => {
    array.push(genre.name);
  });
  return array.join(', ');
}

async function filmClicked(event) {
  try {
    if (event.target.nodeName === 'UL') {
      return;
    }
    const liElement = event.target.closest('li');
    if (event.target.nodeName === 'BUTTON') {
      const movieId = liElement.dataset.movieId ? liElement.dataset.movieId : liElement.id;
      const src = await getTrailer(movieId);
      src ? showVideo(src) : noMovie();
      return;
    }
    liElement.dataset.movieId ? fetchReturn(liElement.dataset.movieId) : fetchReturn(liElement.id);
    checkWatchedORQueue(liElement.dataset.movieId);
    setTimeout(() => {
      openModal();
    }, 100);
  } catch (err) {
    console.log(`Error: ${err.toString()}`);
  }
}

function noMovie() {
  new Notiflix.Notify.failure('No trailer found');
  // hideVideo();
  return;
}

const watchedBtn = document.querySelector('#watchedFilmBtn');
const queueBtn = document.querySelector('#queueFilmBtn');

watchedBtn.addEventListener('click', btnHandler);
queueBtn.addEventListener('click', btnHandler);

function checkWatchedORQueue(movieID) {
  watchedBtn.setAttribute('data-id', movieID);
  watchedBtn.setAttribute('data-action', isInclude(KEYS.WATCHED, movieID) ? 'remove' : 'add');

  if (watchedBtn.matches('[data-action="remove"]')) {
    watchedBtn.classList.add('modal-film__btn--active');
  } else {
    watchedBtn.classList.remove('modal-film__btn--active');
  }

  watchedBtn.textContent = `${
    isInclude(KEYS.WATCHED, movieID) ? 'Remove from watched' : 'Add to watched'
  }`;

  queueBtn.setAttribute('data-id', movieID);
  queueBtn.setAttribute('data-action', isInclude(KEYS.QUEUE, movieID) ? 'remove' : 'add');

  if (queueBtn.matches('[data-action="remove"]')) {
    queueBtn.classList.add('modal-film__btn--active');
  } else {
    queueBtn.classList.remove('modal-film__btn--active');
  }

  queueBtn.textContent = `${isInclude(KEYS.QUEUE, movieID) ? 'Remove from queue' : 'Add to queue'}`;
}

function btnHandler(e) {
  const user = loadStorage('user');

  const button = e.target;

  const storage = button.dataset.list === 'watched' ? 'watched' : 'queue';

  const storageKey = button.dataset.list === 'watched' ? KEYS.WATCHED : KEYS.QUEUE;

  const currentAction = button.dataset.action;

  switch (currentAction) {
    case 'remove': {
      removeFilmFromLocalStorage(storageKey, film);
      button.dataset.action = 'add';
      button.blur();
      button.textContent = `Add to ${storage}`;
      button.classList.remove('modal-film__btn--active');
      if (user) {
        setMoviesInDB(user);
      }
      location.reload();
      break;
    }
    case 'add': {
      addFilmToLocalStorage(storageKey, film);
      //Report.success('', 'Film added to storage');
      button.dataset.action = 'remove';
      button.blur();
      button.textContent = `Remove from ${storage}`;
      button.classList.add('modal-film__btn--active');
      if (user) {
        setMoviesInDB(user);
      }
      break;
    }

    default:
      return;
  }
}
