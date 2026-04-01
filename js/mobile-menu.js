(function () {
  var toggle = document.getElementById('menu-toggle');
  var menu = document.getElementById('mobile-menu');
  var iconMenu = document.getElementById('icon-menu');
  var iconClose = document.getElementById('icon-close');
  var MOBILE_BREAKPOINT = 768;

  if (!toggle || !menu) return;

  var isOpen = false;
  var menuLinks = menu.querySelectorAll('a[href]');

  function syncUI() {
    menu.classList.toggle('hidden', !isOpen);
    menu.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('mobile-menu-open', isOpen);

    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    menu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');

    if (iconMenu && iconClose) {
      iconMenu.classList.toggle('hidden', isOpen);
      iconClose.classList.toggle('hidden', !isOpen);
    }
  }

  function closeMenu(focusToggle) {
    if (!isOpen) return;
    isOpen = false;
    syncUI();
    if (focusToggle) toggle.focus();
  }

  function openMenu() {
    if (isOpen) return;
    isOpen = true;
    syncUI();
  }

  function toggleMenu() {
    if (isOpen) {
      closeMenu(false);
      return;
    }
    openMenu();
  }

  toggle.addEventListener('click', function (event) {
    event.preventDefault();
    toggleMenu();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMenu(true);
  });

  document.addEventListener('click', function (event) {
    if (!isOpen) return;
    var target = event.target;
    if (menu.contains(target) || toggle.contains(target)) return;
    closeMenu(false);
  });

  menuLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu(false);
    });
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= MOBILE_BREAKPOINT) closeMenu(false);
  });

  window.addEventListener('orientationchange', function () {
    if (window.innerWidth >= MOBILE_BREAKPOINT) closeMenu(false);
  });

  syncUI();
})();
