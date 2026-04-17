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
    const btn = form.querySelector('button[type="submit"]');
    const origBtnText = btn ? btn.textContent : '';
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (btn) { btn.disabled = true; btn.textContent = 'Wysyłam…'; }
      try {
        const res = await fetch('https://formsubmit.co/ajax/restauracjaemilio@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form)))
        });
        const data = await res.json();
        if (data.success === 'true' || data.success === true) {
          form.innerHTML = '<div style="text-align:center;padding:32px 16px"><h3 style="margin:0 0 8px">Dziękujemy!</h3><p style="margin:0;opacity:.8">Wiadomość wysłana. Skontaktujemy się wkrótce.</p></div>';
        } else {
          throw new Error(data.message || 'Błąd wysyłki');
        }
      } catch (err) {
        if (btn) { btn.disabled = false; btn.textContent = origBtnText; }
        alert('Nie udało się wysłać. Zadzwoń: 508 224 177 lub napisz na restauracjaemilio@gmail.com');
      }
    });
  }
});
