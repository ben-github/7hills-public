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

// Upcoming vs. past concerts is decided at build time. Remove any concert
// (rendered with data-date) that has passed since the last build.
(function () {
  'use strict';

  var today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
  document.querySelectorAll('[data-date]').forEach(function (el) {
    if (el.dataset.date < today) el.remove();
  });

  // Home page: show the first remaining card, or drop the section
  var section = document.querySelector('.next-concert');
  if (section) {
    var card = section.querySelector('.next-concert-card');
    if (card) card.hidden = false; else section.remove();
  }

  // Upcoming concerts page: show the "no concerts" message if the list emptied
  var list = document.querySelector('.concert-list');
  if (list && !list.children.length) {
    list.remove();
    document.querySelector('.no-concerts').hidden = false;
  }
}());
