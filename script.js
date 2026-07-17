(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.primary-nav');
  const navLinks = [...document.querySelectorAll('.primary-nav > a[href^="#"]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const setMenu = (open) => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    navigation.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  const observedSections = navLinks.map((link) => document.querySelector(link.hash)).filter(Boolean);
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => {
      const active = link.hash === `#${visible.target.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-20% 0px -55%', threshold: [0.05, 0.3, 0.6] });
  observedSections.forEach((section) => sectionObserver.observe(section));

  const stage = document.querySelector('.orbital-stage');
  const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (supportsHover.matches && !reducedMotion.matches) {
    document.querySelector('.hero').addEventListener('pointermove', (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 12;
      const y = (event.clientY / window.innerHeight - 0.5) * 8;
      stage.style.translate = `${x}px ${y}px`;
    });
    document.querySelector('.hero').addEventListener('pointerleave', () => { stage.style.translate = '0 0'; });
  }

  const canvas = document.querySelector('.particle-canvas');
  const context = canvas.getContext('2d');
  let particles = [];
  let animationFrame = 0;
  let running = true;

  const resizeCanvas = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(canvas.clientWidth * ratio);
    canvas.height = Math.round(canvas.clientHeight * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const centerX = canvas.clientWidth > 900 ? canvas.clientWidth * 0.76 : canvas.clientWidth * 0.5;
    const centerY = canvas.clientWidth > 900 ? 300 : 560;
    const count = canvas.clientWidth > 700 ? 85 : 42;
    particles = Array.from({ length: count }, (_, index) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = (canvas.clientWidth > 900 ? 210 : 160) + Math.random() * 110;
      return { angle, radius, speed: (Math.random() * .00016 + .00004) * (index % 2 ? 1 : -1), size: Math.random() * 1.25 + .25, alpha: Math.random() * .55 + .12, x: centerX, y: centerY };
    });
  };

  const drawParticles = (time) => {
    if (!running || reducedMotion.matches) return;
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    particles.forEach((particle, index) => {
      const angle = particle.angle + time * particle.speed;
      const wobble = Math.sin(time * .0004 + index) * 8;
      const x = particle.x + Math.cos(angle) * (particle.radius + wobble);
      const y = particle.y + Math.sin(angle) * (particle.radius * .72 + wobble);
      context.beginPath();
      context.arc(x, y, particle.size, 0, Math.PI * 2);
      context.fillStyle = index % 3 === 0 ? `rgba(0,220,255,${particle.alpha})` : `rgba(130,61,255,${particle.alpha})`;
      context.fill();
    });
    animationFrame = requestAnimationFrame(drawParticles);
  };

  const updateMotion = () => {
    cancelAnimationFrame(animationFrame);
    if (!reducedMotion.matches && running) animationFrame = requestAnimationFrame(drawParticles);
  };
  document.addEventListener('visibilitychange', () => { running = !document.hidden; updateMotion(); });
  reducedMotion.addEventListener('change', updateMotion);
  window.addEventListener('resize', resizeCanvas, { passive: true });
  resizeCanvas();
  updateMotion();
})();
