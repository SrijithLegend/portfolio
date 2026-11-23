// split hero name into letters for the staggered rise
let n = 0;
document.querySelectorAll('.name span').forEach(span => {
  span.innerHTML = [...span.textContent].map(ch => `<i style="--i:${n++}">${ch}</i>`).join('');
});
