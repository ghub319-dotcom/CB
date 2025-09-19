document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      showToast('Fill all fields');
      return;
    }

    const fb = storage.load('feedback') || [];
    fb.push({ name, email, message, date: new Date().toISOString() });
    storage.save('feedback', fb);

    showToast('Thank you — feedback saved locally');
    form.reset();
  });
});
