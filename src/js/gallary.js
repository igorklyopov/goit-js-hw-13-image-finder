import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import refs from './refs';
import makeImageCardMurkup from '../templates/imageCardTpl.hbs';
import ImageApiServise from '../js/apiService';
import scrollToView from './scrollToView';
import Button from './buttonClass';
import showMessage from './showMessage';
import showStickySearch from './showStickySearch';

const gallarySearchBtn = new Button('.gallery-search-button');
const gallaryLoadMoreBtn = new Button('.gallary-load-more');
const imageApiServise = new ImageApiServise();

refs.gallerySearch.addEventListener('input', onSearchInput);
refs.galleryResetButton.addEventListener('click', onGalleryResetBtnClick);
refs.gallerySearchButton.addEventListener('click', makeGallary);
refs.gallaryLoadMoreButton.addEventListener('click', makeGallary);
refs.galleryList.addEventListener('click', onGallaryImageClick);

showStickySearch();

function getSearchQueries() {
  let searchQueries = [];

  return function () {
    let inputValue = refs.gallerySearch.value;
    searchQueries.push(inputValue);
    return searchQueries;
  };
}

function renderGallary(data) {
  return refs.galleryList.insertAdjacentHTML('beforeend', makeImageCardMurkup(data));
}

const searchQueries = getSearchQueries();

async function makeGallary() {
  let queries = searchQueries();

  let currentRequest = queries[queries.length - 1];
  let previousRequest = queries[queries.length - 2];

  imageApiServise.query = refs.gallerySearch.value;

  if (refs.gallerySearch.value.trim() === '') {
    showMessage('error', 'Please enter your request!');
    return;
  }

  if (currentRequest !== previousRequest) {
    imageApiServise.resetPage();
    refs.galleryList.innerHTML = '';
  }

  gallarySearchBtn.active('Loading...');
  gallaryLoadMoreBtn.active('Loading...');
  refs.loadingDots.classList.remove('is-hidden');

  const dataGallary = await imageApiServise.fetchImages();

  if (dataGallary.total === 0) {
    showMessage('warning', 'Sorry, no images could be found for this request!');
  }

  if (dataGallary.total >= 0 && dataGallary.total <= 12) {
    gallaryLoadMoreBtn.hide();
  } else {
    gallaryLoadMoreBtn.show();
    gallaryLoadMoreBtn.inactive('Show more');
  }

  gallarySearchBtn.inactive('Search');
  refs.loadingDots.classList.add('is-hidden');

  renderGallary(dataGallary);
  scrollToView(refs.gallaryLoadMoreButton);
}

function onSearchInput() {
  if (refs.gallerySearch.value.trim() !== '') {
    refs.galleryResetButton.classList.remove('visually-hidden');
  } else {
    refs.galleryResetButton.classList.add('visually-hidden');
  }
}

function onGalleryResetBtnClick() {
  refs.galleryResetButton.classList.add('visually-hidden');
}

function onGallaryImageClick(e) {
  const largeImageInModal = basicLightbox.create(`
    <img src=${e.target.dataset.source} alt=${e.target.alt}>
`);

  if (e.target.tagName === 'IMG') {
    largeImageInModal.show();
  }
}
