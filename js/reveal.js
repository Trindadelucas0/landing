/**
 * Revela elementos ao entrar no viewport (Intersection Observer).
 * Adiciona a classe .in-view em elementos com .reveal, .reveal-left, .reveal-right, .reveal-up, .reveal-scale, .reveal-fade
 */
(function () {
  var selector = '.reveal, .reveal-left, .reveal-right, .reveal-up, .reveal-scale, .reveal-fade';
  var els = document.querySelectorAll(selector);
  if (!els.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '-50px 0px -80px 0px', threshold: 0.1 }
  );

  els.forEach(function (el) {
    observer.observe(el);
  });
})();
