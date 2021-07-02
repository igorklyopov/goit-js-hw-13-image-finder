const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '17487931-e1e571c2d579d55d938e84222';

export default class ImageApiServise {
  constructor() {
    this.searchQuery = '';
    this.pageNumber = 1;
  }

  fetchImages() {
    return fetch(
      `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pageNumber}&per_page=12&key=${API_KEY}`,
    ).then(response => {
      this.incrementPage();
      return response.json();
    });
  }

  get query() {
    this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.pageNumber += 1;
  }

  resetPage() {
    this.pageNumber = 1;
  }
}
