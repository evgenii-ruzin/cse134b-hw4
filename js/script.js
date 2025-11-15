document.addEventListener('DOMContentLoaded', init);

function init() {
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'light');
  }

  theme_toggle(localStorage.getItem('theme'));

  document.querySelector('#theme').style.display = 'block';
  document.querySelector('header').style.gridTemplateColumns = '0.5fr 0.5fr auto 1fr';

  document.querySelector('#theme').addEventListener('click', (e) => {
    if (e.target.closest('.header-icon, #theme a')) {
      if (localStorage.getItem('theme') === 'light') {
        theme_toggle('dark');
      }
      else {
        theme_toggle('light');
      }
    }
  })
}

function theme_toggle(theme) {
  const root = document.documentElement;
  const theme_button = document.getElementById('theme');

  if (theme === 'light') {
    localStorage.setItem('theme', 'light');
    root.style.setProperty('--theme-header-color-1', '#ff1493');
    root.style.setProperty('--theme-header-color-2', '#f9f871');
    root.style.setProperty('--theme-header-color-text', 'black');
    root.style.setProperty('--theme-bg-color-1', '#ff4a73');
    root.style.setProperty('--theme-bg-color-2', '#ffa94b');
    theme_button.innerHTML = `<a href="javascript:void(0)"><div class="header-icon sun-icon"></div></a>`;
  }
  else {
    localStorage.setItem('theme', 'dark');
    root.style.setProperty('--theme-header-color-1', '#6b2d5c');
    root.style.setProperty('--theme-header-color-2', '#1e3a5f');
    root.style.setProperty('--theme-header-color-text', 'white');
    root.style.setProperty('--theme-bg-color-1', '#2a1b3d');
    root.style.setProperty('--theme-bg-color-2', '#1f2937');
    theme_button.innerHTML = `<a href="javascript:void(0)"><div class="header-icon moon-icon"></div></a>`;
  }
}