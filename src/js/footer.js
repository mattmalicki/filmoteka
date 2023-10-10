const button = document.querySelector('#footer__button');
const icon = document.querySelector('.footer__button-icon');
const footer = document.querySelector('#footer');

function toggleFooter() {
  footer.classList.toggle('hide');
  icon.classList.toggle('flip');
}

button.addEventListener('click', toggleFooter);
