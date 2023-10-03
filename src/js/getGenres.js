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
    return removeDuplicates(all);
  } catch (err) {
    return err;
  }
}

function removeDuplicates(array) {
  // Declare a new array
  let newArray = [];

  // Declare an empty object
  let uniqueObject = {};

  // Loop for the array elements
  for (let i in array) {
    // Extract the title
    objTitle = array[i]['id'];

    // Use the title as the index
    uniqueObject[objTitle] = array[i];
  }

  // Loop to push unique object into array
  for (i in uniqueObject) {
    newArray.push(uniqueObject[i]);
  }
  return newArray;
}
