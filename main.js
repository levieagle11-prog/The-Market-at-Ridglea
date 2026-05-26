/* ═══════════════════════════════════════════════════════
   THE MARKET AT RIDGLEA — main.js
   1. Navbar scroll shrink
   2. Mobile nav toggle (tap outside to close)
   3. Scroll reveal (IntersectionObserver)
   4. Newsletter form success state
   5. Mobile: prevent body scroll when nav open
   6. Touch-friendly map scroll fix
═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1. NAVBAR SCROLL SHRINK ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── 2. MOBILE NAV TOGGLE ── */
  const toggle   = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('navLinks');

  function closeNav() {
    if (!navLinks) return;
    navLinks.classList.remove('open');
    toggle && toggle.classList.remove('open');
    toggle && toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (toggle && navLinks) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open') && !navbar.contains(e.target)) {
        closeNav();
      }
    });

    // Close on swipe up
    let touchStartY = 0;
    navLinks.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
    navLinks.addEventListener('touchend', e => {
      if (e.changedTouches[0].clientY - touchStartY < -40) closeNav();
    }, { passive: true });
  }

  /* ── 3. SCROLL REVEAL ── */
  const fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window && fadeEls.length) {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ── 4. NEWSLETTER FORMS ── */
  document.querySelectorAll('#nl-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const thanks = document.getElementById('nl-thanks');
      form.style.display = 'none';
      if (thanks) thanks.style.display = 'block';
    });
  });

  /* ── 5. VIEWPORT HEIGHT FIX (iOS Safari) ── */
  function setVh() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  }
  setVh();
  window.addEventListener('resize', setVh, { passive: true });

  /* ── 6. MAP: enable scroll on touch but not wheel ── */
  const mapEl = document.getElementById('market-map');
  if (mapEl) {
    mapEl.addEventListener('touchstart', () => {
      mapEl.style.zIndex = '2';
    }, { passive: true });
  }

})();
