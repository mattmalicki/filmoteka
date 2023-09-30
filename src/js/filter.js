import { getAllGenres } from './getGenres';
import '../sass/partials/_filter.scss';

async function createChck() {
  const element = document.querySelector('.filter__genres');
  const genresArray = await getAllGenres();
  genresArray.forEach(genre => {
    const genreEl = document.createElement('input');
    const label = document.createElement('label');
    genreEl.value = genre.id;
    genreEl.id = genre.id;
    genreEl.type = 'checkbox';
    genreEl.name = 'genres';
    genreEl.classList.add('filter__genres-item');
    label.for = 'genres';
    label.classList.add('filter__genres-item');
    label.textContent = genre.name;
    element.append(genreEl, label);
  });
}

createChck();
