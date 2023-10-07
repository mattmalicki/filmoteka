const pag = document.querySelector('#pagination');

export function showLoader() {
  pag.classList.remove('is-hidden');
}
export function hideLoader() {
  pag.classList.add('is-hidden');
}
