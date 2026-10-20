(function () {
  'use strict';

  var ALL_COURSES = [
    { id: 1, title: 'Full-Stack Web Development', category: 'Web Development', level: 'Beginner', duration: '12 weeks', students: 12400, price: 4999, popular: true },
    { id: 2, title: 'React & Modern Frontend', category: 'Web Development', level: 'Intermediate', duration: '8 weeks', students: 9800, price: 3999 },
    { id: 3, title: 'Python for Data Science', category: 'Data Science', level: 'Beginner', duration: '10 weeks', students: 15200, price: 4499, popular: true },
    { id: 4, title: 'Machine Learning Foundations', category: 'Data Science', level: 'Advanced', duration: '14 weeks', students: 6100, price: 6999 },
    { id: 5, title: 'Flutter App Development', category: 'App Development', level: 'Intermediate', duration: '9 weeks', students: 7300, price: 4299 },
    { id: 6, title: 'iOS with Swift', category: 'App Development', level: 'Beginner', duration: '10 weeks', students: 5400, price: 4799 },
    { id: 7, title: 'Node.js & APIs', category: 'Web Development', level: 'Intermediate', duration: '6 weeks', students: 8200, price: 3499 },
    { id: 8, title: 'SQL & Data Analytics', category: 'Data Science', level: 'Beginner', duration: '6 weeks', students: 11000, price: 2999, popular: true },
    { id: 9, title: 'Android with Kotlin', category: 'App Development', level: 'Advanced', duration: '12 weeks', students: 4100, price: 5499 }
  ];

  var grid = document.getElementById('course-grid');
  if (!grid) return;

  var searchInput = document.getElementById('course-search');
  var filterWrap = document.getElementById('category-filters');
  var countEl = document.getElementById('courses-count');
  var emptyState = document.getElementById('empty-state');
  var emptyQuery = document.getElementById('empty-query');
  var clearBtn = document.getElementById('clear-filters');

  var state = { category: 'All', query: '' };

  var inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
  var compact = new Intl.NumberFormat('en', { notation: 'compact' });

  var LEVEL_CLASS = {
    Beginner: 'chip--beginner',
    Intermediate: 'chip--intermediate',
    Advanced: 'chip--advanced'
  };

  var ICON_CLOCK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 10.6 4.2 2.5-.8 1.3L11 13.5V7h2v5.6z"/></svg>';
  var ICON_GROUP = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm-8 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm0 2c-2.3 0-7 1.2-7 3.5V19h9v-2.5c0-.8.3-1.5.7-2.1A11 11 0 0 0 8 13zm8 0c-.3 0-.6 0-1 .1a4.9 4.9 0 0 1 2 3.4V19h6v-2.5c0-2.3-4.7-3.5-7-3.5z"/></svg>';

  function courseCard(course) {
    return '' +
      '<article class="course-card">' +
        '<div class="course-card__cover" aria-hidden="true">' +
          (course.popular ? '<span class="badge-popular">Popular</span>' : '') +
        '</div>' +
        '<div class="course-card__body">' +
          '<div class="course-card__meta">' +
            // '<span class="chip chip--static">' + course.category + '</span>' +
            // '<span class="chip chip--static ' + (LEVEL_CLASS[course.level] || '') + '">' + course.level + '</span>' +
          '</div>' +
          '<h3>' + course.title + '</h3>' +
          '<div class="course-card__stats">' +
            // '<span>' + ICON_CLOCK + course.duration + '</span>' +
            // '<span>' + ICON_GROUP + compact.format(course.students) + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="course-card__footer">' +
          '<span class="course-card__price">' + inr.format(course.price) + '</span>' +
          '<a href="signup.html" class="btn btn--primary btn--sm">Enroll</a>' +
        '</div>' +
      '</article>';
  }

  function render() {
    var q = state.query.trim().toLowerCase();
    var visible = ALL_COURSES.filter(function (c) {
      var matchesCategory = state.category === 'All' || c.category === state.category;
      var matchesQuery = !q || c.title.toLowerCase().indexOf(q) !== -1;
      return matchesCategory && matchesQuery;
    });

    grid.innerHTML = visible.map(courseCard).join('');
    countEl.textContent = 'Showing ' + visible.length + ' of ' + ALL_COURSES.length + ' courses';
    emptyState.hidden = visible.length !== 0;
    emptyQuery.textContent = state.query;
  }

  /* Search */
  searchInput.addEventListener('input', function () {
    state.query = searchInput.value;
    render();
  });

  /* Category filter */
  filterWrap.addEventListener('click', function (e) {
    var btn = e.target.closest('.chip');
    if (!btn) return;
    filterWrap.querySelectorAll('.chip').forEach(function (c) {
      c.classList.remove('is-active');
      c.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-pressed', 'true');
    state.category = btn.dataset.category;
    render();
  });

  /* Clear filters */
  clearBtn.addEventListener('click', function () {
    state.query = '';
    state.category = 'All';
    searchInput.value = '';
    filterWrap.querySelectorAll('.chip').forEach(function (c) {
      var active = c.dataset.category === 'All';
      c.classList.toggle('is-active', active);
      c.setAttribute('aria-pressed', String(active));
    });
    render();
  });

  render();
})();