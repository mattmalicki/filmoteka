document.addEventListener('DOMContentLoaded', function () {
  const apiKey = 'API_KEY';

  function getMovieInfo(movieId) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
      .then(function (response) {
        if (response.status !== 200) {
          throw new Error('Błąd podczas pobierania danych z API TMDB.');
        }
        return response.json();
      })
      .then(function (data) {
        const posterPath = data.poster_path;
        const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
        document.querySelector('#movie-poster').src = posterUrl;

        document.querySelector('#movie-title').textContent = data.title;
        document.querySelector('#movie-vote').textContent = data.vote_average;
        document.querySelector('#movie-votes').textContent = data.vote_count;
        document.querySelector('#movie-popularity').textContent = data.popularity;
        document.querySelector('#movie-original-title').textContent = data.original_title;
        document.querySelector('#movie-genres').textContent = data.genres;
        document.querySelector('#movie-description').textContent = data.overview;
      })
      .catch(function (error) {
        console.error(error.message);
      });
  }

  const modal = document.querySelector('.backdrop');

  const filmLinks = document.querySelectorAll('.films__link');

  filmLinks.forEach(function (filmLink) {
    filmLink.addEventListener('click', function () {
      modal.classList.remove('is-hidden');
    });
  });

  function closeModal() {
    modal.classList.add('is-hidden');
  }

  document.querySelector('[data-modal-close]').addEventListener('click', function () {
    closeModal();
  });

  function handleEscapeKey(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }

  document.addEventListener('keydown', handleEscapeKey);
});

const modalFilm = document.querySelector('[data-modal]');
const closeButton = document.querySelector('[data-modal-close]');

function closeModal() {
  modalFilm.classList.toggle('is-hidden');
}
