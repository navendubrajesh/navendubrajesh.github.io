(function () {
  'use strict';

  var THEME_KEY = 'nb-theme';

  function getPreferredTheme() {
    var stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  function initTheme() {
    applyTheme(getPreferredTheme());
    var toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    }
  }

  function initHeader() {
    var header = document.getElementById('site-header');
    if (!header) return;
    function onScroll() {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initNavHighlight() {
    var sections = ['work', 'writing', 'about', 'connect'];
    var links = document.querySelectorAll('.site-nav a');
    if (!links.length || !('IntersectionObserver' in window)) return;

    var map = {};
    links.forEach(function (link) {
      var id = link.getAttribute('href').replace('#', '');
      map[id] = link;
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            links.forEach(function (l) { l.classList.remove('is-active'); });
            var active = map[entry.target.id];
            if (active) active.classList.add('is-active');
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function renderLink(href, label, iconId) {
    if (!href) return '';
    var icon = iconId
      ? '<svg class="project-link-icon" aria-hidden="true"><use href="#' + iconId + '"/></svg>'
      : '';
    return '<a href="' + escapeHtml(href) + '" rel="noopener noreferrer">' + icon + escapeHtml(label) + '</a>';
  }

  function renderProject(project) {
    var featured = project.featured ? ' is-featured' : '';
    var badge = project.featured ? '<span class="project-badge">Featured</span>' : '';
    var titleHref = (project.links && project.links.live)
      ? project.links.live
      : (project.links && project.links.repo ? project.links.repo : '');
    var title = titleHref
      ? '<a href="' + escapeHtml(titleHref) + '" rel="noopener noreferrer">' + escapeHtml(project.title) + '</a>'
      : escapeHtml(project.title);
    var dateMarkup = project.date
      ? '<time class="project-date" datetime="' + escapeHtml(project.date) + '">' + escapeHtml(project.date) + '</time>'
      : '';

    var tags = (project.tags || []).map(function (tag) {
      return '<li>' + escapeHtml(tag) + '</li>';
    }).join('');

    var links = [];
    if (project.links) {
      if (project.links.repo) links.push(renderLink(project.links.repo, 'Repo', 'icon-repo'));
      if (project.links.live) links.push(renderLink(project.links.live, 'Enterprise'));
      if (project.links.article) links.push(renderLink(project.links.article, 'Article'));
    }

    return (
      '<article class="project-card' + featured + '">' +
        '<div class="project-body">' +
          badge +
          '<div class="project-title-row">' +
            '<h3>' + title + '</h3>' +
            dateMarkup +
          '</div>' +
          '<p class="project-desc">' + escapeHtml(project.description) + '</p>' +
          (tags ? '<ul class="tag-list" aria-label="Tags">' + tags + '</ul>' : '') +
          (links.length ? '<div class="project-links">' + links.join('') + '</div>' : '') +
        '</div>' +
      '</article>'
    );
  }

  function loadProjects() {
    var grid = document.getElementById('project-grid');
    var loading = document.getElementById('projects-loading');
    if (!grid) return;

    fetch('/projects.json')
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load projects.json');
        return res.json();
      })
      .then(function (projects) {
        var items = projects.filter(function (p) { return !p.template; });
        items.sort(function (a, b) {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        if (loading) loading.remove();
        if (!items.length) {
          grid.innerHTML = '<p class="error-msg">No projects found.</p>';
          return;
        }
        grid.innerHTML = items.map(renderProject).join('');
      })
      .catch(function () {
        if (loading) loading.remove();
        grid.innerHTML = '<p class="error-msg">Could not load projects. Check projects.json.</p>';
      });
  }

  function initYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initHeader();
    initNavHighlight();
    loadProjects();
    initYear();
  });
})();
