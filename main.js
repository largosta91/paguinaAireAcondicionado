(function() {
  'use strict';

  // ===========================
  // HELPERS
  // ===========================
  function formatNumber(n) {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`;
    return `${n}`;
  }

  // ===========================
  // AÑO EN FOOTER
  // ===========================
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ===========================
  // DOM READY
  // ===========================
  document.addEventListener('DOMContentLoaded', function() {

    // MENÚ MÓVIL
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
      menuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
      });

      mobileMenu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
          mobileMenu.classList.add('hidden');
        });
      });
    }

    // CONTADORES ANIMADOS
    function animateCounter(element, duration) {
      const target = parseInt(element.getAttribute('data-target')) || 0;
      let start = null;

      function step(timestamp) {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const current = Math.floor(progress * target);
        element.textContent = formatNumber(current);
        
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          element.textContent = formatNumber(target);
        }
      }
      requestAnimationFrame(step);
    }

    const counters = document.querySelectorAll('.counter-animated');
    if ('IntersectionObserver' in window && counters.length) {
      const observer = new IntersectionObserver(function(entries, obs) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target, 1800);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      counters.forEach(function(c) {
        observer.observe(c);
      });
    }

  }); // Fin DOMContentLoaded

  // ===========================
  // ICONOS FLOTANTES (load event)
  // ===========================
  window.addEventListener('load', function() {
    const hero = document.querySelector('main section.relative.text-white');
    if (!hero) return;

    const icons = Array.from(document.querySelectorAll('.floating-icon'));
    if (!icons.length) return;

    // No activar en móviles
    if (window.innerWidth <= 768) {
      icons.forEach(function(el, i) {
        const px = (15 + i * 25) % 85;
        const py = 20 + (i % 3) * 18;
        el.style.left = px + '%';
        el.style.top = py + '%';
        el.style.transform = 'translate(-50%, -50%) scale(0.6)';
      });
      return;
    }

    const heroStyle = getComputedStyle(hero);
    if (heroStyle.position === 'static') {
      hero.style.position = 'relative';
    }

    // Estado de cada icono
    const state = icons.map(function(el) {
      const rect = hero.getBoundingClientRect();
      const w = Math.max(48, el.offsetWidth);
      const h = Math.max(48, el.offsetHeight);

      const x = Math.random() * (rect.width - w) + w / 2;
      const y = Math.random() * (rect.height - h) + h / 2;

      const speed = 3 + Math.random() * 6;
      const angle = Math.random() * Math.PI * 2;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      const rot = (Math.random() * 20) - 10;
      const changeInterval = 3000 + Math.random() * 5000;

      return {
        el: el,
        x: x,
        y: y,
        vx: vx,
        vy: vy,
        rot: rot,
        width: w,
        height: h,
        lastChange: performance.now(),
        changeInterval: changeInterval
      };
    });

    let lastTime = performance.now();
    let rafId = null;

    function step(now) {
      const dt = Math.min(60, now - lastTime);
      lastTime = now;

      const rect = hero.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      state.forEach(function(s) {
        const dx = s.vx * (dt / 1000);
        const dy = s.vy * (dt / 1000);
        s.x += dx;
        s.y += dy;

        s.rot += (s.vx + s.vy) * 0.02;

        const marginX = s.width * 0.5 + 8;
        const marginY = s.height * 0.5 + 8;

        if (s.x < marginX) {
          s.x = marginX;
          s.vx = Math.abs(s.vx) * (0.8 + Math.random() * 0.4);
        }
        if (s.x > width - marginX) {
          s.x = width - marginX;
          s.vx = -Math.abs(s.vx) * (0.8 + Math.random() * 0.4);
        }
        if (s.y < marginY) {
          s.y = marginY;
          s.vy = Math.abs(s.vy) * (0.8 + Math.random() * 0.4);
        }
        if (s.y > height - marginY) {
          s.y = height - marginY;
          s.vy = -Math.abs(s.vy) * (0.8 + Math.random() * 0.4);
        }

        if (now - s.lastChange > s.changeInterval) {
          s.lastChange = now;
          s.changeInterval = 2500 + Math.random() * 7000;
          const newAngle = Math.random() * Math.PI * 2;
          const newSpeed = 2 + Math.random() * 8;
          s.vx = (s.vx * 0.6) + (Math.cos(newAngle) * newSpeed * 0.4);
          s.vy = (s.vy * 0.6) + (Math.sin(newAngle) * newSpeed * 0.4);
        }

        s.el.style.left = Math.round(s.x) + 'px';
        s.el.style.top = Math.round(s.y) + 'px';
        const scale = 0.6;
        s.el.style.transform = 'translate(-50%, -50%) scale(' + scale + ') rotate(' + s.rot.toFixed(2) + 'deg)';
      });

      rafId = requestAnimationFrame(step);
    }

    lastTime = performance.now();
    rafId = requestAnimationFrame(step);

    let resizeTimer = null;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      if (window.innerWidth <= 768) {
        if (rafId) cancelAnimationFrame(rafId);
        icons.forEach(function(el) {
          el.style.transform = 'translate(-50%, -50%) scale(0.6)';
        });
        return;
      }
      resizeTimer = setTimeout(function() {
        const rect = hero.getBoundingClientRect();
        state.forEach(function(s) {
          s.x = Math.min(Math.max(s.x, s.width / 2), rect.width - s.width / 2);
          s.y = Math.min(Math.max(s.y, s.height / 2), rect.height - s.height / 2);
        });
      }, 200);
    });

    window.addEventListener('beforeunload', function() {
      if (rafId) cancelAnimationFrame(rafId);
    });

  }); // Fin load

  // ===========================
  // CARRUSEL DE LOGOS
  // ===========================
  window.addEventListener('load', function() {
    const carousel = document.getElementById('carousel');
    const template = document.getElementById('logos');
    if (!carousel || !template) return;

    const content = template.content;
    carousel.innerHTML = '';
    carousel.appendChild(content.cloneNode(true));
    carousel.appendChild(content.cloneNode(true));

    const childrenCountPerSet = carousel.children.length / 2 || 0;
    let index = 0;
    let intervalId = null;

    function getGapPx() {
      const style = getComputedStyle(carousel);
      const gap = parseFloat(style.gap || style.columnGap || 0);
      return Number.isFinite(gap) ? gap : 64;
    }

    function getItemWidth() {
      const first = carousel.children[0];
      if (!first) return Math.max(window.innerWidth, 100);
      const rect = first.getBoundingClientRect();
      return Math.round(rect.width + getGapPx());
    }

    function moveCarousel() {
      const itemWidth = getItemWidth();
      index++;
      carousel.style.transition = 'transform 0.5s linear';
      carousel.style.transform = 'translateX(-' + (index * itemWidth) + 'px)';

      if (index >= childrenCountPerSet) {
        setTimeout(function() {
          carousel.style.transition = 'none';
          carousel.style.transform = 'translateX(0)';
          index = 0;
        }, 520);
      }
    }

    function startCarousel() {
      stopCarousel();
      intervalId = setInterval(moveCarousel, 1800);
    }

    function stopCarousel() {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }

    startCarousel();

    let resizeTimeout = null;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        index = 0;
        carousel.style.transition = 'none';
        carousel.style.transform = 'translateX(0)';
        startCarousel();
      }, 180);
    });

    window.addEventListener('beforeunload', stopCarousel);
  });

})();