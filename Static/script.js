// NAVBAR SCROLL
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>navbar.classList.toggle('scrolled',window.scrollY>40));

// MOBILE NAV
const ham=document.getElementById('hamburger');
const mob=document.getElementById('mobileNav');
ham.addEventListener('click',()=>{
  ham.classList.toggle('active');mob.classList.toggle('open');
  document.body.style.overflow=mob.classList.contains('open')?'hidden':'';
});
mob.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  ham.classList.remove('active');mob.classList.remove('open');document.body.style.overflow='';
}));

// SCROLL REVEAL
const obs=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      e.target.style.transitionDelay=`${(i%4)*0.07}s`;
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
},{threshold:0.08});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// FAQ
document.querySelectorAll('.faq-q').forEach(q=>{
  q.addEventListener('click',()=>{
    const item=q.parentElement;
    const open=item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
    if(!open)item.classList.add('open');
  });
});

// TESTIMONIALS 3D CAROUSEL
let currentIdx=0,autoT;
const track=document.getElementById('testiTrack');
function rotateTo(idx){
  currentIdx=idx;
  if(track){
    track.style.cssText=`transform:rotateY(${-idx*120}deg);transition:transform 0.8s cubic-bezier(0.4,0,0.2,1);animation:none;`;
  }
  document.querySelectorAll('.testi-dot').forEach((d,i)=>d.classList.toggle('active',i===idx));
}
if(track){
  autoT=setInterval(()=>{currentIdx=(currentIdx+1)%3;rotateTo(currentIdx);},4000);
  track.addEventListener('mouseenter',()=>clearInterval(autoT));
  track.addEventListener('mouseleave',()=>{autoT=setInterval(()=>{currentIdx=(currentIdx+1)%3;rotateTo(currentIdx);},4000);});
}

// HERO SVG INTERACTIVE - mouse parallax on circuit paths
const heroSvg=document.querySelector('.hero-svg-bg');
if(heroSvg){
  document.querySelector('.hero').addEventListener('mousemove',(e)=>{
    const rect=e.currentTarget.getBoundingClientRect();
    const x=(e.clientX-rect.left)/rect.width;
    const y=(e.clientY-rect.top)/rect.height;
    const dx=(x-0.5)*12;
    const dy=(y-0.5)*8;
    heroSvg.style.transform=`translate(${dx}px,${dy}px)`;
    heroSvg.style.transition='transform 0.8s ease-out';
  });
  document.querySelector('.hero').addEventListener('mouseleave',()=>{
    heroSvg.style.transform='translate(0,0)';
    heroSvg.style.transition='transform 1.2s ease-out';
  });
}

// COUNTER ANIMATION
const counterObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const el=e.target;
      const match=el.textContent.match(/[\d.]+/);
      if(match){
        const target=parseFloat(match[0]);
        const isFloat=target%1!==0;
        const suffix=el.innerHTML.replace(/[\d.]+/,'');
        let start=performance.now();
        const dur=1800;
        const update=now=>{
          const p=Math.min((now-start)/dur,1);
          const ease=1-Math.pow(1-p,3);
          const val=isFloat?(ease*target).toFixed(1):Math.floor(ease*target);
          el.innerHTML=val+suffix;
          if(p<1)requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
      }
      counterObs.unobserve(el);
    }
  });
},{threshold:0.5});
document.querySelectorAll('.stat-n,.sc-value,.qb-num').forEach(el=>counterObs.observe(el));


