/* ===================================================
   script.js — Hand-Drawn Portfolio interactions
   =================================================== */

// ── i18n ─────────────────────────────────────────────
const translations = {
  pt: {
    'nav.sobre': 'sobre',
    'nav.experiencia': 'experiência',
    'nav.skills': 'skills',
    'nav.projetos': 'projetos',
    'nav.contato': 'contato',

    'hero.tag': 'olá, mundo!',
    'hero.desc': 'Desenvolvedor na intersecção entre tecnologia e inteligência de negócio — automação de processos, integração de dados e aplicações web que resolvem problemas reais.',
    'hero.btn_projects': 'ver projetos',
    'hero.btn_contact': 'contato',
    'hero.scroll': 'scroll',
    'hero.role': 'Desenvolvedor',
    'hero.location': 'São Paulo, SP',

    'sobre.label': '// sobre mim',
    'sobre.title': 'Quem sou eu',
    'sobre.p1': 'Desenvolvedor formado em <strong>Ciência da Computação pela Uninove</strong> (2022–2025), com experiência prática em automação de processos, integração de dados e desenvolvimento de aplicações web.',
    'sobre.p2': 'Atuo na intersecção entre tecnologia e inteligência de negócio — entregando soluções que eliminam trabalho manual e viabilizam decisões baseadas em dados. Experiência com <strong>Python</strong>, <strong>APIs RESTful</strong>, <strong>SQL</strong> e ferramentas modernas de IA.',
    'sobre.p3': 'Inglês avançado e facilidade em fazer a ponte entre times técnicos e de negócio.',
    'sobre.certs': 'certificados',
    'sobre.fact1': 'ano de experiência',
    'sobre.fact2': 'projetos entregues',
    'sobre.fact3': 'curiosidade',
    'sobre.fact4': 'São Paulo, Brasil',

    'exp.label': '// experiência',
    'exp.title': 'Onde trabalhei',
    'exp.job1_role': 'Analista de Inteligência e Tecnologia Jr.',
    'exp.job1_period': 'Jan. 2025 – Presente',
    'exp.job1_b1': '<strong>Ponte funcional entre negócio e tecnologia:</strong> levantamento de requisitos, mapeamento de processos e entrega de soluções junto aos times de Inteligência de Mercado e CX.',
    'exp.job1_b2': '<strong>Extrator Inteligente de Documentos:</strong> aplicação web com Python e Flask para upload de PDFs, extração automática de dados e importação para banco SQL Server.',
    'exp.job1_b3': '<strong>Simulador de equipamento médico:</strong> landing page interativa com FastAPI e React + TailwindCSS para simulação de capacidade de máquinas, usada como ferramenta de apoio comercial.',
    'exp.job1_b4': '<strong>Automação de rotinas operacionais:</strong> automações de documentos e e-mails com uso extensivo de LLMs (Claude, Codex e Gemini) para criação de MVPs rápidos.',
    'exp.job2_role': 'Estagiário de TI e CX',
    'exp.job2_period': 'Fev. 2025 – Dez. 2025',
    'exp.job2_b1': '<strong>Pipeline ETL via API RESTful:</strong> ingestão de dados em Python com autenticação Bearer Token, paginação, rate limiting e normalização — entregando insumos para dashboards de BI.',
    'exp.job2_b2': '<strong>Integração Smartsheet:</strong> pipeline de extração e conversão de dados para o formato Parquet via API, otimizando armazenamento e viabilizando análises estratégicas.',
    'exp.job2_b3': '<strong>Digitalização de inspeção de veículos:</strong> aplicação web com upload de imagens, formulários estruturados e assinatura eletrônica — substituindo processo 100% manual.',

    'skills.label': '// habilidades',
    'skills.title': 'O que eu uso',
    'skills.group1': 'Linguagens & Frameworks',
    'skills.group2': 'Dados & Integração',
    'skills.group3': 'IA & Ferramentas',

    'proj.label': '// projetos',
    'proj.title': 'O que eu construí',
    'proj.tag_featured': 'projeto principal',
    'proj.tag_delivered': 'entregue',
    'proj.tag_github': 'github',
    'proj.p1_title': 'Simulador de Equipamento Médico',
    'proj.p1_desc': 'Landing page interativa onde o usuário seleciona parâmetros de uso e o backend executa a simulação retornando a capacidade estimada da máquina — ferramenta de apoio comercial junto a clientes.',
    'proj.p2_title': 'Extrator Inteligente de Documentos',
    'proj.p2_desc': 'Aplicação web que realiza upload de PDFs, extrai e organiza dados automaticamente, gera Excel estruturado e importa para SQL Server — eliminando trabalho manual do time comercial.',
    'proj.p3_title': 'Pipeline ETL via API RESTful',
    'proj.p3_desc': 'Pipeline de ingestão de dados em Python com autenticação Bearer Token, paginação, rate limiting e conversão para Parquet — insumos para dashboards e KPIs de BI.',
    'proj.p4_title': 'Integração Smartsheet',
    'proj.p4_desc': 'Pipeline de extração e conversão de dados para o formato Parquet via API, otimizando armazenamento e viabilizando análises estratégicas.',
    'proj.p5_title': 'Automação de Rotinas Operacionais',
    'proj.p5_desc': 'Automações de documentos e e-mails com uso extensivo de LLMs (Claude, Codex e Gemini) para criação de MVPs rápidos e eliminação de trabalho manual.',
    'proj.p6_title': 'Projetos no GitHub',

    'contact.label': '// contato',
    'contact.title': 'Vamos conversar',
    'contact.text': 'Aberto a oportunidades, freelas e bate-papos sobre tecnologia. Me manda uma mensagem!',
    'contact.label_name': 'seu nome',
    'contact.label_email': 'seu email',
    'contact.label_msg': 'mensagem',
    'contact.btn': 'enviar mensagem',
    'contact.placeholder_name': 'João Silva',
    'contact.placeholder_email': 'joao@email.com',
    'contact.placeholder_msg': 'Oi Paulo, tenho um projeto...',

    'form.error_empty': 'preenche todos os campos!',
    'form.error_email': 'email parece inválido...',
    'form.sending': 'enviando...',
    'form.success': 'Mensagem recebida, {name}! Respondo em breve.',
    'form.btn_reset': 'enviar mensagem',

    'footer.text': 'feito em uma madrugada por Paulo Brito',
  },
  en: {
    'nav.sobre': 'about',
    'nav.experiencia': 'experience',
    'nav.skills': 'skills',
    'nav.projetos': 'projects',
    'nav.contato': 'contact',

    'hero.tag': 'hello, world!',
    'hero.desc': 'Developer at the intersection of technology and business intelligence — process automation, data integration, and web applications that solve real problems.',
    'hero.btn_projects': 'view projects',
    'hero.btn_contact': 'contact',
    'hero.scroll': 'scroll',
    'hero.role': 'Developer',
    'hero.location': 'Brazil',

    'sobre.label': '// about me',
    'sobre.title': 'Who am I',
    'sobre.p1': 'Developer with a degree in <strong>Computer Science from Uninove</strong> (2022–2025), with hands-on experience in process automation, data integration, and web application development.',
    'sobre.p2': 'I work at the intersection of technology and business intelligence — delivering solutions that eliminate manual work and enable data-driven decisions. Experience with <strong>Python</strong>, <strong>RESTful APIs</strong>, <strong>SQL</strong>, and modern AI tools.',
    'sobre.p3': 'Advanced English and ability to bridge technical and business teams.',
    'sobre.certs': 'certificates',
    'sobre.fact1': 'year of experience',
    'sobre.fact2': 'projects delivered',
    'sobre.fact3': 'curiosity',
    'sobre.fact4': 'São Paulo, Brazil',

    'exp.label': '// experience',
    'exp.title': 'Where I worked',
    'exp.job1_role': 'Jr. Intelligence & Technology Analyst',
    'exp.job1_period': 'Jan. 2025 – Present',
    'exp.job1_b1': '<strong>Functional bridge between business and technology:</strong> requirements gathering, process mapping, and solution delivery with Market Intelligence and CX teams.',
    'exp.job1_b2': '<strong>Intelligent Document Extractor:</strong> web app with Python and Flask for PDF uploads, automated data extraction, and SQL Server import.',
    'exp.job1_b3': '<strong>Medical equipment simulator:</strong> interactive landing page with FastAPI and React + TailwindCSS for machine capacity simulation, used as a commercial support tool.',
    'exp.job1_b4': '<strong>Operational routine automation:</strong> document and email automations with extensive use of LLMs (Claude, Codex, and Gemini) for rapid MVP creation.',
    'exp.job2_role': 'IT & CX Intern',
    'exp.job2_period': 'Feb. 2025 – Dec. 2025',
    'exp.job2_b1': '<strong>ETL Pipeline via RESTful API:</strong> Python data ingestion with Bearer Token authentication, pagination, rate limiting, and normalization — feeding BI dashboards.',
    'exp.job2_b2': '<strong>Smartsheet Integration:</strong> data extraction and conversion pipeline to Parquet format via API, optimizing storage and enabling strategic analysis.',
    'exp.job2_b3': '<strong>Vehicle inspection digitalization:</strong> web app with image uploads, structured forms, and electronic signature — replacing a 100% manual process.',

    'skills.label': '// skills',
    'skills.title': 'What I use',
    'skills.group1': 'Languages & Frameworks',
    'skills.group2': 'Data & Integration',
    'skills.group3': 'AI & Tools',

    'proj.label': '// projects',
    'proj.title': 'What I built',
    'proj.tag_featured': 'featured project',
    'proj.tag_delivered': 'delivered',
    'proj.tag_github': 'github',
    'proj.p1_title': 'Medical Equipment Simulator',
    'proj.p1_desc': 'Interactive landing page where the user selects usage parameters and the backend runs the simulation returning the estimated machine capacity — a commercial support tool for clients.',
    'proj.p2_title': 'Intelligent Document Extractor',
    'proj.p2_desc': 'Web app that uploads PDFs, automatically extracts and organizes data, generates structured Excel, and imports to SQL Server — eliminating manual work for the sales team.',
    'proj.p3_title': 'ETL Pipeline via RESTful API',
    'proj.p3_desc': 'Python data ingestion pipeline with Bearer Token authentication, pagination, rate limiting, and Parquet conversion — feeding BI dashboards and KPIs.',
    'proj.p4_title': 'Smartsheet Integration',
    'proj.p4_desc': 'Data extraction and conversion pipeline to Parquet format via API, optimizing storage and enabling strategic analysis.',
    'proj.p5_title': 'Operational Routine Automation',
    'proj.p5_desc': 'Document and email automations with extensive use of LLMs (Claude, Codex, and Gemini) for rapid MVP creation and elimination of manual work.',
    'proj.p6_title': 'Projects on GitHub',

    'contact.label': '// contact',
    'contact.title': "Let's talk",
    'contact.text': 'Open to opportunities, freelance work, and tech conversations. Send me a message!',
    'contact.label_name': 'your name',
    'contact.label_email': 'your email',
    'contact.label_msg': 'message',
    'contact.btn': 'send message',
    'contact.placeholder_name': 'John Smith',
    'contact.placeholder_email': 'john@email.com',
    'contact.placeholder_msg': 'Hi Paulo, I have a project...',

    'form.error_empty': 'please fill in all fields!',
    'form.error_email': 'email seems invalid...',
    'form.sending': 'sending...',
    'form.success': "Message received, {name}! I'll reply soon.",
    'form.btn_reset': 'send message',

    'footer.text': 'made in an all-nighter by Paulo Brito',
  }
};

let currentLang = 'pt';

function detectLang() {
  const saved = localStorage.getItem('lang');
  if (saved) return saved;
  return navigator.language.startsWith('en') ? 'en' : 'pt';
}

function applyLang(lang) {
  currentLang = lang;
  const t = translations[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.textContent = lang === 'pt' ? 'EN' : 'PT';
  });

  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  localStorage.setItem('lang', lang);
}

// Initialize on load
currentLang = detectLang();
applyLang(currentLang);

// Lang toggle buttons
document.querySelectorAll('.lang-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    applyLang(currentLang === 'pt' ? 'en' : 'pt');
  });
});


// ── Mobile menu burger ──────────────────────────────
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
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

revealObserver.disconnect();

const revealObserver2 = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.opacity   = '1';
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


// ── EmailJS config ────────────────────────────────────
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
  const t       = translations[currentLang];

  if (!name || !email || !message) {
    feedback.textContent = t['form.error_empty'];
    feedback.className   = 'form__feedback error';
    return;
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    feedback.textContent = t['form.error_email'];
    feedback.className   = 'form__feedback error';
    return;
  }

  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = t['form.sending'];
  btn.disabled    = true;

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name:  name,
    from_email: email,
    message:    message,
  })
  .then(() => {
    feedback.textContent = t['form.success'].replace('{name}', name.split(' ')[0]);
    feedback.className   = 'form__feedback success';
    contactForm.reset();
  })
  .catch((err) => {
    console.error('EmailJS error:', err);
    feedback.textContent = `Erro: ${err?.status} — ${err?.text}`;
    feedback.className   = 'form__feedback error';
  })
  .finally(() => {
    btn.textContent = t['form.btn_reset'];
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
    p.vy   += 0.05;
    p.life -= 0.03;

    ctx.save();
    ctx.globalAlpha = p.life;
    ctx.fillStyle   = p.color;
    ctx.beginPath();
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
