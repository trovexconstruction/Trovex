const body=document.body;
const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('.main-nav');
const langBtn=document.querySelector('.lang-btn');
const progress=document.querySelector('.page-progress');
const topBtn=document.querySelector('.to-top');

menuBtn?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded',String(open));
});
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

let currentLang=localStorage.getItem('trovexLang')||'ar';
function applyLanguage(lang){
  currentLang=lang;
  localStorage.setItem('trovexLang',lang);
  const isEn=lang==='en';
  document.documentElement.lang=isEn?'en':'ar';
  document.documentElement.dir=isEn?'ltr':'rtl';
  body.classList.toggle('en',isEn);
  document.querySelectorAll('[data-ar][data-en]').forEach(el=>{
    el.innerHTML=isEn?el.dataset.en:el.dataset.ar;
  });
  langBtn.textContent=isEn?'AR':'EN';
}
applyLanguage(currentLang);
langBtn?.addEventListener('click',()=>applyLanguage(currentLang==='ar'?'en':'ar'));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const counterObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const el=entry.target;
    const target=Number(el.dataset.target||0);
    let value=0;
    const step=Math.max(1,Math.ceil(target/35));
    const timer=setInterval(()=>{
      value=Math.min(target,value+step);
      el.textContent=value;
      if(value>=target)clearInterval(timer);
    },30);
    counterObserver.unobserve(el);
  });
},{threshold:.7});
document.querySelectorAll('.counter').forEach(el=>counterObserver.observe(el));

window.addEventListener('scroll',()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(max?scrollY/max*100:0)+'%';
  topBtn.classList.toggle('show',scrollY>600);
});
topBtn?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

document.getElementById('quoteForm')?.addEventListener('submit',e=>{
  e.preventDefault();
  const isEn=currentLang==='en';
  const name=document.getElementById('name').value.trim();
  const company=document.getElementById('company').value.trim();
  const phone=document.getElementById('phone').value.trim();
  const type=document.getElementById('type').value;
  const details=document.getElementById('details').value.trim();
  const message=isEn
    ?`Hello TROVEX,%0AName: ${encodeURIComponent(name)}%0ACompany/Entity: ${encodeURIComponent(company)}%0APhone: ${encodeURIComponent(phone)}%0ARequest type: ${encodeURIComponent(type)}%0ADetails: ${encodeURIComponent(details)}`
    :`مرحبًا TROVEX،%0Aالاسم: ${encodeURIComponent(name)}%0Aالشركة / الجهة: ${encodeURIComponent(company)}%0Aرقم الهاتف: ${encodeURIComponent(phone)}%0Aنوع الطلب: ${encodeURIComponent(type)}%0Aالتفاصيل: ${encodeURIComponent(details)}`;
  window.open(`https://wa.me/201008877499?text=${message}`,'_blank','noopener');
});

document.getElementById('year').textContent=new Date().getFullYear();
