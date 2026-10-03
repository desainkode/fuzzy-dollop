/* ============ MUSE STUDIO — interactions ============ */
(function () {
  'use strict';

  /* Header background on scroll */
  const header = document.getElementById('siteHeader');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile nav */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => mainNav.classList.toggle('open'));
  mainNav.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => mainNav.classList.remove('open'))
  );

  /* Reveal on scroll */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));

  /* Portfolio filter */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.p-item');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      items.forEach((item) => {
        const show = f === 'all' || item.dataset.cat === f;
        item.classList.toggle('hidden', !show);
      });
    });
  });

  /* FAQ accordion */
  const accItems = document.querySelectorAll('.acc-item');
  accItems.forEach((item) => {
    const head = item.querySelector('.acc-head');
    const body = item.querySelector('.acc-body');
    head.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      accItems.forEach((i) => {
        i.classList.remove('open');
        i.querySelector('.acc-body').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
  /* Open the first FAQ by default */
  if (accItems.length) accItems[0].querySelector('.acc-head').click();

  /* Booking form (front-end only) */
  const form = document.getElementById('bookingForm');
  const note = document.getElementById('formNote');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    note.textContent = name
      ? `Thank you, ${name} — your request has been received. I'll reply within 24 hours.`
      : 'Your request has been received. I\'ll reply within 24 hours.';
    form.reset();
  });

  /* Footer year */
  // (static 2026 in markup; update here if needed)
})();
