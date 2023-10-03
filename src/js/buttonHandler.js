// FT-14 "Naciśnięcie przycisku "Watched" powoduje wyświetlenie oglądanych przez użytkownika filmów"
// FT-15 "Naciśnięcie przycisku "Queue" powoduje wyświetlenie filmów dodanych do kolejki użytkownika"

const watchedButton = document.querySelector('#libraryWatchedButton');
const queuedButton = document.querySelector('#libraryQueuedButton');
const grid = document.querySelector('.films__grid');


// =========================== Funkcje do renderowania kart

function renderLocalStorage(params) {

  if (params === null) {
    grid.innerText = 'So empty! 🍿'
    grid.style.fontSize = "x-large";
  } else {
    const markup = params
      .map(({ id, poster_path, original_title, release_date }) => {
        return `
      <li id="${id}" class="films__grid-item">
        <a class="films__link">
          <img src="https://image.tmdb.org/t/p/w500${poster_path}" class="films__image-img"/>
          <h2 class="films__info-title">${shortTitle(original_title)}</h2>
          <p class="films__info-rest">${getReleaseDate(release_date)}</p>
        </a>
      </li>`;
      })
      .join('');

    grid.innerHTML = markup;
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


// =========================== Funkcje do obsługi guzików i zmiana stanu

function handleWatchedButton() {
  grid.innerHTML = '';

  const watchedFilms = JSON.parse(localStorage.getItem('watchedFilms'));
  // console.log('Test przycisku Watched, dane pobrane! ' + watchedFilms);

  watchedButton.classList.add("my-library-header__button--current");
  queuedButton.classList.remove("my-library-header__button--current");

  renderLocalStorage(watchedFilms);
}

if (document.querySelector('#libraryWatchedButton') === null) {
  return;
} else {
  watchedButton.addEventListener('click', handleWatchedButton);
}
//sam guzik watched


function handleQueuedButton() {
  grid.innerHTML = '';

  const queuedFilms = JSON.parse(localStorage.getItem('queueFilms'));
  // console.log('Test przycisku Queued, dane pobrane! ' + queuedFilms);

  queuedButton.classList.add("my-library-header__button--current");
  watchedButton.classList.remove("my-library-header__button--current");

  renderLocalStorage(queuedFilms);
}


if (document.querySelector('#libraryQueuedButton') === null) {
  return;
} else {
  queuedButton.addEventListener('click', handleQueuedButton);
}
//sam guzik queued


// =========================== Funkcje do podstawowego wyświetlania

document.addEventListener('DOMContentLoaded', renderOnLoad());

function renderOnLoad() {
  const watchedLocalStorage = JSON.parse(localStorage.getItem('watchedFilms'));

  renderLocalStorage(watchedLocalStorage);
}