/* ---------- Small reusable "components" ---------- */
const el = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ProjectCard: builds one card from an entry in projects.js */
function ProjectCard(p) {
  const link = (url, label) => url && !p.soon
    ? `<a class="btn ghost" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`
    : `<span class="btn ghost" aria-disabled="true">${label}</span>`;
  const thumb = p.image
    ? `<img class="thumb" src="${esc(p.image)}" alt="Screenshot of ${esc(p.title)}" width="640" height="360" loading="lazy">`
    : `<div class="thumb" style="--h:${p.hue || 255}" role="img" aria-label="${esc(p.title)} thumbnail placeholder"></div>`;
  return el(`<article class="card">
    <div style="position:relative">${thumb}${p.soon ? '<span class="soon">Coming soon</span>' : ''}</div>
    <div class="body"><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p>
    <ul class="tags">${p.tags.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
    <div class="actions">${link(p.live, 'Live Demo')}${link(p.github, 'GitHub')}</div></div></article>`);
}

/* ---------- Theme (remembered in localStorage) ---------- */
const root = document.documentElement, themeBtn = document.getElementById('theme');
function paintTheme() {
  const dark = root.dataset.theme === 'dark';
  themeBtn.textContent = dark ? '☀' : '☾';
  themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
}
themeBtn.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  paintTheme();
});
paintTheme();

/* ---------- Mobile menu ---------- */
const burger = document.getElementById('burger'), menu = document.getElementById('menu');
const setMenu = (open) => { menu.classList.toggle('open', open); burger.setAttribute('aria-expanded', open); };
burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.addEventListener('click', e => { if (e.target.tagName === 'A') setMenu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

/* ---------- Skills ---------- */
document.getElementById('skill-groups').append(...Object.entries(SKILLS).map(([group, items]) =>
  el(`<div><h3>${esc(group)}</h3><div class="badges">${items.map(i => `<span class="badge">${esc(i)}</span>`).join('')}</div></div>`)));

/* ---------- Projects + filter ---------- */
const grid = document.getElementById('grid'), filters = document.getElementById('filters');
function showProjects(cat) {
  grid.replaceChildren(...PROJECTS.filter(p => cat === 'All' || p.category === cat).map(ProjectCard));
  filters.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', c.dataset.cat === cat));
}
['All', ...new Set(PROJECTS.map(p => p.category))].forEach(cat => {
  const b = el(`<button class="chip" type="button" data-cat="${esc(cat)}">${esc(cat)}</button>`);
  b.addEventListener('click', () => showProjects(cat));
  filters.append(b);
});
showProjects('All');

/* ---------- Fade-in on scroll ---------- */
const sections = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  root.classList.add('js');
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .1 });
  sections.forEach(s => io.observe(s));
}

/* ---------- Contact form (Formspree) with validation ---------- */
const form = document.getElementById('form'), statusEl = document.getElementById('status');
function check(f) {
  const v = f.value.trim(); let msg = '';
  if (!v) msg = 'This field is required.';
  else if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) msg = 'Enter a valid email address, like name@example.com.';
  else if (f.name === 'message' && v.length < 10) msg = 'Write at least 10 characters.';
  document.getElementById(f.id + '-err').textContent = msg;
  f.setAttribute('aria-invalid', !!msg);
  return !msg;
}
const fields = [...form.querySelectorAll('#name,#email,#message')];
fields.forEach(f => f.addEventListener('blur', () => check(f)));
form.addEventListener('submit', async e => {
  e.preventDefault();
  if (!fields.map(check).every(Boolean)) return form.querySelector('[aria-invalid=true]').focus();
  if (form.action.includes('YOUR_FORM_ID')) { statusEl.textContent = 'Form not connected yet. Add your Formspree ID in index.html.'; return; }
  statusEl.textContent = 'Sending...';
  try {
    const r = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (!r.ok) throw new Error();
    form.reset(); statusEl.textContent = 'Message sent. Thank you, I will reply soon.';
  } catch { statusEl.textContent = 'Could not send. Please email me directly instead.'; }
});

document.getElementById('year').textContent = new Date().getFullYear();
