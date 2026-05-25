/* ═══════════════════════════════════════════════════════
   THE MARKET AT RIDGLEA — main.js
   ─────────────────────────────────────────────────────
   1. Navbar — scroll shrink effect
   2. Mobile nav — hamburger toggle with animation
   3. Scroll reveal — IntersectionObserver fade-ins
   4. Newsletter form — success state
═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1. NAVBAR SCROLL SHRINK ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ── 2. MOBILE NAV TOGGLE ── */
  const toggle   = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('navLinks');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when any nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu on outside click
    document.addEventListener('click', e => {
      if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── 3. SCROLL REVEAL ── */
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window && fadeEls.length) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    fadeEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately for older browsers
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ── 4. NEWSLETTER FORM ── */
  const nlForm   = document.getElementById('nl-form');
  const nlThanks = document.getElementById('nl-thanks');

  if (nlForm && nlThanks) {
    nlForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = nlForm.querySelector('.nl-input').value.trim();
      if (!email) return;
      nlForm.style.display = 'none';
      nlThanks.style.display = 'block';
      // Replace this comment with your actual email subscription API call:
      // fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) })
    });
  }

})();
