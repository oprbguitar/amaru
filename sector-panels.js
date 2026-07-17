(() => {
  const compactControls = document.createElement('style');
  compactControls.textContent = `
    @media (max-width: 560px) {
      .sector-card:not(.is-active):not(.is-collapsed) .sector-action {
        top: 11px;
        right: 9px;
        bottom: auto;
        gap: 0;
        font-size: 0;
      }
      .sector-card:not(.is-active):not(.is-collapsed) .sector-action svg {
        width: 17px;
        height: 17px;
      }
    }
  `;
  document.head.appendChild(compactControls);

  const paperSection = document.querySelector('.paper-section');
  const grid = document.querySelector('.sector-grid');
  if (!paperSection || !grid) return;

  const cards = Array.from(grid.querySelectorAll('.sector-card[data-sector]'));
  if (!cards.length) return;

  const getSectorName = (card) => card.querySelector('h3')?.textContent.trim().toLowerCase() || 'el sector';
  const setAccessibleState = (card, active) => {
    card.setAttribute('aria-expanded', String(active));
    card.setAttribute('aria-label', `${active ? 'Contraer' : 'Abrir'} capacidades para ${getSectorName(card)}`);
    const details = card.querySelector('.sector-details');
    if (details) details.setAttribute('aria-hidden', String(!active));
  };

  const closePanels = () => {
    grid.classList.remove('has-active');
    grid.removeAttribute('data-active');
    paperSection.classList.remove('sector-open');

    cards.forEach((card) => {
      card.classList.remove('is-active', 'is-collapsed');
      setAccessibleState(card, false);
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
      setAccessibleState(card, active);
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
      const activeCard = cards.find((card) => card.classList.contains('is-active'));
      closePanels();
      if (activeCard) activeCard.focus();
    }
  });
})();
