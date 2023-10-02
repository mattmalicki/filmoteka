import { fetchFromApi } from './fetchFromApi';

export async function fetchTrendingAll(page) {
  try {
    const requestParams = { page };
    const films = await fetchFromApi({ requestParams });
    return films;
  } catch (err) {
    return err.toString();
  }
}

export async function fetchTrendingMovies(page) {
  try {
    const requestParams = { page };
    const films = await fetchFromApi({ requestPath: 'trending/movie/day', requestParams });
    return films;
  } catch (err) {
    return err.toString();
  }
}

export async function fetchTrendingTv(page) {
  try {
    const requestParams = { page };
    const films = await fetchFromApi({ requestPath: 'trending/tv/day', requestParams });
    return films;
  } catch (err) {
    return err.toString();
  }
}

export async function fetchMoviesWithName(query, page, ...rest) {
  try {
    const requestPath = 'search/movie';
    const requestParams = { query, page, ...rest };
    const films = await fetchFromApi({ requestPath, requestParams });
    return films;
  } catch (err) {
    return err.toString();
  }
}

export async function fetchTvWithName(query, page, ...rest) {
  try {
    const requestPath = 'search/tv';
    const requestParams = { query, page, ...rest };
    const films = await fetchFromApi({ requestPath, requestParams });
    return films;
  } catch (err) {
    return err.toString();
  }
}

export async function fetchAllWithName(query, page, ...rest) {
  try {
    const movies = await fetchMoviesWithName(query, page, ...rest);
    const series = await fetchTvWithName(query, page, ...rest);
    const all = mergeData(movies.results, series.results);
    return all;
  } catch (err) {
    return err.toString();
  }
}

export async function fetchMovieOnlyGenres(with_genres, page, ...rest) {
  try {
    const requestPath = 'discover/movie';
    const requestParams = { with_genres, page, ...rest };
    const films = await fetchFromApi({ requestPath, requestParams });
    return films;
  } catch (err) {
    return err.toString();
  }
}

export async function fetchTvOnlyGenres(with_genres, page, ...rest) {
  try {
    const requestPath = 'discover/tv';
    const requestParams = { with_genres, page, ...rest };
    const films = await fetchFromApi({ requestPath, requestParams });

    return films;
  } catch (err) {
    return err.toString();
  }
}

export async function fetchAllOnlyGenres(with_genres, page, ...rest) {
  try {
    const movies = await fetchMovieOnlyGenres(with_genres, page, ...rest);
    const series = await fetchTvOnlyGenres(with_genres, page, ...rest);
    const all = mergeData(movies.results, series.results);
    return all;
  } catch (err) {
    return err.toString();
  }
}

function mergeData(movies, series) {
  const array = movies.concat(series);
  return array.sort((firsObj, secObj) => secObj.popularity - firsObj.popularity);
}
