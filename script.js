/* ========================================
   LIMA & SILVA ADVOCACIA — SCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* === NAVBAR: scroll effect + active link === */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    // Scrolled state
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top
    const btn = document.getElementById('backToTop');
    if (btn) {
      btn.classList.toggle('visible', window.scrollY > 400);
    }

    // Active nav link (index page)
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* === MOBILE HAMBURGER === */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });

    // Mobile dropdown toggle
    const dropdowns = navMenu.querySelectorAll('.dropdown');
    dropdowns.forEach(drop => {
      const link = drop.querySelector('.nav-link');
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          drop.classList.toggle('open');
        }
      });
    });
  }

  /* === DESKTOP DROPDOWN: stable hover with delay === */
  const desktopDropdowns = document.querySelectorAll('.navbar .dropdown');
  desktopDropdowns.forEach(drop => {
    let hideTimer = null;

    const show = () => {
      clearTimeout(hideTimer);
      drop.classList.add('is-open');
    };

    const hide = () => {
      hideTimer = setTimeout(() => {
        drop.classList.remove('is-open');
      }, 180);
    };

    drop.addEventListener('mouseenter', show);
    drop.addEventListener('mouseleave', hide);

    // Keep open while hovering the menu itself
    const menu = drop.querySelector('.dropdown-menu');
    if (menu) {
      menu.addEventListener('mouseenter', show);
      menu.addEventListener('mouseleave', hide);
    }
  });

  /* === BACK TO TOP === */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* === COUNTER ANIMATION === */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 16);
  }

  const counters = document.querySelectorAll('.stat-num');
  if (counters.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
  }

  /* === FADE-UP ON SCROLL === */
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    const fadeObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(el => fadeObs.observe(el));
  }

  /* === FAQ ACCORDION === */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all
        faqItems.forEach(i => i.classList.remove('open'));
        // Open clicked if it was closed
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  /* === SMOOTH SCROLL FOR ANCHOR LINKS === */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: 'smooth'
        });
      }
    });
  });

  /* === NAVBAR always scrolled on area pages (no hero) === */
  if (!document.querySelector('.hero')) {
    navbar.classList.add('scrolled');
  }

});
