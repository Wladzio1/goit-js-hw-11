import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export { createGallery, clearGallery, showLoader, hideLoader };

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
  captionType: 'attr',
});

const gallery = document.querySelector('.gallery');

function createGallery(images) {
  gallery.innerHTML = images
    .map(
      image => `
        <a href="${image.largeImageURL}" class="gallery__item">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        </a>
      `
    )
    .join('');
  lightbox.refresh();
}

function clearGallery() {
  gallery.innerHTML = '';
}

function showLoader() {
  gallery.innerHTML = '<div class="loader">Loading...</div>';
}

function hideLoader() {
  const loader = gallery.querySelector('.loader');
  if (loader) {
    loader.remove();
  }
}
