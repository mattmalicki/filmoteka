import { fetchFromApi } from './fetchFromApi';

export async function getTrailer(id) {
  const requestPath = `movie/${id}/videos`;
  try {
    const trailers = await fetchFromApi({ requestPath });
    if (!trailers.results) {
      return;
    }
    let officialTrailers = [];
    trailers.results.forEach(item => {
      item.name.toLowerCase().includes('trailer') ? officialTrailers.push(item) : null;
    });
    if (officialTrailers.length && officialTrailers[0].key) {
      return `https://www.youtube.com/embed/${officialTrailers[0].key}`;
    } else {
      return `https://www.youtube.com/embed/${trailers.results[0].key}`;
    }
  } catch (err) {
    return err;
  }
}
