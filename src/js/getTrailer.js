import { fetchFromApi } from './fetchFromApi';

export async function getTrailer(id) {
  const requestPath = `movie/${id}/videos`;
  try {
    const trailers = await fetchFromApi({ requestPath });
    if (!trailers.results) {
      return;
    }
    let officialTrailers = [];
    officialTrailers = trailers.results.filter(item => {
      item.name.toLowerCase().includes('trailer');
    });
    console.log(officialTrailers);
    if (officialTrailers.length && officialTrailers[0].key) {
      return `https://www.youtube.com/embed/${officialTrailer[0].key}`;
    } else {
      return `https://www.youtube.com/embed/${trailers.results[0].key}`;
    }
  } catch (err) {
    return err;
  }
}
