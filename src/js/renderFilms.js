//-------- variables -------------
const input = document.querySelector('[name=searchQuery]');
const btn = document.querySelector('.header__search-button');
const grid = document.querySelector('.films__grid');

const API_KEY = '2b6c5a30539b25d64c2f30ee757140aa';
let title = '';

export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmEwYTgwNDZiYWRmMDlmOGM2MWVhOWMwNjFkMjc1ZCIsInN1YiI6IjY1MGM0MDg4NDRlYTU0MDBjNjMxZDVjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QCvrUYw290qbZ5ir3M1mVaFysI8g2yCPJXwVdcerhR4',
  },
};
//-------------------MOVIES FETCH----------------
export async function fetcher() {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`,
    options,
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

//-------------------- EVENT LISTENERS -----------------

input.addEventListener('input', event => {
  title = event.currentTarget.value;
});

btn.addEventListener('click', event => {
  event.preventDefault();
  fetcher()
    .then(response => renderFilms(response))
    .catch(error => console.log(error));
});

//-------------- RENDER MOVIES GRID --------------
export async function renderFilms(response) {
  console.log(response);
  const markup = [...response.results]
    .map(({ id, poster_path, original_title, genre_ids, release_date }) => {
      return `<li id="${id}" class="films__grid-item">
        <a class="films__link">
          <img src="https://image.tmdb.org/t/p/w500${poster_path}"/>
          <h2>${original_title}</h2>
          <p>${getGenres(genre_ids)} | ${getReleaseDate(release_date)}</p>
        </a>
      </li>`;
    })
    .join('');
  grid.innerHTML = markup;
}

//------------- GET GENRES ----------------
export const genres = [
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

export function getGenres(genreIds) {
  const newGenreArray = [];
  genres.map(genre => {
    for (const id of genreIds) {
      if (genre.id === id) {
        newGenreArray.push(genre.name);
      }
    }
  });
  if (newGenreArray.length === 0) {
    return 'Other';
  } else if (newGenreArray.length < 3) {
    return newGenreArray;
  } else {
    const shortGenres = newGenreArray.slice(0, 2).concat('Other').join(', ');
    return shortGenres;
  }
}
//----------- GET MOVIE RELEASE YEAR ---------------
function getReleaseDate(date) {
  return date.split('-')[0];
}
