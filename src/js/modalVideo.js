const modalTrailer = document.querySelector('[data-modalvideo]');
const player = document.querySelector('#movie-trailer');

// playTrailer.addEventListener('click', showHideVideo);
modalTrailer.addEventListener('click', hideVideo);
export function showVideo(src) {
  modalTrailer.classList.toggle('is-hidden');
  addSrcVideo(src);
}

function clearSrcVideo() {
  player.src = '';
}
function addSrcVideo(src) {
  player.src = src;
}

export function hideVideo() {
  modalTrailer.classList.toggle('is-hidden');
  const modalFilm = document.querySelector('[data-modal]');
  modalFilm.className.includes('is-hidden') ? modalFilm.classList.remove('is-hidden') : null;
  clearSrcVideo();
}
