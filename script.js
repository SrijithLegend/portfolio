// split hero name into letters for the staggered rise
let n = 0;
document.querySelectorAll('.name span').forEach(span => {
  span.innerHTML = [...span.textContent].map(ch => `<i style="--i:${n++}">${ch}</i>`).join('');
});

// scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ghost watermark drifts sideways with scroll
const ghosts = document.querySelectorAll('.ghost');
addEventListener('scroll', () => ghosts.forEach(g => {
  const r = g.parentElement.getBoundingClientRect();
  g.style.setProperty('--shift', `${(r.top / innerHeight) * 120}px`);
}), { passive: true });

// experience hover card that follows the cursor
const peek = document.querySelector('.xp-peek');
document.querySelectorAll('.xp-row').forEach(row => {
  row.addEventListener('mouseenter', () => {
    peek.querySelector('b').textContent = row.dataset.metric;
    peek.querySelector('small').textContent = row.dataset.label;
    peek.classList.add('on');
  });
  row.addEventListener('mouseleave', () => peek.classList.remove('on'));
  row.addEventListener('mousemove', e => { peek.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 70}px)`; });
});

// work filters
document.querySelectorAll('.filters button').forEach(b => b.addEventListener('click', () => {
  document.querySelector('.filters .on').classList.remove('on');
  b.classList.add('on');
  document.querySelectorAll('.card').forEach(c => c.classList.toggle('hide', b.dataset.f !== 'all' && c.dataset.cat !== b.dataset.f));
}));
