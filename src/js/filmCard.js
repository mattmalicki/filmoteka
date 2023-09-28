import { fetchFromApi } from './fetchFromApi';
import { getTVGenres, getMoviesGenres } from './getGenres';

const array = [
  'id',
  'name', //
  'overview', //
  'poster_path', //
  'media_type', //
  'genre_ids', //
  'popularity',
  'first_air_date', //
];
const moviesList = document.querySelector('#movies__list');

export function createCard(array) {
  let cardArrayEl = [];
  array.forEach(array => {
    const cardEl = document.createElement('li');
    cardEl.classList.add('movie__item');
    cardEl.dataset.movieId = 'id'; //`${id}`
    cardEl.dataset.mediaType = 'media__type'; //`${media__type}`
    //cardEl.dataset.genreIds = 'genre_ids'';
    //`${genre_ids}` //getMoviesGenres

    cardArrayEl.push(cardEl);
    cardEl.append(
      addImage(imgURL),
      addMovieTitle(originalTitle),
      addMovieInfo(genreIds, year, voteAverage),
    );
    return cardEl;
  });
  moviesList.append(...cardArrayEl);
}
createCard(array);
////////
function addImage(imgURL) {
  const imgCont = document.createElement('div');
  imgCont.classList.add('movie__img--container');

  const img = document.createElement('img');
  img.src = imgURL;
  img.alt = 'Movie poster';
  img.classList.add('movie__img');

  imgCont.append(img);

  return imgCont;
}
//////////
function addMovieTitle(originalTitle) {
  const divInfo = document.createElement('div');
  divInfo.classList.add('movie__info');

  const movieTitle = document.createElement('p');
  movieTitle.textContent = originalTitle; // `${original_title}`;
  movieTitle.classList.add('movie__title');

  divInfo.append(movieTitle);

  return divInfo;
}
//////////
function addMovieInfo(genreIds, year, voteAverage) {
  const movieRace = document.createElement('div');
  movieRace.classList.add('movie__race');

  const movieGenreIds = document.createElement('p');
  movieGenreIds.textContent = genreIds; //`${genre_ids}`
  movieGenreIds.classList.add('movie__genre');

  const movieYear = document.createElement('p');
  movieYear.textContent = year;
  movieYear.classList.add('movie__year');

  const movieRating = document.createElement('p');
  movieRating.textContent = voteAverage; //`${vote_average}`
  movieRating.classList.add('movie__rating');

  movieRace.append(genreIds, year, voteAverage);

  return movieRace;
}

/*
    const movieBackText = document.createElement('div');
    movieBackText.classList.add('movies__back');

    const movieOverviev = document.createElement('span');
    movieOverviev.textContent = 'overview'; // `${overview}`
    movieOverviev.classList.add('description__films');
*/

//Dodatkowo. API zwraca id gatunkow, a nie ich nazwy.
//Stworzylem funkcje do pobierania gatunkow.jest w pliku getGenres
/* "id": 72710,
      "name": "The Continental: From the World of John Wick",
      "overview": "Winston Scott is roped into a world of assassins and must make things right after his brother's attack on the Continental hotel.",
      "poster_path": "/v1YEOdGptCyNxnc4mJSYNd4cE8E.jpg",
      "media_type": "tv",
      "genre_ids": [
        80,
        10759
      ],
      "first_air_date": "2023-09-22",
    },*/
