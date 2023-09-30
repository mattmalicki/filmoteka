import { getAllGenres } from './getGenres';

const testBttn = document.querySelector('#test-filter');

async function createChck() {
  const element = document.querySelector('.filter__genres');
  const genresArray = await getAllGenres();
  genresArray.forEach(genre => {
    const genreEl = document.createElement('input');
    const label = document.createElement('label');
    genreEl.value = genre.id;
    genreEl.id = genre.id;
    genreEl.type = 'checkbox';
    genreEl.dataset.idName = genre.name;
    genreEl.name = 'genres';
    genreEl.classList.add('filter__genres-check');
    label.for = 'genres';
    label.classList.add('filter__genres-item');
    label.textContent = genre.name;
    label.prepend(genreEl);
    element.append(label);
  });
}

createChck();

testBttn.addEventListener('click', () => {
  const genres = document.querySelectorAll('[name="genres"]');
  const types = document.querySelectorAll('[name="media-type"]');
  const type = [];
  genres.forEach(el => {
    el.checked ? type.push(el.id) : null;
  });
  console.log(type);
});

function filterChecked() {}
