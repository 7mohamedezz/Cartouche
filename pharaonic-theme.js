/* =====================================================================
   pharaonic-theme.js
   Purely decorative. Builds the background layers, dividers, frieze,
   logo icon and scroll-reveal for pharaonic-theme.css.
   Touches no application state, routes or data.
   ===================================================================== */
(() => {
  'use strict';
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = innerWidth < 700;

  /* Theme is always Pharaonic. */
  root.classList.add('ph');

  const EYE = '\u{13080}', ANKH = '\u{132F9}', SCARAB = '\u{131A3}', SUN = '\u{131F3}', OWL = '\u{13153}';
  const ROW = [EYE, ANKH, SCARAB, SUN, OWL];
  const WALL = [0x13080,0x132F9,0x131A3,0x131F3,0x13153,0x1313F,0x130C0,0x133A1,0x130A7,0x131CB,0x13191,0x13254,
                0x13193,0x130ED,0x13216,0x13171,0x132AA,0x1320E,0x1308B,0x132F4,0x133CF,0x13283,0x133BC,0x131CC];

  const make = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    e.setAttribute('aria-hidden', 'true');
    return e;
  };
  /* tiny seeded RNG so the wall never changes between loads */
  let seed = 20261013;
  const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;

  /* ---------- 1. background: wall, sun, dunes, sand ---------- */
  const wall = make('div', 'ph-wall');
  const cols = make('div', 'ph-wall-cols');
  for (let c = 0; c < 18; c++) {
    const col = make('div', 'ph-wall-col');
    let t = '';
    for (let i = 0; i < 26; i++) t += String.fromCodePoint(WALL[Math.floor(rnd() * WALL.length)]) + '\n';
    col.textContent = t;
    col.style.marginTop = (-Math.floor(rnd() * 120)) + 'px';
    cols.appendChild(col);
  }
  wall.appendChild(cols);

  const sun = make('div', 'ph-sun');
  const dunes = make('div', 'ph-dunes',
    '<svg class="b" viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax slice" focusable="false">' +
      '<polygon points="960,360 1120,140 1280,360" fill="#2d2116"/><polygon points="1120,140 1280,360 1120,360" fill="#47331f"/>' +
      '<polygon points="1200,360 1290,235 1380,360" fill="#241a11"/><polygon points="1290,235 1380,360 1290,360" fill="#3a2a19"/>' +
      '<polygon points="820,360 900,255 980,360" fill="#271c12"/>' +
      '<path d="M0 360V300Q240 252 480 300T960 292T1440 282V360Z" fill="#241a11"/></svg>' +
    '<svg class="f" viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax slice" focusable="false">' +
      '<path d="M0 360V322Q200 282 420 322T860 312T1200 328T1440 304V360Z" fill="#150f0a"/></svg>');

  const sand = make('div', 'ph-sand');
  if (!reduce) {
    const n = small ? 8 : 16;
    for (let i = 0; i < n; i++) {
      const p = document.createElement('i');
      p.style.cssText = `--x:${(rnd() * 100).toFixed(1)}%;--s:${(2 + rnd() * 3).toFixed(1)}px;` +
        `--t:${(16 + rnd() * 18).toFixed(1)}s;--dl:${(-rnd() * 30).toFixed(1)}s;--dx:${Math.round(60 + rnd() * 160)}px`;
      sand.appendChild(p);
    }
  }
  document.body.prepend(wall, sun, dunes, sand);

  /* parallax on the dune layers (transform only, rAF-throttled) */
  if (!reduce) {
    let tick = false;
    addEventListener('scroll', () => {
      if (tick) return; tick = true;
      requestAnimationFrame(() => { dunes.style.setProperty('--py', scrollY); tick = false; });
    }, { passive: true });
  }

  /* ---------- 2. logo: Eye of Horus ---------- */
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.insertAdjacentElement('afterbegin', make('span', 'ph-logo-ic',
      '<svg viewBox="0 0 64 40" focusable="false">' +
      '<path d="M6 11Q30 -1 58 9"/><path d="M4 24Q28 8 52 22Q40 31 28 31Q14 31 4 24Z"/>' +
      '<circle cx="29" cy="21" r="5.5" fill="currentColor"/><path d="M28 31V38H20"/><path d="M44 28Q55 30 55 36Q55 40 50 39"/></svg>'));
  }

  /* ---------- 3. dividers made of hieroglyphs ---------- */
  const divider = () => make('div', 'ph-div', ROW.map((g, i) => `<span style="--i:${i}">${g}</span>`).join(''));
  document.querySelectorAll('.sub').forEach(s => s.insertAdjacentElement('afterend', divider()));
  const homeSection = document.querySelector('#v-home section');
  if (homeSection) homeSection.insertAdjacentElement('beforebegin', divider());

  /* hero: glyphs carve in one by one */
  const copy = document.querySelector('.hero .copy');
  if (copy) copy.insertAdjacentElement('afterbegin',
    make('div', 'ph-hero-glyphs', ROW.map((g, i) => `<span style="--i:${i}">${g}</span>`).join('')));

  /* ---------- 4. footer frieze ---------- */
  const foot = document.getElementById('foot');
  if (foot) {
    foot.insertAdjacentElement('afterbegin',
      make('div', 'ph-frieze', '<span>' + Array(40).fill(ROW.join('')).join('') + '</span>'));
  }

  /* ---------- 5. scroll reveal: sections unroll like papyrus ---------- */
  const targets = document.querySelectorAll('section h2, .sub, .how, .story, #dg, .ph-div');
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(t => t.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    targets.forEach(t => {
      if (!t.classList.contains('ph-div')) t.classList.add('ph-reveal');
      io.observe(t);
    });
  }
})();
