import { getAllGenres } from './getGenres';

const IMG_PATH = 'https://image.tmdb.org/t/p/original';
const NO_POSTER = './images/no-movie.jpg';

export async function createCard(filmsArray) {
  const genres = await getAllGenres();
  let cardArrayEl = [];
  filmsArray.forEach(movie => {
    const cardEl = document.createElement('li');
    cardEl.classList.add('films__grid-item');
    cardEl.dataset.movieId = movie.id;
    cardEl.dataset.mediaType = movie.media_type;
    cardEl.append(addImage(movie.poster_path), addInfo(movie, genres));
    cardArrayEl.push(cardEl);
  });
  return cardArrayEl;
}

function addImage(imgUrl) {
  const imageCont = document.createElement('div');
  imageCont.classList.add('films__image');
  const img = document.createElement('img');
  img.classList.add('films__image-img');
  imgUrl ? (img.src = IMG_PATH + imgUrl) : null;
  imageCont.append(img);
  return imageCont;
}

function addInfo(obj, genres) {
  const infoCont = document.createElement('div');
  infoCont.classList.add('films__info');

  const title = document.createElement('p');
  title.classList.add('films__info-title');
  console.log(obj);
  !obj.title ? (title.textContent = obj.name) : (title.textContent = obj.title);

  const restInfo = document.createElement('span');
  restInfo.classList.add('films__info-rest');
  restInfo.textContent = `${addGenres(genres, obj.genre_ids)} | ${getReleaseDate(
    obj.release_date,
  )}`;
  infoCont.append(title, restInfo);
  return infoCont;
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
  return !date ? 'Unknown release date' : date.split('-')[0];
}
