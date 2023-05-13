import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const searchForm = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');


const API_KEY = '36229589-7750e41a399077c1857a2da84';
let searchQuery = '';
let page = 1;
let totalHits = 0;


loadMoreBtn.classList.add('is-hidden');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});


async function searchImages() {
  try {
    const { data } = await axios.get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: page,
      },
    });

    if (data.hits.length === 0) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    if (page === 1) {
      totalHits = data.totalHits;
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      refreshLightbox();
    }

    const imagesMarkup = createImagesMarkup(data.hits);
    galleryContainer.insertAdjacentHTML('beforeend', imagesMarkup);

    lightbox.refresh();

    if (totalHits - page * 40 > 0) {
      loadMoreBtn.classList.remove('is-hidden');
    } else {
      loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    Notiflix.Notify.failure('Oops! Something went wrong.');
    console.log(error);
  }
}


function handleSearchFormSubmit(event) {
  event.preventDefault();
  galleryContainer.innerHTML = '';
  page = 1;
  searchQuery = event.currentTarget.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    Notiflix.Notify.warning('Please enter a search keyword.');
    return;
  }

  loadMoreBtn.classList.add('is-hidden'); // Скрыть кнопку перед запросом
  searchImages();
}


async function handleLoadMoreBtnClick() {
  loadMoreBtn.classList.add('is-hidden');
  page += 1;
  await searchImages();

  const { height: cardHeight } = galleryContainer.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function createImagesMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <div class="photo-card gallery__item">
          <a href="${largeImageURL}" class="cards-link">
            <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" data-source="${largeImageURL}"/>
            <div class="info">
              <p class="info-item">
                <b>Likes</b> ${likes}
              </p>
              <p class="info-item">
                <b>Views</b> ${views}
              </p>
              <p class="info-item">
                <b>Comments</b> ${comments}
              </p>
              <p class="info-item">
                <b>Downloads</b> ${downloads}
              </p>
            </div>
          </a>
        </div>
      `
    )
    .join('');
}



function refreshLightbox() {
  lightbox.refresh();
}


const scrollThreshold = 300;
let isLoading = false; 


async function handleScroll() {
  if (isLoading) return; 

  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  const scrolledToBottom =
    scrollTop + clientHeight >= scrollHeight - scrollThreshold;

  if (scrolledToBottom) {
    isLoading = true; 

 
    page += 1;
    await searchImages();

    isLoading = false; 
  }
}


window.addEventListener('scroll', handleScroll);
searchForm.addEventListener('submit', handleSearchFormSubmit);
loadMoreBtn.addEventListener('click', handleLoadMoreBtnClick);
