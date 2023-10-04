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
        return `//www.youtube.com/embed/${trailer.key}`;
      }
    }
  } catch (err) {
    return err;
  }
}

// <iframe width="560" height="315" src="https://www.youtube.com/embed/lJIrF4YjHfQ?si=JjAVaEwM0b9gnyyy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
