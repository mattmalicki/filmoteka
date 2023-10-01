$(document).ready(function () {
  const apiKey = 'API_KEY';

  function getMovieInfo(movieId) {
    $.ajax({
      url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`,
      method: 'GET',
      success: function (data) {
        const posterPath = data.poster_path;
        const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
        $('#movie-poster').attr('src', posterUrl);

        $('#movie-title').text(data.title);
        $('#movie-vote').text(data.vote_average);
        $('#movie-votes').text(data.vote_count);
        $('#movie-popularity').text(data.popularity);
        $('#movie-original-title').text(data.original_title);
        $('#movie-genres').text(data.genres);
        $('#movie-description').text(data.overview);
      },
      error: function () {
        console.error('Błąd podczas pobierania danych z API TMDB.');
      },
    });
  }

  const modal = document.querySelector('.backdrop');

  const filmLinks = document.querySelectorAll('.films__link');

  filmLinks.forEach(function (filmLink) {
    filmLink.addEventListener('click', function () {
      modal.classList.remove('is-hidden');
    });
  });

  const closeModalButton = document.querySelector('[data-modal-close]');

  closeModalButton.addEventListener('click', function () {
    modal.classList.add('is-hidden');
  });
});
