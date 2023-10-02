// FT-07 Zaimplementować przesyłanie popularnych filmów na główną (pierwszą) stronę
import { loaderToggle } from './loader';

const grid = document.querySelector('.films__grid');
let title = '';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmEwYTgwNDZiYWRmMDlmOGM2MWVhOWMwNjFkMjc1ZCIsInN1YiI6IjY1MGM0MDg4NDRlYTU0MDBjNjMxZDVjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QCvrUYw290qbZ5ir3M1mVaFysI8g2yCPJXwVdcerhR4',
  }, // auth też może być źle, narazie testowo tak jak w renderFilms (i działa! :D)
};

async function fetchPopular() {
  return fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
  .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
  .catch(error => {
    console.error('Error fetching popular movies:', error);
    throw error;
  });
} // funkcja pobierająca popularne filmy


async function renderPopularMovies() {
  loaderToggle();
  try {
    const response = await fetchPopular();
    renderPopular(response);
  } catch (error) {
    console.error('Error rendering popular movies:', error);
  } finally {
    setTimeout(() => loaderToggle(), 500);
  }
} // funkcja renderująca


// -------------------------------- funkcje na podstawie renderFilms

function renderPopular(response) {
  const markup = [...response.results]
    .map(({id, poster_path, original_title, genre_ids, release_date}) => {
      return `<li id="${id}" class="films__grid-item">
    <a class="films__link">
    <img src="https://image.tmdb.org/t/p/w500${poster_path}"/>
    <h2>${shortTitle(original_title)}</h2>
    <p>${getGenres(genre_ids)} | ${getReleaseDate(release_date)}</p>
    </a>
    </li>`;
    })
    .join('');
  grid.innerHTML = markup;
}

const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

function getGenres(genreIds) {
  const newGenreArray = [];
  genres.map(genre => {
    for (const id of genreIds) {
      if (genre.id === id) {
        newGenreArray.push(genre.name);
      }
    }
  });

  if (newGenreArray.length >= 3) {
    const shortGenres = newGenreArray.slice(0, 3).concat('Other').join(', ');
    return shortGenres;
  } else {
    return 'Other';
  }
}

function getReleaseDate(date) {
  return date.split('-')[0];
}

let shortTitle = title => {
  if (title.length > 30) {
    return title.slice(0, 30).concat('...');
  }
  return title;
};

// -------------------------------- koniec funkcji na podstawie renderFilms


window.addEventListener("DOMContentLoaded", () => renderPopularMovies());
// event listener dla całej strony

