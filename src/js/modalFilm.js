import { getAllGenres } from './getGenres';
import { fetchDetailsMovie, fetchDetailsTv } from './fetchAll';

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

async function fillData(id) {
  try {
    const obj = await fetchDetailsMovie(id);
    console.log(obj);
    const genres = await getAllGenres();
    obj.poster_path
      ? (movie.image.src = IMG_PATH + obj.poster_path)
      : (movie.image.src = NO_POSTER);
    movie.title.textContent = obj.title;
    movie.avrgVote.textContent = obj.vote_average;
    movie.allVotes.textContent = obj.vote_count;
    movie.popularity.textContent = obj.popularity;
    movie.description.textContent = obj.overview;
    movie.originalTitle.textContent = obj.original_title;
    movie.genres.textContent = showGenres(obj.genres);
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

function addGenres(genresApi, genresArray) {
  const movieGenres = [];
  genresApi.forEach(genre => {
    const index = genresArray.indexOf(genre.id);
    index >= 0 ? null : movieGenres.push(genre.name);
  });
  return movieGenres;
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
  fillData(liElement.dataset.movieId);
  openModal();
}

document.querySelector('.films__grid').addEventListener('click', filmClicked);
