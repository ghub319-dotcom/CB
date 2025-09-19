const EXERCISES = {
  full: ['Jumping Jacks', 'Burpees', 'Mountain Climbers', 'Plank (30s)'],
  arms: ['Push-ups', 'Tricep Dips', 'Bicep Curls'],
  legs: ['Squats', 'Lunges', 'Calf Raises']
};

document.getElementById('gen').addEventListener('click', () => {
  const bp = document.getElementById('bodypart').value;
  const eq = document.getElementById('equipment').value; // future use
  const pool = EXERCISES[bp] || EXERCISES.full;
  const plan = [];

  for (let i = 0; i < 4; i++) {
    plan.push(pool[Math.floor(Math.random() * pool.length)]);
  }

  const html = plan.map((ex, i) => `
    <div class="card" style="margin-top:.4rem">
      <strong>${ex}</strong>
      <div style="margin-top:.4rem">
        Time: <span id="t_${i}">30</span>s 
        <button onclick="startTimer(${i},30)">Start</button>
      </div>
    </div>`).join('');

  document.getElementById('plan').innerHTML = html;
});

function startTimer(i, sec) {
  const el = document.getElementById('t_' + i);
  let s = sec;
  const iv = setInterval(() => {
    s--;
    el.textContent = s;
    if (s <= 0) {
      clearInterval(iv);
      el.textContent = 'Done';
      playBeep();
    }
  }, 1000);
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    o.connect(ctx.destination);
    o.start();
    setTimeout(() => o.stop(), 120);
  } catch (e) {}
}
