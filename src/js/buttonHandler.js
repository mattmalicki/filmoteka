// FT-14 "Naciśnięcie przycisku "Watched" powoduje wyświetlenie oglądanych przez użytkownika filmów"
// FT-15 "Naciśnięcie przycisku "Queue" powoduje wyświetlenie filmów dodanych do kolejki użytkownika"

const watchedButton = document.querySelector('#show-watched-button'); //sprawdzić id przycisku!
const queuedButton = document.querySelector('#show-quequed-button'); //sprawdzić id przycisku!
const gallery = document.querySelector('#gallery'); //sprawdzić id galerii!


function clearGallery() {
  while (gallery.firstChild) {
    gallery.firstChild.remove();
  }
} // czyszczenie poprzednio wyświetlonych filmów


function displayWatched() {
  clearGallery();

  // dodać funkcjonalność firebase
} 
// wyświetlanie filmów pobranych z danych użytkownika w firebase

const handleWatchedButton = () => {
  displayWatched();
}

watchedButton.addEventListener('click', handleWatchedButton); //sam guzik watched


function displayQueued() {
    clearGallery();

    // dodać funkcjonalność firebase
}
// wyświetlanie filmów pobranych z danych użytkownika w firebase

const handleQueuedButton = () => {
    displayQueued();
}

queuedButton.addEventListener('click', handleQueuedButton); //sam guzik queued

