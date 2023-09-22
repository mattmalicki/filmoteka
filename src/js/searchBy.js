import { fetchFromApi } from './fetchFromApi';

export async function searchMoviesBy(query, page) {
  try {
    const request = {
      requestPath: 'search/movie',
      requestParams: {
        query,
        page,
      },
    };
    const movies = await fetchFromApi(request);
    return movies;
  } catch (err) {
    return err;
  }
}

export async function searchSeriesBy(query, page) {
  try {
    const request = {
      requestPath: 'search/tv',
      requestParams: {
        query,
        page,
      },
    };
    const series = await fetchFromApi(request);
    return series;
  } catch (err) {
    return err;
  }
}
