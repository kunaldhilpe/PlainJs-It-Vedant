(function () {
  'use strict';

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showError(input, message) {
    var field = input.closest('.field');
    var errorEl = field.querySelector('.field-error');
    if (message) {
      field.classList.add('has-error');
      errorEl.textContent = message;
      errorEl.hidden = false;
    } else {
      field.classList.remove('has-error');
      errorEl.hidden = true;
    }
  }

  /* ---------- Sign in ---------- */
  var signinForm = document.getElementById('signin-form');
  if (signinForm) {
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var btn = document.getElementById('signin-btn');
    var success = document.getElementById('signin-success');

    function validateSignin() {
      var errors = {};
      if (!email.value.trim()) errors.email = 'Email is required.';
      else if (!EMAIL_RE.test(email.value.trim())) errors.email = 'Enter a valid email address.';
      if (!password.value) errors.password = 'Password is required.';
      showError(email, errors.email);
      showError(password, errors.password);
      return Object.keys(errors).length === 0;
    }

    email.addEventListener('blur', validateSignin);
    password.addEventListener('blur', validateSignin);

    signinForm.addEventListener('submit', function (e) {
      e.preventDefault();
      console.log(email.value)
      console.log(password.value)
      if (!validateSignin()) return;

      btn.disabled = true;
      btn.textContent = 'Signing in…';

      setTimeout(function () {
        success.hidden = false;
        setTimeout(function () {
          window.location.href = 'courses.html';
        }, 1000);
      }, 600);
    });
  }

  /* ---------- Sign up ---------- */
  var signupForm = document.getElementById('signup-form');
  if (signupForm) {
    var suEmail = document.getElementById('email');
    var suUsername = document.getElementById('username');
    var suPassword = document.getElementById('password');
    var suBtn = document.getElementById('signup-btn');
    var suSuccess = document.getElementById('signup-success');

    var strengthWrap = document.getElementById('strength-wrap');
    var strengthFill = document.getElementById('strength-fill');
    var strengthText = document.getElementById('strength-text');

    var STRENGTH_LABEL = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'];
    var STRENGTH_COLOR = ['#D32F2F', '#D32F2F', '#ED6C02', '#5FA814', '#2E7D32'];

    function strength(p) {
      return [
        p.length >= 8,
        /[A-Z]/.test(p),
        /[0-9]/.test(p),
        /[^A-Za-z0-9]/.test(p)
      ].filter(Boolean).length;
    }

    function updateStrength() {
      var value = suPassword.value;
      strengthWrap.hidden = !value;
      if (!value) return;
      var score = strength(value);
      strengthFill.style.width = (score / 4) * 100 + '%';
      strengthFill.style.backgroundColor = STRENGTH_COLOR[score];
      strengthText.textContent = STRENGTH_LABEL[score];
    }

    function validateSignup() {
      var errors = {};
      if (!suEmail.value.trim()) errors.email = 'Email is required.';
      else if (!EMAIL_RE.test(suEmail.value.trim())) errors.email = 'Enter a valid email address.';
      if (!suUsername.value.trim()) errors.username = 'Username is required.';
      else if (suUsername.value.trim().length < 3) errors.username = 'Use at least 3 characters.';
      if (!suPassword.value) errors.password = 'Password is required.';
      else if (suPassword.value.length < 8) errors.password = 'Use at least 8 characters.';
      showError(suEmail, errors.email);
      showError(suUsername, errors.username);
      showError(suPassword, errors.password);
      return Object.keys(errors).length === 0;
    }

    suEmail.addEventListener('blur', validateSignup);
    suUsername.addEventListener('blur', validateSignup);
    suPassword.addEventListener('blur', validateSignup);
    suPassword.addEventListener('input', updateStrength);

    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();

      console.log(suEmail.value)
      console.log(suPassword.value)
      console.log(suUsername.value)

      if (!validateSignup()) return;

      suBtn.disabled = true;
      suBtn.textContent = 'Creating account…';

      setTimeout(function () {
        suSuccess.hidden = false;
        setTimeout(function () {
          window.location.href = 'signin.html';
        }, 1200);
      }, 700);
    });
  }
})();