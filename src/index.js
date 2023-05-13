// import './css/styles.css';


// import axios from 'axios';
// import Notiflix from 'notiflix';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';


// // Элементы DOM
// const searchForm = document.querySelector('#search-form');
// const galleryContainer = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');

// // Параметры поиска
// const API_KEY = '36229589-7750e41a399077c1857a2da84';
// let searchQuery = '';
// let page = 1;

// let isLoading = false;

// // Обработчик прокрутки страницы
// window.addEventListener('scroll', () => {
//   // Проверяем, достиг ли пользователь конца страницы и не загружаются ли в данный момент изображения
//   if (
//     window.pageYOffset + window.innerHeight >=
//       document.documentElement.scrollHeight &&
//     !isLoading
//   ) {
//     // Устанавливаем флаг загрузки изображений в true
//     isLoading = true;

//     // Загружаем следующую порцию изображений
//     axios
//       .get('https://pixabay.com/api/', {
//         params: {
//           key: API_KEY,
//           q: searchQuery,
//           image_type: 'photo',
//           orientation: 'horizontal',
//           safesearch: true,
//           per_page: 40,
//           page: page + 1, // Загружаем следующую страницу
//         },
//       })
//       .then(({ data }) => {
//         // Создаем разметку изображений и добавляем ее на страницу
//         const imagesMarkup = createImagesMarkup(data.hits);
//         galleryContainer.insertAdjacentHTML('beforeend', imagesMarkup);

//         // Устанавливаем флаг загрузки изображений в false
//         isLoading = false;

//         // Увеличиваем номер текущей страницы
//         page += 1;
//       })
//       .catch(error => {
//         Notiflix.Notify.failure('Oops! Something went wrong.');
//         console.log(error);

//         // Устанавливаем флаг загрузки изображений в false
//         isLoading = false;
//       });
//   }
// });

// // Запрос на сервер и рендеринг карточек
// async function searchImages() {
//   try {
//     const { data } = await axios.get('https://pixabay.com/api/', {
//       params: {
//         key: API_KEY,
//         q: searchQuery,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//         per_page: 40,
//         page: page,
//       },
//     });

//     if (data.hits.length === 0) {
//       Notiflix.Notify.warning(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//       return;
//     }

//     if (page === 1) {
//       Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
//     }

//     const lightbox = new SimpleLightbox('.gallery a');
//     lightbox.refresh();

//     if (data.totalHits - page * 40 > 0) {
//       loadMoreBtn.classList.remove('is-hidden');
//     } else {
//       loadMoreBtn.classList.add('is-hidden');
//     }
//   } catch (error) {
//     Notiflix.Notify.failure('Oops! Something went wrong.');
//     console.log(error);
//   }
// }


// // Обработчик сабмита формы поиска
// function handleSearchFormSubmit(event) {
//   event.preventDefault();
//   galleryContainer.innerHTML = '';
//   page = 1;
//   searchQuery = event.currentTarget.elements.searchQuery.value.trim();

//   if (searchQuery === '') {
//     Notiflix.Notify.warning('Please enter a search keyword.');
//     return;
//   }

//   searchImages();
// }

// // Обработчик клика на кнопке Load more
// function handleLoadMoreBtnClick() {
//   page += 1;
//   searchImages();
// }

// // Создание разметки карточек изображений
// function createImagesMarkup(images) {
//   return images
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => `
//         <a href="${largeImageURL}" class="gallery__item">
//         <div class="photo-card">
//           <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//           <div class="info">
//             <p class="info-item">
//               <b>Likes</b> ${likes}
//             </p>
//             <p class="info-item">
//               <b>Views</b> ${views}
//             </p>
//             <p class="info-item">
//               <b>Comments</b> ${comments}
//             </p>
//             <p class="info-item">
//               <b>Downloads</b> ${downloads}
//             </p>
//           </div>
//           </div>
//         </a>
//       `
//     )
//     .join('');
// }


// // Слушатели событий
// searchForm.addEventListener('submit', handleSearchFormSubmit);
// loadMoreBtn.addEventListener('click', handleLoadMoreBtnClick);

// import './css/styles.css';
// import axios from 'axios';
// import Notiflix from 'notiflix';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// // Элементы DOM
// const searchForm = document.querySelector('#search-form');
// const galleryContainer = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');

// // Параметры поиска
// const API_KEY = '36229589-7750e41a399077c1857a2da84';
// let searchQuery = '';
// let page = 1;

// // Запрос на сервер и рендеринг карточек
// async function searchImages() {
//   try {
//     const { data } = await axios.get('https://pixabay.com/api/', {
//       params: {
//         key: API_KEY,
//         q: searchQuery,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//         per_page: 40,
//         page: page,
//       },
//     });

//     if (data.hits.length === 0) {
//       Notiflix.Notify.warning(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//       return;
//     }

//     const imagesMarkup = createImagesMarkup(data.hits);
//     galleryContainer.insertAdjacentHTML('beforeend', imagesMarkup);

//     if (data.totalHits - page * 40 > 0) {
//       loadMoreBtn.classList.remove('is-hidden');
//     } else {
//       loadMoreBtn.classList.add('is-hidden');
//     }
//   } catch (error) {
//     Notiflix.Notify.failure('Oops! Something went wrong.');
//     console.log(error);
//   }
// }

// // Обработчик сабмита формы поиска
// function handleSearchFormSubmit(event) {
//   event.preventDefault();
//   galleryContainer.innerHTML = '';
//   page = 1;
//   searchQuery = event.currentTarget.elements.searchQuery.value.trim();

//   if (searchQuery === '') {
//     Notiflix.Notify.warning('Please enter a search keyword.');
//     return;
//   }

//   searchImages();
// }

// // Обработчик клика на кнопке Load more
// function handleLoadMoreBtnClick() {
//   page += 1;
//   searchImages();
// }

// // Создание разметки карточек изображений
// function createImagesMarkup(images) {
//   return images
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => `
//         <div class="photo-card">
//           <img src="${webformatURL}" alt="${tags}" loading="lazy" data-source="${largeImageURL}"/>
//           <div class="info">
//             <p class="info-item">
//               <b>Likes</b> ${likes}
//             </p>
//             <p class="info-item">
//               <b>Views</b> ${views}
//             </p>
//             <p class="info-item">
//               <b>Comments</b> ${comments}
//             </p>
//             <p class="info-item">
//               <b>Downloads</b> ${downloads}
//             </p>
//           </div>
//         </div>
//       `
//     )
//     .join('');
// }

// // Слушатели событий
// searchForm.addEventListener('submit', handleSearchFormSubmit);
// loadMoreBtn.addEventListener('click', handleLoadMoreBtnClick);


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
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }

    const imagesMarkup = createImagesMarkup(data.hits);
    galleryContainer.insertAdjacentHTML('beforeend', imagesMarkup);

    if (data.totalHits - page * 40 > 0) {
      loadMoreBtn.classList.remove('is-hidden');
    } else {
      loadMoreBtn.classList.add('is-hidden');
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

  searchImages();
}

// Обработчик клика на кнопке Load more
function handleLoadMoreBtnClick() {
  page += 1;
  searchImages();
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