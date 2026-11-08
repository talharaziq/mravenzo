(() => {
  const root = document.documentElement;
  const themeButtons = document.querySelectorAll('[data-theme-toggle]');
  themeButtons.forEach((button) => {
    button.setAttribute('aria-label', root.dataset.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    button.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('mravenzo-theme', next); } catch (_) { /* Storage may be unavailable. */ }
      button.setAttribute('aria-label', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    });
  });

  const menuToggle = document.querySelector('[data-menu-toggle]');
  const nav = document.getElementById('primary-navigation');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      const icon = menuToggle.querySelector('svg');
      if (icon) {
        icon.innerHTML = open
          ? '<path d="m6 6 12 12M18 6 6 18" />'
          : '<path d="M4 7h16M4 12h16M4 17h16" />';
      }
    });
  }

  const searchToggle = document.querySelector('[data-search-toggle]');
  const searchPanel = document.getElementById('header-search');
  if (searchToggle && searchPanel) {
    searchToggle.addEventListener('click', () => {
      const open = searchPanel.hidden;
      searchPanel.hidden = !open;
      searchToggle.setAttribute('aria-expanded', String(open));
      if (open) searchPanel.querySelector('input')?.focus();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !searchPanel.hidden) {
        searchPanel.hidden = true;
        searchToggle.setAttribute('aria-expanded', 'false');
        searchToggle.focus();
      }
    });
    document.addEventListener('click', (event) => {
      if (!searchPanel.hidden && !searchPanel.contains(event.target) && !searchToggle.contains(event.target)) {
        searchPanel.hidden = true;
        searchToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();
