/* ===================================================
   script.js — Hand-Drawn Portfolio interactions
   =================================================== */

// ── Mobile menu burger ──────────────────────────────
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  // animate burger to X
  const spans = burger.querySelectorAll('span');
  burger.classList.toggle('active');
  if (burger.classList.contains('active')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.classList.remove('active');
    burger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity   = '';
    });
  });
});


// ── Scroll-reveal (Intersection Observer) ───────────
const revealElements = document.querySelectorAll(
  '.fact-card, .skill-group, .project-card, .contact-link, .contact-form'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

// Add initial hidden state via JS (not CSS so no-JS users see content)
revealElements.forEach((el, i) => {
  el.style.opacity   = '0';
  el.style.transform = el.style.transform
    ? el.style.transform + ' translateY(20px)'
    : 'translateY(20px)';
  el.style.transition = `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s, box-shadow 0.1s`;
  revealObserver.observe(el);
});

document.addEventListener('animationend', () => {}, { once: true });

// When revealed, restore transform (keep rotation if any was set inline)
const style = document.createElement('style');
style.textContent = `
  .revealed {
    opacity: 1 !important;
  }
`;
document.head.appendChild(style);

// Patch: we need to reset translateY when revealed but keep inline rotate.
// Override with a smarter approach.
revealObserver.disconnect();

const revealObserver2 = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.opacity   = '1';
        // Remove the translateY we added but keep any rotation
        const currentTransform = el.style.transform;
        el.style.transform = currentTransform.replace(/\s*translateY\([^)]+\)/, '').trim();
        revealObserver2.unobserve(el);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach(el => revealObserver2.observe(el));


// ── Skill pills — random wobble on load ──────────────
const pills = document.querySelectorAll('.skill-pill');
pills.forEach(pill => {
  const deg = (Math.random() * 4 - 2).toFixed(1);
  pill.style.transform = `rotate(${deg}deg)`;
  pill.addEventListener('mouseenter', () => {
    pill.style.transform = `rotate(${-deg}deg) scale(1.05)`;
  });
  pill.addEventListener('mouseleave', () => {
    pill.style.transform = `rotate(${deg}deg)`;
  });
});


// ── EmailJS config — preencha com suas credenciais ───
const EMAILJS_PUBLIC_KEY  = 'OQBTwTC7MOVXfoSy8';
const EMAILJS_SERVICE_ID  = 'service_cc4bt7t';
const EMAILJS_TEMPLATE_ID = 'template_gbaukn6';

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

// ── Contact form ──────────────────────────────────────
const contactForm = document.getElementById('contactForm');
const feedback    = document.getElementById('formFeedback');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name    = contactForm.name.value.trim();
  const email   = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    feedback.textContent = 'preenche todos os campos!';
    feedback.className   = 'form__feedback error';
    return;
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    feedback.textContent = 'email parece inválido...';
    feedback.className   = 'form__feedback error';
    return;
  }

  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'enviando...';
  btn.disabled    = true;

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name:  name,
    from_email: email,
    message:    message,
  })
  .then(() => {
    feedback.textContent = `Mensagem recebida, ${name.split(' ')[0]}! Respondo em breve.`;
    feedback.className   = 'form__feedback success';
    contactForm.reset();
  })
  .catch((err) => {
    console.error('EmailJS error:', err);
    feedback.textContent = `Erro: ${err?.status} — ${err?.text}`;
    feedback.className   = 'form__feedback error';
  })
  .finally(() => {
    btn.textContent = 'enviar mensagem';
    btn.disabled    = false;
  });
});


// ── Cursor sparkle effect (subtle, hand-drawn feel) ──
const canvas = document.createElement('canvas');
canvas.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  pointer-events: none;
  z-index: 9999;
  width: 100%;
  height: 100%;
`;
document.body.appendChild(canvas);

const ctx     = canvas.getContext('2d');
let particles = [];
let mx = -999, my = -999;

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

window.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
  // Emit a particle occasionally
  if (Math.random() < 0.25) {
    particles.push({
      x:    mx, y: my,
      vx:   (Math.random() - 0.5) * 2,
      vy:   (Math.random() - 0.5) * 2 - 1,
      life: 1,
      size: Math.random() * 4 + 2,
      color: Math.random() < 0.5 ? '#ff4d4d' : '#2d5da1',
    });
  }
});

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter(p => p.life > 0.02);

  particles.forEach(p => {
    p.x    += p.vx;
    p.y    += p.vy;
    p.vy   += 0.05; // gravity
    p.life -= 0.03;

    ctx.save();
    ctx.globalAlpha = p.life;
    ctx.fillStyle   = p.color;
    ctx.beginPath();
    // Draw a small cross / star
    ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  requestAnimationFrame(animateParticles);
}
animateParticles();


// ── Active nav highlight on scroll ──────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__links a, .nav__mobile a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--accent)'
            : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));
