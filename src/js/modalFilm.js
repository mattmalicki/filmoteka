import { getAllGenres } from './getGenres';

const modalFilm = document.querySelector('[data-modal]');
const closeButton = document.querySelector('[data-modal-close]');

const IMG_PATH = 'https://image.tmdb.org/t/p/original';
const NO_POSTER = './images/no-movie.jpg';

const movie = {
  image: document.querySelector('#movie-poster'),
  title: document.querySelector('#movie-title'),
  avrgVote: document.querySelector('#movie-vote-avrg'),
  allVotes: document.querySelector('#movie-vote-all'),
  popularity: document.querySelector('#movie-popularity'),
  originalTitle: document.querySelector('#movie-original-title'),
  genres: document.querySelector('#movie-genres'),
};

async function fillData(obj) {
  try {
    obj.poster_path ? (movie.image.src = IMG_PATH + obj.posterPath) : (movie.image.src = NO_POSTER);
    obj.title ? (movie.title.textContent = obj.title) : (movie.title.textContent = obj.name);
    movie.avrgVote = obj.vote_average;
    movie.allVotes = obj.vote_count;
    movie.popularity = obj.popularity;
    obj.original_title
      ? (movie.originalTitle.textContent = obj.original_title)
      : (movie.title.textContent = obj.original_name);
    movie.genres.textContent = `${addGenres(genres, obj.genre_ids)}`;
  } catch (err) {
    console.log(`Error: ${err.toString()}`);
  }
}

function closeModal() {
  modalFilm.classList.toggle('is-hidden');
}

function openModal() {
  modalFilm.classList.toggle('is-hidden');
}

function addGenres(genresApi, genresArray) {
  const movieGenres = [];
  genresApi.forEach(genre => {
    const index = genresArray.indexOf(genre.id);
    index >= 0 ? movieGenres.push(genre.name) : null;
  });
  return movieGenres;
}

async function filmClicked(event) {
  // event.preventDefault();
  console.log('Current: ', event.currentTarget);
  console.log(`Target: ${event.eventPhase}`);
  if (event.currentTarget.nodeName === 'LI') {
    event.stopPropagation();
    console.log('Please work li');
  }
}

document.querySelector('.films__grid').addEventListener('click', filmClicked);
