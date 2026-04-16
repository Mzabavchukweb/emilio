/* ═══════════════════════════════════════════════════
   EMILIO RESTAURACJA — Interactive Logic
   ═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar ── */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 50);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ── */
  const burger = document.getElementById('burger');
  const menu = document.getElementById('navMenu');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    menu.classList.toggle('is-open');
    document.body.style.overflow = menu.classList.contains('is-open') ? 'hidden' : '';
  });
  menu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      menu.classList.remove('is-open');
      document.body.style.overflow = '';
    })
  );

  /* ── Tabs ── */
  const btns = document.querySelectorAll('.tabs__btn');
  const panels = document.querySelectorAll('.tabs__panel');
  btns.forEach(b => b.addEventListener('click', () => {
    btns.forEach(x => x.classList.remove('is-active'));
    panels.forEach(x => x.classList.remove('is-active'));
    b.classList.add('is-active');
    document.getElementById(b.dataset.tab).classList.add('is-active');
  }));

  /* ── Scroll-reveal ── */
  const els = document.querySelectorAll(
    '.sec__head, .about, .menu-split, .gal, .split, .banner__body, .rez, .foot__top'
  );
  els.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px' });
  els.forEach(el => io.observe(el));

  /* ── Smooth scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) {
        const off = nav.offsetHeight + 16;
        scrollTo({ top: t.getBoundingClientRect().top + scrollY - off, behavior: 'smooth' });
      }
    });
  });

  /* ── Hero parallax ── */
  const heroImg = document.querySelector('.hero__media img');
  if (heroImg) {
    addEventListener('scroll', () => {
      if (scrollY < innerHeight) {
        heroImg.style.transform = `scale(${1.02 + scrollY * .0003}) translateY(${scrollY * .12}px)`;
      }
    }, { passive: true });
  }

  /* ── Gallery lightbox ── */
  document.querySelectorAll('.gal__item').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img')?.src;
      if (!src) return;
      const lb = document.createElement('div');
      lb.className = 'lightbox';
      lb.innerHTML = `<img src="${src}" alt="">`;
      lb.addEventListener('click', () => {
        lb.style.opacity = '0';
        lb.style.transition = 'opacity .25s';
        setTimeout(() => lb.remove(), 250);
      });
      document.body.appendChild(lb);
    });
  });

  /* ── Form ── */
  const form = document.getElementById('rezForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const d = new FormData(form);
      const subj = `Rezerwacja – ${d.get('name')} – ${d.get('date')}`;
      const body = `Imię: ${d.get('name')}\nData: ${d.get('date')}\nGodzina: ${d.get('time')}\nGoście: ${d.get('guests')}\nTelefon: ${d.get('phone')}\n${d.get('msg') ? 'Uwagi: ' + d.get('msg') : ''}`;
      location.href = `mailto:restauracjaemilio@gmail.com?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
    });
  }
});
