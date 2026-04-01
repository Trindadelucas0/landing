(function () {
  var isMobile = window.matchMedia && window.matchMedia('(max-width: 767px)');
  var buttons = document.querySelectorAll('.whatsapp-float-mobile');
  if (!buttons.length) return;

  buttons.forEach(function (button) {
    var collapseTimer = null;

    function collapse() {
      button.classList.remove('is-expanded');
      button.setAttribute('aria-expanded', 'false');
      if (collapseTimer) {
        clearTimeout(collapseTimer);
        collapseTimer = null;
      }
    }

    function expand() {
      button.classList.add('is-expanded');
      button.setAttribute('aria-expanded', 'true');
      if (collapseTimer) clearTimeout(collapseTimer);
      collapseTimer = setTimeout(collapse, 3200);
    }

    button.setAttribute('aria-expanded', 'false');

    button.addEventListener('click', function (event) {
      if (!isMobile || !isMobile.matches) return;

      if (!button.classList.contains('is-expanded')) {
        event.preventDefault();
        expand();
        return;
      }

      collapse();
    });

    document.addEventListener(
      'touchstart',
      function (event) {
        if (!button.classList.contains('is-expanded')) return;
        if (!button.contains(event.target)) collapse();
      },
      { passive: true }
    );

    document.addEventListener('click', function (event) {
      if (!button.classList.contains('is-expanded')) return;
      if (!button.contains(event.target)) collapse();
    });
  });
})();
