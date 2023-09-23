const footer = document.getElementById('footer');
const toggleButton = document.getElementById('toggle-footer');
const iconUp = toggleButton.querySelector('.icon-circle-up');
const iconDown = toggleButton.querySelector('.icon-circle-down');

toggleButton.addEventListener('click', function () {
  footer.classList.toggle('hidden');

  // Przełącz widoczność ikon w zależności od stanu footera
  iconUp.classList.toggle('hidden', !footer.classList.contains('hidden'));
  iconDown.classList.toggle('hidden', footer.classList.contains('hidden'));

   if (!footer.classList.contains('hidden')) {
     toggleButton.style.bottom = '45px';
   } else {
     toggleButton.style.bottom = '15px'; // Domyślna pozycja przycisku
   }
});
