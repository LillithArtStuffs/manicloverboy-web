/* MANIC/LOVERBOY — site behaviour.
   No dependencies, no build step. Safe to drop straight onto GitHub Pages / itch. */
(function () {
  'use strict';

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------- Screenshot placeholders ----------
     The gallery ships with six <img> slots pointing at files that may not exist
     yet. Rather than showing broken-image icons, mark the tile as empty and let
     CSS draw a hatched placeholder. Drop a real file in and it just works. */
  function markEmpty(img) {
    var tile = img.closest('.shot');
    if (!tile) return;
    tile.classList.add('shot--empty');
    // The CSS placeholder label reads data-slot off the tile.
    tile.setAttribute('data-slot', img.getAttribute('data-slot') || '');
  }

  var shots = Array.prototype.slice.call(document.querySelectorAll('.shot img'));

  shots.forEach(function (img) {
    // complete && naturalWidth === 0 means it already failed before this script ran.
    if (img.complete) {
      if (img.naturalWidth === 0) markEmpty(img);
    } else {
      img.addEventListener('error', function () { markEmpty(img); });
    }
  });

  /* ---------- Lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var closeBtn = lightbox ? lightbox.querySelector('.lightbox__close') : null;
  var lastFocused = null;

  function openLightbox(img) {
    if (!lightbox || !lightboxImg) return;
    lastFocused = document.activeElement;
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  shots.forEach(function (img) {
    img.addEventListener('click', function () {
      // Only open tiles that actually have an image loaded.
      if (img.naturalWidth > 0) openLightbox(img);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  if (lightbox) {
    // Click the backdrop (but not the image itself) to dismiss.
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
})();
