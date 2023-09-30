var threshold = 100; // ustalamy prog na przewinięcie strony o 100 pikseli

window.addEventListener('scroll', function() {
  var originalHeader = document.querySelector('.header');
  var stickyHeader = document.querySelector('.js-header__sticky');

  var originalHeaderRect = originalHeader.getBoundingClientRect();

  if (originalHeaderRect.bottom < -threshold) { // sprawdzamy, czy przewinięcie jest większe od progu
    stickyHeader.style.display = 'block';
  } else {
    stickyHeader.style.display = 'none';
  }
});

var logo = document.querySelector('.header__sticky__logo');
logo.addEventListener('click', function(event) {
  event.preventDefault();
  var originalHeader = document.querySelector('.header');
  var stickyHeader = document.querySelector('.js-header__sticky');
  
  stickyHeader.style.display = 'none';
  window.scrollTo(0, originalHeader.offsetTop);
});

var homeLink = document.querySelector('.header__sticky__nav--item');
homeLink.addEventListener('click', function(event) {
  event.preventDefault();
  var originalHeader = document.querySelector('.header');
  var stickyHeader = document.querySelector('.js-header__sticky');
  
  stickyHeader.style.display = 'none';
  window.scrollTo(0, originalHeader.offsetTop);
});



// Funkcja getBoundingClientRect() zwraca obiekt DOMRect, 
// który zawiera informacje o rozmiarze i położeniu prostokątnego
// obszaru, zajmowanego przez element na stronie.Właściwości tego 
// obiektu obejmują: left(lewa krawędź elementu),
// top(górna krawędź elementu), right(prawa krawędź elementu),
// bottom(dolna krawędź elementu), width(szerokość elementu) i
// height(wysokość elementu).Funkcja ta jest użyteczna do 
// dynamicznego ustalania położenia i rozmiaru elementów w
// zależności od ich znajomości na stronie.