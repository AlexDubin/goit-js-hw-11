import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';

// Элементы DOM
const searchForm = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

// Параметры поиска
const API_KEY = '36229589-7750e41a399077c1857a2da84';
let searchQuery = '';
let page = 1;
let totalHits = 0;

// Скрываем кнопку "Load more"
loadMoreBtn.classList.add('is-hidden');


// Запрос на сервер и рендеринг карточек
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
    }

    const imagesMarkup = createImagesMarkup(data.hits);
    galleryContainer.insertAdjacentHTML('beforeend', imagesMarkup);

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



// Обработчик сабмита формы поиска
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



// Обработчик клика на кнопке Load more
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



// Создание разметки карточек изображений
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
        <a href="" class="cards-link">
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

// Слушатели событий
searchForm.addEventListener('submit', handleSearchFormSubmit);
loadMoreBtn.addEventListener('click', handleLoadMoreBtnClick);