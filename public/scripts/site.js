(() => {
  const root = document.documentElement;
  const themeButtons = document.querySelectorAll('[data-theme-toggle]');

  themeButtons.forEach((button) => {
    button.setAttribute('aria-label', root.dataset.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    button.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('pawpawdecors-theme', next); } catch (_) { /* Storage may be unavailable. */ }
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

  const carousel = document.querySelector('[data-featured-carousel]');
  if (carousel) {
    const track = carousel.querySelector('[data-featured-track]');
    const slides = track ? Array.from(track.querySelectorAll('.featured-slide')) : [];
    const previous = carousel.querySelector('[data-featured-prev]');
    const next = carousel.querySelector('[data-featured-next]');
    const counter = carousel.querySelector('[data-featured-counter]');
    if (track && slides.length > 1 && previous && next) {
      let activeIndex = 0;
      let timer = null;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const updateCounter = () => {
        if (counter) counter.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
      };

      const goTo = (index) => {
        activeIndex = (index + slides.length) % slides.length;
        track.scrollTo({
          left: activeIndex * track.clientWidth,
          behavior: reducedMotion ? 'auto' : 'smooth',
        });
        updateCounter();
      };

      const stopAutoplay = () => {
        if (timer) window.clearInterval(timer);
        timer = null;
      };

      const startAutoplay = () => {
        stopAutoplay();
        if (reducedMotion || document.hidden) return;
        timer = window.setInterval(() => goTo(activeIndex + 1), 6000);
      };

      previous.addEventListener('click', () => { goTo(activeIndex - 1); startAutoplay(); });
      next.addEventListener('click', () => { goTo(activeIndex + 1); startAutoplay(); });
      track.addEventListener('scroll', () => {
        const width = track.clientWidth || 1;
        const visibleIndex = Math.round(track.scrollLeft / width);
        if (visibleIndex !== activeIndex && visibleIndex >= 0 && visibleIndex < slides.length) {
          activeIndex = visibleIndex;
          updateCounter();
        }
      }, { passive: true });

      carousel.addEventListener('mouseenter', stopAutoplay);
      carousel.addEventListener('mouseleave', startAutoplay);
      carousel.addEventListener('focusin', stopAutoplay);
      carousel.addEventListener('focusout', (event) => {
        if (!carousel.contains(event.relatedTarget)) startAutoplay();
      });
      document.addEventListener('visibilitychange', () => document.hidden ? stopAutoplay() : startAutoplay());
      window.addEventListener('resize', () => goTo(activeIndex));
      startAutoplay();
    }
  }
})();
