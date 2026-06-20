/* ============================================
   Dynamic Portfolio Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Theme Toggle ---
  const themeToggle = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // --- Mobile Nav Toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // --- Scroll Progress Bar ---
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = scrollPercent + '%';
    });
  }

  // --- Scroll Fade-In Animations ---
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    fadeEls.forEach(el => observer.observe(el));
  }

  // --- Active Nav Link Highlight ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a:not(.nav-cta):not(.theme-toggle)').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- Dynamic Year in Footer ---
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- Back to Top Button ---
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Lightbox for Certificate & Conference Images ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox__close') : null;

  if (lightbox) {
    // Attach click to all cert and conf images
    const clickableImages = document.querySelectorAll('.cert-item__image img, .conf-card__image img, .pub-card__image img');

    clickableImages.forEach(img => {
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = img.alt || '';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    // Close on backdrop click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Close button
    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      // Clear src after animation
      setTimeout(() => { lightboxImg.src = ''; }, 300);
    }
  }

});

// ----- Visit & view counters (counterapi.dev) -----
// Runs on EVERY page of this static site (script.js is loaded site-wide):
//  - "views"    : one page view per page load, across all pages.
//  - "visitors" : one unique visitor per browser per 24h (de-duped via localStorage).
// The numbers are only displayed where the counter elements exist (index.html),
// but counting happens regardless so direct landings on sub-pages are not lost.
(function () {
  const NS = 'argajitsarkr-github-io';
  const VIEW_KEY = 'pageviews';
  const VISITOR_KEY = 'visitors';
  const VISITOR_FLAG = 'as_visitor_seen_v2';
  const VISITOR_TTL = 24 * 60 * 60 * 1000; // count a returning browser as a new visitor after 24h
  const fmt = n => Number(n).toLocaleString();
  const elView = document.getElementById('view-count');
  const elVisit = document.getElementById('visitor-count');

  // Trailing slash on reads avoids counterapi's 301 redirect; "/up" increments.
  const api = (key, up) =>
    fetch(`https://api.counterapi.dev/v1/${NS}/${key}${up ? '/up' : '/'}`, { cache: 'no-store' })
      .then(r => r.ok ? r.json() : Promise.reject(r.status));

  const safeGet = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const safeSet = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };

  // 1) Page view — always increment, once per page load.
  api(VIEW_KEY, true)
    .then(d => { if (elView) elView.textContent = fmt(d.count); })
    .catch(() => { if (elView) elView.textContent = '—'; });

  // 2) Unique visitor — increment only if this browser hasn't been seen in the TTL window.
  const last = parseInt(safeGet(VISITOR_FLAG) || '0', 10);
  const isNewVisitor = !last || (Date.now() - last) > VISITOR_TTL;
  if (isNewVisitor) safeSet(VISITOR_FLAG, String(Date.now()));
  api(VISITOR_KEY, isNewVisitor)
    .then(d => { if (elVisit) elVisit.textContent = fmt(d.count); })
    .catch(() => { if (elVisit) elVisit.textContent = '—'; });
})();
