import './sass/main.scss';
import { fetchAll } from './js/fetchAll';
import { getTVGenres, getMoviesGenres } from './js/getGenres';
fetchAll();
const genres = getMoviesGenres();
console.log(genres);
