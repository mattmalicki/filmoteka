import { fetchFromApi } from './fetchFromApi';

export async function getTrailer(id) {
  const requestPath = `movie/${id}/videos`;
  try {
    const trailers = await fetchFromApi({ requestPath });
    if (!trailers.results) {
      return;
    }
    for (let trailer of trailers.results) {
      if (trailer.site === 'YouTube') {
        return `https://www.youtube.com/watch?v=${trailer.key}`;
      }
    }
  } catch (err) {
    return err;
  }
}
