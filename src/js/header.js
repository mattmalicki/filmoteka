const chk = document.getElementById('chk');

chk.addEventListener('change', themeDark);

function themeDark() {
  document.body.classList.toggle('dark');
}
const settings = {
  theme: 'dark',
  isAuthenticated: true,
};

localStorage.setItem('settings', JSON.stringify(settings));
