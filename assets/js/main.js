// Galería con navegación y miniaturas por sección
// Agrupa cada bloque .gallery dentro de .gallery-section para que el usuario
// pueda moverse entre las fotos sin salir del visor.

function setupSectionGalleries() {
  const galleryBlocks = Array.from(document.querySelectorAll('.gallery-section .gallery'));
  if (!galleryBlocks.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'media-lightbox';
  overlay.innerHTML = `
    <div class="lightbox-backdrop" data-close></div>
    <div class="lightbox-frame" role="dialog" aria-modal="true" aria-label="Galería de fotos">
      <div class="lightbox-main">
        <button class="lightbox-nav prev" type="button" aria-label="Foto anterior">‹</button>
        <img class="lightbox-image" alt="" loading="lazy">
        <button class="lightbox-nav next" type="button" aria-label="Foto siguiente">›</button>
      </div>
      <div class="lightbox-meta">
        <div class="lightbox-caption"></div>
        <div class="lightbox-counter" aria-live="polite"></div>
      </div>
      <div class="lightbox-thumbs" role="list"></div>
      <button class="lightbox-close" type="button" aria-label="Cerrar galería">✕</button>
    </div>
  `;
  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector('.lightbox-image');
  const captionEl = overlay.querySelector('.lightbox-caption');
  const counterEl = overlay.querySelector('.lightbox-counter');
  const thumbsEl = overlay.querySelector('.lightbox-thumbs');
  const prevBtn = overlay.querySelector('.lightbox-nav.prev');
  const nextBtn = overlay.querySelector('.lightbox-nav.next');

  let items = [];
  let index = 0;
  let isOpen = false;

  function renderThumbs() {
    thumbsEl.innerHTML = '';
    items.forEach((item, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'lightbox-thumb';
      btn.style.backgroundImage = `url('${item.thumb}')`;
      btn.setAttribute('aria-label', `Ver foto ${i + 1}`);
      if (i === index) btn.classList.add('active');
      btn.addEventListener('click', () => {
        index = i;
        updateSlide();
      });
      thumbsEl.appendChild(btn);
    });
  }

  function updateActiveThumb() {
    const buttons = thumbsEl.querySelectorAll('.lightbox-thumb');
    buttons.forEach((btn, i) => btn.classList.toggle('active', i === index));
    if (buttons[index]) {
      buttons[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  function updateSlide() {
    const item = items[index];
    imgEl.src = item.src;
    imgEl.alt = item.alt || 'Imagen de Casa Rural Carmen Luna';
    captionEl.textContent = item.alt || 'Casa Rural Carmen Luna';
    counterEl.textContent = `${index + 1}/${items.length}`;
    updateActiveThumb();
  }

  function change(delta) {
    index = (index + delta + items.length) % items.length;
    updateSlide();
  }

  function close() {
    overlay.classList.remove('open');
    document.body.classList.remove('no-scroll');
    isOpen = false;
  }

  function open(links, startIndex) {
    items = links.map((link) => {
      const img = link.querySelector('img');
      return {
        src: link.getAttribute('href'),
        alt: img?.getAttribute('alt') || link.getAttribute('aria-label') || '',
        thumb: img?.getAttribute('src') || link.getAttribute('href'),
      };
    });
    index = startIndex;
    renderThumbs();
    updateSlide();
    overlay.classList.add('open');
    document.body.classList.add('no-scroll');
    isOpen = true;
  }

  overlay.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-close') || e.target.classList.contains('lightbox-close')) {
      close();
    }
  });

  prevBtn.addEventListener('click', () => change(-1));
  nextBtn.addEventListener('click', () => change(1));

  document.addEventListener('keydown', (e) => {
    if (!isOpen) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') change(-1);
    if (e.key === 'ArrowRight') change(1);
  });

  galleryBlocks.forEach((gallery) => {
    const links = Array.from(gallery.querySelectorAll('a'));
    links.forEach((link, i) => {
      link.addEventListener('click', (evt) => {
        evt.preventDefault();
        open(links, i);
      });
    });
  });
}

function init() {
  setupSectionGalleries();
}

document.addEventListener('DOMContentLoaded', init);
