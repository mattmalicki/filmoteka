import { fetchFromApi } from './fetchFromApi';

export async function getTrailer(id) {
  const requestPath = `movie/${id}/videos`;
  try {
    const trailers = await fetchFromApi({ requestPath });
    if (!trailers.results) {
      return;
    }
    for (let trailer of trailers.results) {
      if (trailer.site === 'YouTube' && trailer.name.toLowerCase().includes('trailer')) {
        return `//www.youtube.com/embed/${trailer.key}`;
      } else {
        return;
      }
    }
  } catch (err) {
    return err;
  }
}
