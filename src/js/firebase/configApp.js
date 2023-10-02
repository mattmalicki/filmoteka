// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAc62HmjLcHUIGChJcMCAg71uFk92arqno',
  authDomain: 'js-team-project-filmoteka-gr02.firebaseapp.com',
  databaseURL: 'https://js-team-project-filmoteka-gr02-default-rtdb.firebaseio.com/',
  projectId: 'js-team-project-filmoteka-gr02',
  storageBucket: 'js-team-project-filmoteka-gr02.appspot.com',
  messagingSenderId: '776953354651',
  appId: '1:776953354651:web:b78fad8cd465434391e93e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { firebaseConfig }; 
