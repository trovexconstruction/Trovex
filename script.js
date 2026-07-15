const body=document.body;
const menu=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav-links');
const langBtn=document.querySelector('.lang-btn');
const progress=document.querySelector('.scroll-progress');
const topBtn=document.querySelector('.back-top');
const lightbox=document.querySelector('.lightbox');

menu.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

let language=localStorage.getItem('trovex-language')||'ar';
function setLanguage(lang){
  language=lang;
  localStorage.setItem('trovex-language',lang);
  const en=lang==='en';
  document.documentElement.lang=en?'en':'ar';
  document.documentElement.dir=en?'ltr':'rtl';
  body.classList.toggle('en',en);
  document.querySelectorAll('[data-ar][data-en]').forEach(el=>{
    el.innerHTML=en?el.dataset.en:el.dataset.ar;
  });
  langBtn.textContent=en?'AR':'EN';
}
setLanguage(language);
langBtn.addEventListener('click',()=>setLanguage(language==='ar'?'en':'ar'));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

window.addEventListener('scroll',()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(max?scrollY/max*100:0)+'%';
  topBtn.classList.toggle('show',scrollY>650);
});
topBtn.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

document.querySelectorAll('.project-card img').forEach(img=>{
  img.addEventListener('click',()=>{
    lightbox.querySelector('img').src=img.src;
    lightbox.classList.add('open');
  });
});
lightbox.querySelector('button').addEventListener('click',()=>lightbox.classList.remove('open'));
lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.classList.remove('open')});

document.getElementById('quoteForm').addEventListener('submit',e=>{
  e.preventDefault();
  const en=language==='en';
  const name=document.getElementById('name').value.trim();
  const company=document.getElementById('company').value.trim();
  const phone=document.getElementById('phone').value.trim();
  const type=document.getElementById('requestType').value;
  const details=document.getElementById('details').value.trim();
  const message=en
    ?`Hello TROVEX,%0AName: ${encodeURIComponent(name)}%0ACompany/Entity: ${encodeURIComponent(company)}%0APhone: ${encodeURIComponent(phone)}%0ARequest type: ${encodeURIComponent(type)}%0ADetails: ${encodeURIComponent(details)}`
    :`مرحبًا تروفكس،%0Aالاسم: ${encodeURIComponent(name)}%0Aالشركة / الجهة: ${encodeURIComponent(company)}%0Aرقم الهاتف: ${encodeURIComponent(phone)}%0Aنوع الطلب: ${encodeURIComponent(type)}%0Aالتفاصيل: ${encodeURIComponent(details)}`;
  window.open(`https://wa.me/201008877499?text=${message}`,'_blank','noopener');
});

document.getElementById('year').textContent=new Date().getFullYear();
