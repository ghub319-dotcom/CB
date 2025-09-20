// common.js - reusable helpers used across pages

// reusable: animate number from 0 to value inside element
function animateNumber(el, value, duration=800) {
  const start = 0;
  const range = value - start;
  const startTime = performance.now();
  function step(now){
    const progress = Math.min(1, (now - startTime) / duration);
    el.textContent = Math.round(start + range * progress);
    if(progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// date-based tip (used on home page)
function getDailyTip() {
  const tips = [
    "Add an extra serving of greens today.",
    "Take a 15-minute walk after lunch.",
    "Swap one sugary drink for water.",
    "Try 10 minutes of mindful breathing.",
    "Choose whole grains over refined ones.",
    "Add a protein-rich snack.",
    "Stretch for 5 minutes between tasks."
  ];
  const idx = new Date().getDate() % tips.length;
  return tips[idx];
}

// newsletter: store email in localStorage
function subscribeNewsletter(email) {
  if(!email || !email.includes('@')) return false;
  const list = JSON.parse(localStorage.getItem('greenbite_news') || '[]');
  if(!list.includes(email)) list.push(email);
  localStorage.setItem('greenbite_news', JSON.stringify(list));
  return true;
}

// small convenience: fetch JSON data stored in a JS file that exposes variable
// (In this project we attach the data to window.RECIPES or window.WORKOUTS)
