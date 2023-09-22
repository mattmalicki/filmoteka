import { fetchFilms } from './fetchFilms';

export async function getTVGenres() {
  try {
    const response = await fetchFilms({
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
    const response = await fetchFilms({
      requestPath: 'genre/movie/list',
    });
    const movieGenres = response.genres;
    console.log(movieGenres);
    return movieGenres;
  } catch (err) {
    return err;
  }
}