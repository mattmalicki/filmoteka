import { options } from './renderFilms.js';

const movie = document.querySelector('.films__grid');
movie.addEventListener('click', event => {
  event.preventDefault();
  fetchMovie(movieId(event))
    .then(response => showModal(response))
    .catch(error => console.log(error));
  console.log(movieId(event));
});

let movieId = event => {
  return event.target.parentElement.parentElement.id;
};

async function fetchMovie(movieId) {
  return fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function renderModal(response) {
  filmModal.classList.remove('is-hid');
  const markup = `<div class="movie-modal__content">
      <button class = "movie-modal__close-btn">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 8L22 22" stroke="black" stroke-width="2"/>
          <path d="M8 22L22 8" stroke="black" stroke-width="2"/>
      </svg>
      </button>
      <div class="movie-modal__poster">
          ${getPosterImg(response.poster_path, response.title)}
      </div>
      <div class="movie-modal__info-about">
          <h1 class="movie-modal__title">${response.title}</h1>
  <div class="movie-modal__info">
      <div class="movie-modal__info-name">
          <p class="info-name">Vote / Votes</p>
          <p class="info-name">Popularity</p>
          <p class="info-name">Original Title</p>
          <p class="info-name">Genre</p>
      </div>
      <div class="movie-modal__info-value">
          <p class="info-value">
              <span class="info-value__vote">${response.vote_average}</span>&ensp;/&ensp;

              <span class="info-value__votes">${response.vote_count}</span>
          </p>
          <p class="info-value">${response.popularity}</p>
          <p class="info-value">${response.original_title}</p>
          <p class="info-value">${getGen(response.genres)}</p>
      </div>
  </div>
  <h2 class="movie-modal__about">About </h2>
  <p class="movie-modal__about-text">${response.overview}</p>
  <ul class = "movie-modal__btn-list">
      <li class = "movie-modal__btn-list-item">
          <button class="movie-modal__btn add-watched" type = "button">add to Watched</button>
      </li>
      <li class = "movie-modal__btn-list-item">
          <button class="movie-modal__btn add-queue" type = "button">add to queue</button>
      </li>
  </ul>
      </div>
  </div>`;
  filmModal.innerHTML = markup;
}

const backdrop = document.querySelector('.movie-modal-mask');
const body = document.querySelector('body');

function showBackdrop() {
  backdrop.classList.remove('is-hid');
  body.style = `overflow-y: hidden`;
}

function closeBackdrop() {
  backdrop.classList.add('is-hid');
  backdrop.innerHTML = '';
  body.style = `overflow-y: overlay`;
}

const filmModal = document.querySelector('.movie-modal');
const filmModalMask = document.querySelector('.movie-modal-mask');
const modalBody = document.querySelector('body');

filmModalMask.addEventListener('click', closeModal);

function showModal(data) {
  renderModal(data);
  const closeBtn = document.querySelector('.movie-modal__close-btn');
  closeBtn.addEventListener('click', closeModal);
  filmModal.classList.remove('is-hid');

  showBackdrop();
  window.addEventListener('keydown', onEscKeyPress);
}

function closeModal(e) {
  e.preventDefault();
  filmModal.classList.add('is-hid');
  closeBackdrop();
  window.removeEventListener('keydown', onEscKeyPress);
}

function onEscKeyPress(e) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = e.code === ESC_KEY_CODE;

  if (isEscKey) {
    closeModal(e);
  }
}

function getPosterImg(path, title) {
  if (!path) return '';
  const posterPath = `https://www.themoviedb.org/t/p/w500${path}`;
  return `<img class = "movie-modal__img" src="${posterPath}" alt="${title}">`;
}

function getGen(genreIds) {
  const newArr = genreIds.map(genres => genres.name);

  if (newArr.length === 0) {
    return 'Other';
  } else if (newArr.length < 3) {
    return newArr;
  } else {
    const shortGen = newArr.slice(0, 2).concat('Other').join(', ');
    return shortGen;
  }
}
