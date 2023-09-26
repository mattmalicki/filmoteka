//FT-21 Podłączyć/utworzyć Loader (spinner) dla żądań asynchronicznych

const backdrop = document.querySelector('#backdrop');
const classes = backdrop.classList;

export function loaderToggle() {
    const newClasses = classes.toggle("hidden");
}