const menuButton = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '✕' : '☰';
});
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded','false');
  menuButton.textContent = '☰';
}));

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const form = document.getElementById('contactForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();
  const text = `السلام عليكم، أريد طلب عرض سعر من Trovex.%0A%0Aالاسم: ${encodeURIComponent(name)}%0Aرقم الهاتف: ${encodeURIComponent(phone)}%0Aالخدمة: ${encodeURIComponent(service)}%0Aالتفاصيل: ${encodeURIComponent(message)}`;
  window.open(`https://wa.me/201008877499?text=${text}`, '_blank', 'noopener');
});
