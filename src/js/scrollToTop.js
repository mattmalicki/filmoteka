const scrollToTopButton = document.querySelector('#scroll-top');

function onTopScroll() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

scrollToTopButton.addEventListener('click', onTopScroll);

window.onscroll = () => showScroll();

const showScroll = () => {
  if (window.scrollY > 600) {
    scrollToTopButton.classList.remove('is-hidden');
  } else {
    scrollToTopButton.classList.add('is-hidden');
  }
};
