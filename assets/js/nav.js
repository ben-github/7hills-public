// Mobile navigation toggle
(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  var dropdowns = document.querySelectorAll('.has-dropdown');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Mobile: tap to expand sub-menus
  dropdowns.forEach(function (item) {
    var link = item.querySelector('a');
    if (!link) return;
    link.addEventListener('click', function (e) {
      if (window.innerWidth < 769) {
        e.preventDefault();
        item.classList.toggle('open');
      }
    });
  });

  // Close nav when a leaf link is clicked
  nav.addEventListener('click', function (e) {
    var target = e.target;
    if (target.tagName === 'A' && !target.parentElement.classList.contains('has-dropdown')) {
      nav.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Hero slideshow (only on pages that have hero slides)
  var slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1) {
    var current = 0;
    setInterval(function () {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 5000);
  }
}());
