(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const motionSpeed = reducedMotion.matches ? 1.8 : 1;
  const motionAnimations = [];
  const animateLayer = (selector, keyframes, duration) => {
    const element = document.querySelector(selector);
    if (!element || typeof element.animate !== 'function') return;
    motionAnimations.push(element.animate(keyframes, { duration: duration * motionSpeed, iterations: Infinity, easing: 'linear' }));
  };

  // Web Animations API is native in Chrome and guarantees compositor-driven motion.
  animateLayer('.orbit-alpha', [{ transform: 'rotate(62deg)' }, { transform: 'rotate(422deg)' }], 16000);
  animateLayer('.orbit-beta', [{ transform: 'rotate(-37deg)' }, { transform: 'rotate(323deg)' }], 21000);
  animateLayer('.orbit-gamma', [{ transform: 'rotate(14deg)' }, { transform: 'rotate(374deg)' }], 28000);
  animateLayer('.outer-halo', [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], 21000);
  animateLayer('.energy-orb', [{ transform: 'scale(1)' }, { transform: 'scale(1.008)' }, { transform: 'scale(1)' }], 8000);
  animateLayer('.core-pulse', [{ transform: 'scale(.72)', opacity: 0 }, { transform: 'scale(1)', opacity: .58 }, { transform: 'scale(1.55)', opacity: 0 }], 4800);
  animateLayer('.cyan-flare', [{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(1.1)', opacity: .85 }, { transform: 'scale(1)', opacity: 1 }], 4000);

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
      if (index % 4 === 0) {
        const direction = particle.speed > 0 ? 1 : -1;
        const tail = 11 + particle.size * 5;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + Math.sin(angle) * tail * direction, y - Math.cos(angle) * tail * .72 * direction);
        context.strokeStyle = index % 3 === 0 ? `rgba(0,220,255,${particle.alpha * .32})` : `rgba(130,61,255,${particle.alpha * .32})`;
        context.lineWidth = Math.max(.35, particle.size * .45);
        context.stroke();
      }
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
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    motionAnimations.forEach((animation) => document.hidden ? animation.pause() : animation.play());
    updateMotion();
  });
  window.addEventListener('pageshow', () => { running = true; updateMotion(); });
  reducedMotion.addEventListener('change', updateMotion);
  window.addEventListener('resize', resizeCanvas, { passive: true });
  resizeCanvas();
  updateMotion();
})();
