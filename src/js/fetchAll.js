import { fetchFilms } from './fetchFilms';

export async function fetchAll(params = {}) {
  try {
    const requestParams = { ...params };
    const films = await fetchFilms({ requestParams });
    return films;
  } catch (err) {
    return err.toString();
  }
}
