const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmEwYTgwNDZiYWRmMDlmOGM2MWVhOWMwNjFkMjc1ZCIsInN1YiI6IjY1MGM0MDg4NDRlYTU0MDBjNjMxZDVjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QCvrUYw290qbZ5ir3M1mVaFysI8g2yCPJXwVdcerhR4';
const API_URL = 'https://api.themoviedb.org/3/';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

export async function fetchFilms({ requestType = 'trending/all/day', requestParams = {} }) {
  try {
    const params = new URLSearchParams({ ...requestParams });
    const response = await fetch(`${API_URL}${requestType}?${params}`, options);
    if (!response.ok) {
      throw new Error(`Error status: ${response.status}`);
    }
    const films = await response.json();
    return films;
  } catch (err) {
    return err;
  }
}
