(() => {
  const paperSection = document.querySelector('.paper-section');
  const grid = document.querySelector('.sector-grid');
  if (!paperSection || !grid) return;

  const cards = Array.from(grid.querySelectorAll('.sector-card[data-sector]'));
  if (!cards.length) return;

  const closePanels = () => {
    grid.classList.remove('has-active');
    grid.removeAttribute('data-active');
    paperSection.classList.remove('sector-open');

    cards.forEach((card) => {
      card.classList.remove('is-active', 'is-collapsed');
      card.setAttribute('aria-expanded', 'false');
      const details = card.querySelector('.sector-details');
      if (details) details.setAttribute('aria-hidden', 'true');
    });
  };

  const openPanel = (selectedCard) => {
    const selectedSector = selectedCard.dataset.sector;
    const alreadyOpen = selectedCard.classList.contains('is-active');

    if (alreadyOpen) {
      closePanels();
      return;
    }

    grid.classList.add('has-active');
    grid.dataset.active = selectedSector;
    paperSection.classList.add('sector-open');

    cards.forEach((card) => {
      const active = card === selectedCard;
      card.classList.toggle('is-active', active);
      card.classList.toggle('is-collapsed', !active);
      card.setAttribute('aria-expanded', String(active));
      const details = card.querySelector('.sector-details');
      if (details) details.setAttribute('aria-hidden', String(!active));
    });
  };

  cards.forEach((card) => {
    card.addEventListener('click', () => openPanel(card));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openPanel(card);
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && grid.classList.contains('has-active')) {
      closePanels();
      const activeCard = cards.find((card) => card.classList.contains('is-active'));
      if (activeCard) activeCard.focus();
    }
  });
})();
