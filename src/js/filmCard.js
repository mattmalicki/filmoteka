import { getAllGenres } from './getGenres';

const IMG_PATH = 'https://image.tmdb.org/t/p/original';

export async function createCard(filmsArray) {
  const genres = await getAllGenres();
  let cardArrayEl = [];
  filmsArray.forEach(movie => {
    const cardEl = document.createElement('li');
    cardEl.classList.add('films__grid-item');
    const cardLink = document.createElement('a');
    cardLink.dataset.movieId = movie.id;
    cardLink.dataset.mediaType = movie.media_type;
    cardLink.append(...addAll(movie, genres));
    cardEl.append(cardLink);
    cardArrayEl.push(cardEl);
  });
  return cardArrayEl;
}

//
function addAll(obj, genres) {
  const image = document.createElement('img');
  obj.poster_path ? (image.src = IMG_PATH + obj.poster_path) : null;
  image.classList.add('films__image');

  const title = document.createElement('p');
  title.classList.add('films__name');
  title.textContent = obj.title;

  const info = document.createElement('p');
  info.classList.add('films__info');
  info.textContent = `${addGenres(genres, obj.genre_ids)} | ${getReleaseDate(obj.release_date)}`;
  return [image, title, info];
}

function addGenres(genresApi, genresArray) {
  const movieGenres = [];
  genresApi.forEach(genre => {
    const index = genresArray.indexOf(genre.id);
    index >= 0 ? movieGenres.push(genre.name) : null;
  });
  return movieGenres;
}

function getReleaseDate(date) {
  return !date ? null : date.split('-')[0];
}
