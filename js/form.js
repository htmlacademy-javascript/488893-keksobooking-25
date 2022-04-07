import {resetMainMarker, getDefaultCoordinates, resetMapMarkers, addMapMarkers} from './map.js';
import {onSliderReset} from './validation.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_IMG = 'img/muffin-grey.svg';
const DEFAULT_PRICE = 5000;

const formElement = document.querySelector('.ad-form');
const resetElement = formElement.querySelector('.ad-form__reset');
const addressElement = formElement.querySelector('#address');
const mapFiltersElement = document.querySelector('.map__filters');
const priceElement = document.querySelector('#price');

const avatarElement = formElement.querySelector('#avatar');
const imagesElement = document.querySelector('#images');
const previewElement = formElement.querySelector('.ad-form-header__preview img');
const photoElement = document.querySelector('.ad-form__photo');

/**
 * Сброс всех фильтров, формы, карты.
 * @param {object} data - Данные для обновления карты.
 */
const resetForm = (data) => {
  formElement.reset();
  addressElement.value = getDefaultCoordinates();
  previewElement.src = DEFAULT_IMG;
  photoElement.style.backgroundImage = 'none';
  priceElement.setAttribute('placeholder', DEFAULT_PRICE);
  priceElement.value = DEFAULT_PRICE;
  mapFiltersElement.reset();
  resetMainMarker();
  resetMapMarkers();
  onSliderReset();
  if (data) {
    addMapMarkers(data);
  }
};

/**
 * Отслеживание нажатие кнопки Сброса.
 * @param {object} cd - Collback функция.
 */
const addResetListener = (cb) => {
  resetElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    cb();
  });
};

avatarElement.addEventListener('change', () => {
  const file = avatarElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewElement.src = URL.createObjectURL(file);
  }
});

imagesElement.addEventListener('change', () => {
  const file = imagesElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    photoElement.style.backgroundImage = `url('${URL.createObjectURL(file)}')`;
    photoElement.style.backgroundSize = 'contain';
    photoElement.style.backgroundPosition = 'center center';
    photoElement.style.backgroundRepeat  = 'no-repeat';
  }
});

export {
  addResetListener,
  resetForm,
};
