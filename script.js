// ===== boot sequence =====
const boot = document.getElementById('boot');
const bootLines = [
  'J.A.R.V.I.S. v4.2 // STARK-OS KERNEL',
  'Initializing neural interface ........ <span class="ok">OK</span>',
  'Calibrating repulsor arrays ........... <span class="ok">OK</span>',
  'Arc reactor output .................... <span class="ok">3 GJ/s</span>',
  'Loading pilot profile: SRIJITH S ...... <span class="ok">VERIFIED</span>',
  'Welcome back, sir.'
];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduced || sessionStorage.getItem('booted')) {
  boot.classList.add('done');
} else {
  const log = document.getElementById('boot-log');
  bootLines.forEach((l, i) => setTimeout(() => (log.innerHTML += l + '\n'), 260 * i));
  setTimeout(() => boot.classList.add('done'), 260 * bootLines.length + 500);
  boot.addEventListener('click', () => boot.classList.add('done'));
  try { sessionStorage.setItem('booted', 1); } catch {}
}

// ===== typed role =====
const roles = ['AI / ML Engineer', 'Multimodal LLM Builder', 'Quant Systems Developer', 'Agent Architect'];
const typed = document.getElementById('typed');
let r = 0, c = 0, del = false;
(function type() {
  const word = roles[r];
  typed.textContent = word.slice(0, c += del ? -1 : 1);
  if (!del && c === word.length) { del = true; return setTimeout(type, 1600); }
  if (del && c === 0) { del = false; r = (r + 1) % roles.length; }
  setTimeout(type, del ? 40 : 80);
})();

// ===== counters =====
document.querySelectorAll('[data-count]').forEach(el => {
  const end = +el.dataset.count, dec = +(el.dataset.dec || 0);
  let t0;
  const step = ts => {
    t0 ??= ts;
    const p = Math.min((ts - t0) / 1400, 1);
    el.textContent = (end * p).toFixed(dec);
    if (p < 1) requestAnimationFrame(step);
  };
  setTimeout(() => requestAnimationFrame(step), reduced ? 0 : 1900);
});

// ===== scroll reveal =====
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
