import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './configApp';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const modal = document.querySelector('#modal');
const form = document.querySelector('#modal-auth-form');
const button = document.querySelector('#form-send');
const logIn = document.querySelector('#logIn');
const logOut = document.querySelector('#logOut');

if (localStorage.getItem('userSession')) {
  logOut.classList.remove('is-hidden');
  logIn.classList.add('is-hidden');
}

form.addEventListener('submit', e => {
  console.log(e);
  e.preventDefault();

  const email = form[0].value;
  const pass = form[1].value;

  if (button.textContent !== 'Register') {
    loginUser(email, pass);
    modal.style.display = 'none';
  } else {
    registerUser(email, pass);
    modal.style.display = 'none';
  }
});

logOut.addEventListener('click', () => {
  document.location.reload();
  logout();
});

function registerUser(email, password) {
  if (email.length < 4) {
    Notify.failure('Please enter an email address.');
    return;
  }
  if (password.length < 8) {
    Notify.failure('Please enter a password.');
    return;
  }
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      sendEmailVerification(auth.currentUser).then(() => {
        // Email verification sent!
        Notify.success(`Confirm your e-mail address to activate your account.`);
      });
      localStorage.setItem('userSession', 'true');
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/weak-password') {
        Notify.failure('The password is too weak.');
      } else if (errorCode === 'auth/email-already-in-use') {
        Notify.failure('An account with this email already exist!');
      } else {
        Notify.failure(errorMessage);
      }
    });
}

function loginUser(email, password) {
  console.log(auth);
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      logOut.classList.remove('is-hidden');
      logIn.classList.add('is-hidden');

      const user = auth.currentUser;
      Notify.success(`User ${user.email} logged in success`);

      if (user !== null) {
        // The user object has basic properties such as display name, email, etc.
        const displayName = user.displayName;
        console.log(`displayName: ${user.displayName}`);
        const email = user.email;
        console.log(`email: ${user.email}`);
        const photoURL = user.photoURL;
        console.log(`photoURL: ${user.photoURL}`);
        const emailVerified = user.emailVerified;
        console.log(`emailVerified: ${user.emailVerified}`);
      }

      localStorage.setItem('userSession', 'true');
    })
    .catch(error => {
      console.log(error);
      error ? Notify.failure('Invalid password or email') : '';
    });
}

function logout() {
  const user = auth.currentUser;
  signOut(auth).then(() => {
    localStorage.removeItem('userSession');
    location.reload();
  });
  alert('You are logged out');
  logOut.classList.add('is-hidden');
  logIn.classList.remove('is-hidden');
}
