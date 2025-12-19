import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'loaders.css/loaders.css';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
import { getImagesByQuery } from './js/pixabay-api.js';

const searchForm = document.querySelector('.form');
const inputField = document.querySelector('input[name="search-text"]');
const submitButton = document.querySelector('button[type="submit"]');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const query = inputField.value.trim();
  if (query === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();
  if (submitButton) submitButton.disabled = true;

  getImagesByQuery(query)
    .then(images => {
      if (!images || images.length === 0) {
        iziToast.info({
          title: 'Info',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }

      createGallery(images);
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: (error && error.message) || String(error),
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
      if (submitButton) submitButton.disabled = false;
    });
});
