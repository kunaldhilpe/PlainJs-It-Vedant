/* ============================================
   ClassIQ — shared behaviours
   Navbar scroll state, mobile drawer, reveal
   on scroll, footer subscribe, password toggles
   ============================================ */
(function () {
  'use strict';

  /* ---------- Navbar shadow on scroll ---------- */
  var navbar = document.getElementById('navbar');
  if (navbar) {
    var onScroll = function () {
      navbar.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile drawer ---------- */
  var drawer = document.getElementById('drawer');
  var burger = document.getElementById('burger');
  var drawerClose = document.getElementById('drawer-close');

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
  }

  if (burger) burger.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawer) {
    drawer.addEventListener('click', function (e) {
      if (e.target === drawer) closeDrawer();
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Newsletter subscribe ---------- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var form = document.getElementById('subscribe-form');
  var toast = document.getElementById('toast');
  var toastTimer = null;

  function showToast() {
    if (!toast) return;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 3000);
  }

  if (form) {
    var emailInput = document.getElementById('subscribe-email');
    var errorEl = document.getElementById('subscribe-error');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var value = emailInput.value.trim();
      if (!EMAIL_RE.test(value)) {
        errorEl.textContent = 'Please enter a valid email address.';
        errorEl.hidden = false;
        return;
      }
      errorEl.hidden = true;
      emailInput.value = '';
      showToast();
    });
  }

  /* ---------- Password show/hide toggles ---------- */
  document.querySelectorAll('.password-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = document.getElementById(btn.dataset.target);
      if (!input) return;
      var show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.setAttribute('aria-pressed', String(show));
      btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
      var open = btn.querySelector('.eye-open');
      var closed = btn.querySelector('.eye-closed');
      if (open) open.hidden = show;
      if (closed) closed.hidden = !show;
    });
  });
})();