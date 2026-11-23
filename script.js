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

// ===== JARVIS console =====
const out = document.getElementById('term-out');
const input = document.getElementById('term-cmd');
const link = (href, text) => `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;
const gh = n => link(`https://github.com/SrijithLegend/${n}`, n);

const cmds = {
  help: () => `Available protocols:
  about       pilot dossier
  skills      loaded systems
  experience  missions log
  projects    armory inventory
  contact     open comms
  github      launch GitHub
  linkedin    launch LinkedIn
  suit up     you know what this does
  clear       wipe the display`,
  about: () => `Srijith S, 19, Chennai. B.Tech CSBS @ Chennai Institute of Technology (2025-2029).
AI Intern @ Emerson Electric (Fisher). Builds production-grade AI systems that are measured, not guessed.`,
  skills: () => `AI/ML  : PyTorch, TensorFlow, Scikit-Learn, OpenCV, NLP, Multimodal LLMs, INT8 Quantization
Stack  : Python, Java, TypeScript, SQL, FastAPI, LangChain, LangGraph, ChromaDB, Docker, GitHub Actions`,
  experience: () => `[NOV 2026 - NOW] AI Intern, Emerson Electric (Fisher): datasheet-to-Excel pipeline, 91.3% value accuracy
[MAY 2026]       ML Intern, RealTekh: LMS question bank, 87% classifier accuracy, 80%+ less manual tagging`,
  projects: () => `MK-01 ${gh('Quantum-Fund-v2')}        XGBoost quant trading engine
MK-02 ${gh('Self-Improving-Agent')}   prompts that only get better
MK-03 ${link('https://game-theory.tech/', 'Gametheory AI')}          multi-agent strategy sim (30+ users)
MK-04 ${link('https://srijithlegend.github.io/OMEN/', 'OMEN')}                   GPU fit & benchmarking
MK-05 ${gh('LLM-from-Scratch')}       GPT from first principles
...scroll to The Armory for the full inventory.`,
  contact: () => `Email    : ${link('mailto:srijithshaibu@gmail.com', 'srijithshaibu@gmail.com')}
GitHub   : ${link('https://github.com/SrijithLegend', 'github.com/SrijithLegend')}
LinkedIn : ${link('https://www.linkedin.com/in/srijith-shaibu/', 'linkedin.com/in/srijith-shaibu')}`,
  github: () => (open('https://github.com/SrijithLegend', '_blank'), 'Opening GitHub, sir.'),
  linkedin: () => (open('https://www.linkedin.com/in/srijith-shaibu/', '_blank'), 'Opening LinkedIn, sir.'),
  'suit up': () => {
    document.body.classList.remove('suited'); void document.body.offsetWidth;
    document.body.classList.add('suited');
    return 'Deploying Mark-19... all systems green. Try not to break this one, sir.';
  },
  hello: () => 'Good day, sir. How may I assist?',
  'who are you': () => 'Just A Rather Very Intelligent System. At your service.',
  sudo: () => 'Nice try. Access level insufficient.'
};
cmds.hi = cmds.hey = cmds.hello;

function print(html, cls = 'j') {
  out.insertAdjacentHTML('beforeend', `<div class="${cls}">${html}</div>`);
  out.scrollTop = out.scrollHeight;
}
function run(raw) {
  const cmd = raw.trim().toLowerCase().replace(/^(hey |ok )?jarvis[, ]*/, '');
  if (!raw.trim()) return;
  print(`&gt; ${raw.replace(/</g, '&lt;')}`, 'u');
  if (cmd === 'clear') return (out.innerHTML = '');
  const fn = cmds[cmd];
  print(fn ? fn() : `Protocol "${cmd.replace(/</g, '&lt;')}" not recognised. Type 'help'.`, fn ? 'j' : 'e');
}
print("JARVIS online. Type 'help' for available protocols.");
document.getElementById('term-form').addEventListener('submit', e => {
  e.preventDefault(); run(input.value); input.value = '';
});
document.querySelectorAll('.quick button').forEach(b => b.addEventListener('click', () => run(b.dataset.cmd)));
