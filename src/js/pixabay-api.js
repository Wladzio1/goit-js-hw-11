import axios from 'axios';
export { getImagesByQuery };

function getImagesByQuery(query) {
  const defaultURL = 'https://pixabay.com/api/';

  return axios
    .get(defaultURL, {
      params: {
        key: '53786038-2f78b187bec1188a9f35774b8',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data.hits)
    .then(response => {
      if (response.length === 0) {
        throw 'Sorry, there are no images matching your search query. Please try again!';
      }
      return response;
    })
    .catch(error => console.log(error));
}
