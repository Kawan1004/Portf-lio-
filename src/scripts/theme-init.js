(() => {
  const root = document.documentElement;
  root.classList.add('js');
  let theme;
  try {
    theme = localStorage.getItem('theme');
  } catch {}
  // Light é o tema principal do site; o dark fica disponível pelo botão.
  root.dataset.theme = theme === 'dark' ? 'dark' : 'light';
})();
