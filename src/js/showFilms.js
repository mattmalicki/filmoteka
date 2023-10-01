import { fetchAll } from './fetchAll';
import { createCard } from './filmCard';
import { getFilter } from './filter';
import Notiflix from 'notiflix';

const formEl = document.querySelector('#search-form');
const listEl = document.querySelector('.films__grid');
const inputEl = document.querySelector('[name="searchQuery"]');
let page = 1;

formEl.addEventListener('submit', showFilms);

async function showFilms(event) {
  event.preventDefault();
  const filters = getFilter();
  const keyname = inputEl.value;
  if (keyname === '') {
    if (filters.filterMedia.length === 2) {
      const movies = await fetchAll(page);
      listEl.append(createCard(movies));
    }
  }
}
