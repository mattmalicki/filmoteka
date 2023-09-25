import { fetchFromApi } from './fetchFromApi';

export async function getTrailer(type, id) {
  const requestPath = `${type}/${id}/videos`;
  try {
    const trailers = await fetchFromApi({ requestPath });
    console.log(trailers);
    if (!trailers.id || !trailers.results) {
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
