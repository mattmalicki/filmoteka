import { fetchFromApi } from './fetchFromApi';

export async function fetchAll(params = {}) {
  try {
    const requestParams = { ...params };
    const films = await fetchFromApi({ requestParams });
    return films;
  } catch (err) {
    return err.toString();
  }
}
