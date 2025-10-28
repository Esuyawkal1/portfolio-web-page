document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('year').textContent = new Date().getFullYear();
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
    });
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });
  
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  if (window.emailjs) {
    try {
      emailjs.init('-v4s8Z6mH_IkCAfs8');
    } catch (err) {
      console.warn('emailjs init warning', err);
    }
  } else {
    console.warn('EmailJS library is not loaded.');
  }
  
  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      alert('Please fill all fields before sending.');
      return;
    }
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      to_email: 'esuyawkal.fentahun@gmail.com'
    };
        if (window.emailjs) {
      emailjs.send('service_1954cpz', 'template_4a9dc9b', templateParams)
        .then(function(response) {
          form.reset();
          alert('message submitted');
        }, function(error) {
          console.error('FAILED...', error);
          alert('Failed to send message. Please try again later.');
        });
    } else {
      form.reset();
      alert('message submitted (EmailJS not configured locally)');
    }
  });
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navMap = new Map();
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href.startsWith('#')) {
      navMap.set(href.substring(1), a);
    }
  });
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = navMap.get(id);
      if (link) {
        if (entry.isIntersecting) {
          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });
  
  sections.forEach(s => sectionObserver.observe(s));
});