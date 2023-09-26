//FT-21 Podłączyć/utworzyć Loader (spinner) dla żądań asynchronicznych

const backdrop = document.querySelector('#backdrop');

export function loaderToggle() {
  backdrop.toggle('hidden');
}
