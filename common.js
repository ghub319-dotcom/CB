// common.js - reusable helpers
function $q(sel, root=document) { return root.querySelector(sel); }
function $qa(sel, root=document) { return [...root.querySelectorAll(sel)]; }
function showToast(msg, time=2500){
  let t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style,{position:'fixed',right:'16px',bottom:'16px',background:'#111',color:'#fff',padding:'10px 14px',borderRadius:'10px',zIndex:9999,opacity:0,transition:'opacity .2s'});
  document.body.appendChild(t);
  requestAnimationFrame(()=>t.style.opacity=1);
  setTimeout(()=>{t.style.opacity=0; setTimeout(()=>t.remove(),220)}, time);
}
const storage = {
  save(key,obj){localStorage.setItem(key, JSON.stringify(obj));},
  load(key){try{return JSON.parse(localStorage.getItem(key));}catch(e){return null}}
};
