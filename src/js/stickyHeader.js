window.addEventListener('scroll', function() {
  var originalHeader = document.querySelector('.header');
  var stickyHeader = document.querySelector('.js-header__sticky');
  
  var originalHeaderRect = originalHeader.getBoundingClientRect();
  
  if (originalHeaderRect.bottom < 0) {
    stickyHeader.style.display = 'block';
  } else {
    stickyHeader.style.display = 'none';
  }
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