import { fetchFilms } from './js/fetchFilms';

export async function fetchAll() {
  try {
    const films = await fetchFilms({});
    console.log(films);
    return films;
  } catch (err) {
    return err.toString();
  }
}
