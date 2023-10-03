import { getDatabase, ref, onValue, update, remove } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './configApp';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { saveStorage, loadStorage } from '../localStorage';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);

export function getMoviesFromDB(user) {
  const reference = ref(db, `users/${user.uid}/`);

  console.log(`reference: ${reference}`);

  onValue(reference, snapshot => {
    const data = snapshot.val();

    if (data) {
      if (data.films) {
        if (data.films.watched) {
          saveStorage('watchedFilms', data.films.watched);
          Notify.success(`Watched movies restored to localStorage.`);
        }
        if (data.films.queue) {
          saveStorage('queueFilms', data.films.queue);
          Notify.success(`Queue movies restored to localStorage.`);
        }
      }
    }
  });
}

export function setMoviesInDB(user) {
  const userWatched = loadStorage('watchedFilms');
  const userQueue = loadStorage('queueFilms');

  const data = {
    watched: userWatched,
    queue: userQueue,
  };

  console.log(`data: ${data.films}`);

  update(ref(db, `users/${user.uid}`), {
    films: data,
  })
    .then(() => {
      Notify.success(`Update success`);
    })
    .catch(err => {
      Notify.failure(`Error! The data hasn't been saved in the database`);
      console.log(err);
    });
}

export function removeFilmFromLocalStorage(key, { id }) {
  const data = loadStorage(key);
  if (!data) return;

  const currentFilmsArray = data;
  const returnNewFilmsArray = currentFilmsArray.filter(item => item.id !== id);
  saveStorage(key, returnNewFilmsArray);
}

export function addFilmToLocalStorage(key, film) {
  const data = loadStorage(key);
  const currentFilmsArray = [];
  console.log(`data: ${data}`);
  if (data) {
    currentFilmsArray.push(...data);
  }
  const isInclude = currentFilmsArray.some(({ id }) => id === film.id);
  if (isInclude) {
    Notify.failure(`Error! A movie with the specified {id} already exists in localStorage!`);
    return;
  }
  currentFilmsArray.push(film);
  saveStorage(key, currentFilmsArray);
}

export function isInclude(key, filmID) {
  const data = loadStorage(key);

  const allFilms = [];

  if (data) {
    allFilms.push(...data);
  }

  if (!allFilms) {
    return false;
  }

  return allFilms.some(e => e.id === Number(filmID));
}
