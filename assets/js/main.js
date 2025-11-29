document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.nav-toggle');

  toggles.forEach((toggle) => {
    const nav = toggle.closest('.nav');
    const menu = nav?.querySelector('.nav-menu');

    if (!menu) return;

    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        toggle.setAttribute('aria-expanded', 'true');
        menu.classList.add('is-open');
      }
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => closeMenu());
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 780) {
        closeMenu();
      }
    });
  });
});