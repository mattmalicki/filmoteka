import { fetchFromApi } from './fetchFromApi';
import Notiflix from 'notiflix';

// SHOW/HIDE "FILMSTRIP" SPINNER ON/DONE RENDERING MOVIES //
export const showSpinner = () => {
  const spinnerEl = document.querySelector('.scroll-container');

  if (!spinnerEl) return;
  spinnerEl.classList.remove('is-hidden');
};

export const hideSpinner = () => {
  const spinnerEl = document.querySelector('.scroll-container');
  if (!spinnerEl) return;
  spinnerEl.classList.add('is-hidden');
};

// TO THE APP.JS MOVEMENT? //
const fetchGenres = async () => {
  try {
    const response = await fetchFromApi(`${URL}genre/movie/list?api_key=${API_KEY}`, options);
    const genreNames = await response.json();
    return genreNames.genres;
  } catch (error) {
    Notiflix.Notify.failure('Sorry, the server is not responding. Please try again later.');
  }
};

// CODE BELOW IN PROGRESS //
const scrollHandler = async () => {
  hideSpinner();
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 10) {
    window.removeEventListener('scroll', scrollHandler);
    currentPage++;

    const genres = await fetchGenres();
   // const popularMovies = await 'x';

    // (...)

    if (currentPage < totalPages) {
      window.addEventListener('scroll', scrollHandler);
    }
  }
};
