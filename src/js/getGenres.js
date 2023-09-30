import { fetchFromApi } from './fetchFromApi';

export async function getTVGenres() {
  try {
    const response = await fetchFromApi({
      requestPath: 'genre/tv/list',
    });
    const tvGenres = response.genres;
    return tvGenres;
  } catch (err) {
    return err;
  }
}

export async function getMoviesGenres() {
  try {
    const response = await fetchFromApi({
      requestPath: 'genre/movie/list',
    });
    const movieGenres = response.genres;
    return movieGenres;
  } catch (err) {
    return err;
  }
}

export async function getAllGenres() {
  try {
    const movieG = await fetchFromApi({
      requestPath: 'genre/movie/list',
    });
    const tvG = await fetchFromApi({
      requestPath: 'genre/tv/list',
    });
    const all = movieG.genres.concat(tvG.genres);
    return all.filter((item, index) => all.indexOf(item) === index);
  } catch (err) {
    return err;
  }
}
