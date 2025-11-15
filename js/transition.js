document.addEventListener('DOMContentLoaded', () => {

  document.body.style.opacity = '0';

  setTimeout(() => {
    document.body.style.transition = 'opacity 0.3s';
    document.body.style.opacity = '1';
  }, 10);

  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.style.opacity = '0';

      setTimeout(() => {
        window.location = link.href;
      }, 300);
    });
  });
});