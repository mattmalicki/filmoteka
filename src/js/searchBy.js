import { fetchFromApi } from './fetchFromApi';

export async function searchMoviesBy(query, page, ...rest) {
  try {
    const request = {
      requestPath: 'search/movie',
      requestParams: {
        query,
        page,
        ...rest,
      },
    };
    const movies = await fetchFromApi(request);
    return movies;
  } catch (err) {
    return err;
  }
}

export async function searchSeriesBy(query, page, ...rest) {
  try {
    const request = {
      requestPath: 'search/tv',
      requestParams: {
        query,
        page,
        ...rest,
      },
    };
    const series = await fetchFromApi(request);
    return series;
  } catch (err) {
    return err;
  }
}

export async function searchAllBy(query, page, ...rest) {
  try {
    const requestMovie = {
      requestPath: 'search/movie',
      requestParams: {
        query,
        page,
      },
    };
    const requestTv = {
      requestPath: 'search/tv',
      requestParams: {
        query,
        page,
        ...rest,
      },
    };
    const series = await fetchFromApi(requestTv);
    const movies = await fetchFromApi(requestMovie);
    const array = mergeData(movies.results, series.results);
    return array;
  } catch (err) {
    return err;
  }
}

function mergeData(movies, series) {
  const array = movies.concat(series);
  return array.sort((firsObj, secObj) => secObj.popularity - firsObj.popularity);
}
