/* ==========================================================================
   The Maia Group — Main JavaScript
   ========================================================================== */

(function () {
  'use strict';

  // ── Navigation scroll effect ──────────────────────────────────────────
  const nav = document.getElementById('nav');

  function handleNavScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ── Mobile menu toggle ────────────────────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('nav__toggle--active');
    navLinks.classList.toggle('nav__links--mobile-open');
    document.body.style.overflow = navLinks.classList.contains('nav__links--mobile-open') ? 'hidden' : '';
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('nav__toggle--active');
      navLinks.classList.remove('nav__links--mobile-open');
      document.body.style.overflow = '';
    });
  });

  // ── Smooth scroll for anchor links ────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = nav.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ── Scroll reveal animations ──────────────────────────────────────────
  function initReveal() {
    // Add reveal classes to sections
    var sections = document.querySelectorAll('.about, .contact');
    sections.forEach(function (section) {
      section.classList.add('reveal');
    });

    // Add reveal to brands header
    var brandsHeader = document.querySelector('.brands__header');
    if (brandsHeader) brandsHeader.classList.add('reveal');

    // Add stagger to brands grid
    var brandsGrid = document.querySelector('.brands__grid');
    if (brandsGrid) brandsGrid.classList.add('reveal-stagger');

    // Add reveal to footer
    var footer = document.querySelector('.footer__top');
    if (footer) footer.classList.add('reveal');

    // Observe
    var observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('reveal')) {
            entry.target.classList.add('reveal--visible');
          }
          if (entry.target.classList.contains('reveal-stagger')) {
            entry.target.classList.add('reveal-stagger--visible');
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
      observer.observe(el);
    });
  }

  // ── Contact form handling ─────────────────────────────────────────────
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      // Netlify forms handle submission natively
      // This is a fallback for local testing
      var isNetlify = window.location.hostname.includes('netlify');
      if (!isNetlify && window.location.protocol === 'file:') {
        e.preventDefault();
        var btn = contactForm.querySelector('.form-submit');
        var originalText = btn.innerHTML;
        btn.innerHTML = '¡Mensaje enviado! ✓';
        btn.style.background = '#2E7D4B';
        setTimeout(function () {
          btn.innerHTML = originalText;
          btn.style.background = '';
          contactForm.reset();
        }, 3000);
      }
    });
  }

  // ── Active nav link on scroll ─────────────────────────────────────────
  var sectionIds = ['nosotros', 'empresas', 'contacto'];
  var navLinksAll = document.querySelectorAll('.nav__link');

  function updateActiveLink() {
    var scrollPos = window.scrollY + nav.offsetHeight + 100;

    sectionIds.forEach(function (id, index) {
      var section = document.getElementById(id);
      if (section) {
        var top = section.offsetTop;
        var bottom = top + section.offsetHeight;

        if (scrollPos >= top && scrollPos < bottom) {
          navLinksAll.forEach(function (link) { link.classList.remove('nav__link--active'); });
          navLinksAll[index].classList.add('nav__link--active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // ── Init ──────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    updateActiveLink();
  });

  // If DOM already loaded
  if (document.readyState !== 'loading') {
    initReveal();
    updateActiveLink();
  }

})();
