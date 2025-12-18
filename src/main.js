import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
import { getImagesByQuery } from './js/pixabay-api.js';

const searchForm = document.querySelector('.form');
const inputField = document.querySelector('input[name="search-text"]');

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
  getImagesByQuery(query)
    .then(images => {
      if (images.length === 0) {
        throw 'Sorry, there are mo images matching your search query. Please try again!';
      }
      createGallery(images);
      hideLoader();
    })
    .catch(error => {
      hideLoader();
      iziToast.error({
        title: 'Error',
        message: error,
        position: 'topRight',
      });
    });
});
