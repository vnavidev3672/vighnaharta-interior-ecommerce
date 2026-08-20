/**
 * Vighnaharta Lightbox Modal Engine
 * Automatically enables click-to-zoom for product images across all sections & pages
 */

(function () {
  let overlay, content, imgEl, captionEl, closeBtn;

  function initLightbox() {
    if (document.getElementById('vhiLightboxOverlay')) return;

    // Create Lightbox DOM structure
    overlay = document.createElement('div');
    overlay.id = 'vhiLightboxOverlay';
    overlay.className = 'vhi-lightbox-overlay';

    closeBtn = document.createElement('button');
    closeBtn.className = 'vhi-lightbox-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close zoom view');

    content = document.createElement('div');
    content.className = 'vhi-lightbox-content';

    imgEl = document.createElement('img');
    imgEl.className = 'vhi-lightbox-img';
    imgEl.alt = 'Enlarged Product View';

    captionEl = document.createElement('div');
    captionEl.className = 'vhi-lightbox-caption';

    content.appendChild(imgEl);
    content.appendChild(captionEl);
    overlay.appendChild(closeBtn);
    overlay.appendChild(content);

    document.body.appendChild(overlay);

    // Close listeners
    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target === closeBtn) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    });
  }

  function openLightbox(src, title) {
    initLightbox();
    if (!src) return;
    imgEl.src = src;
    captionEl.textContent = title || '';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Expose global methods
  window.openLightbox = openLightbox;
  window.closeLightbox = closeLightbox;

  // Global click event delegation for images
  document.addEventListener('click', function (e) {
    // Ignore menu icons, logo images, small system icons, and buttons
    const target = e.target;
    if (target.tagName === 'IMG') {
      const isLogo = target.src && (target.src.includes('logo') || target.src.includes('menu.png') || target.src.includes('playstore') || target.src.includes('store.png'));
      const isParentButton = target.closest('button') || target.closest('a.admin-btn');
      
      if (!isLogo && !isParentButton) {
        // Check if inside product containers or has product classes
        const isProduct = target.closest('.product-card') ||
                          target.closest('.featured-card') ||
                          target.closest('.col-4') ||
                          target.closest('#product-container') ||
                          target.closest('#sections-container') ||
                          target.classList.contains('zoomable-img');

        if (isProduct) {
          e.preventDefault();
          e.stopPropagation();
          const title = target.alt || target.title || (target.nextElementSibling ? target.nextElementSibling.innerText : '');
          openLightbox(target.src, title);
        }
      }
    }
  }, true);

  // Initialize on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightbox);
  } else {
    initLightbox();
  }
})();
