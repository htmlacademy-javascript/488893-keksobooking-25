import {resetMainMarker, getDefaultCoordinates, resetMapMarkers, addMapMarkers} from './map.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_IMG = 'img/muffin-grey.svg';

const form = document.querySelector('.ad-form');
const resetButton = form.querySelector('.ad-form__reset');
const addressField = form.querySelector('#address');
const formFilter = document.querySelector('.map__filters');

const avatarChoser = form.querySelector('#avatar');
const imagesChoser = document.querySelector('#images');
const avatarPreview = form.querySelector('.ad-form-header__preview img');
const imagesPreview = document.querySelector('.ad-form__photo');

/**
 * Функция сбрасывает Форму в состояние по умолчанию.
 */
const resetForm = (data) => {
  form.reset();
  addressField.value = getDefaultCoordinates();
  avatarPreview.src = DEFAULT_IMG;
  imagesPreview.style.backgroundImage = 'none';
  formFilter.reset();
  resetMainMarker();
  resetMapMarkers();
  addMapMarkers(data);
};

/**
 * Событие сброса состояния формы, фильтров и карты.
 */
const onResetEvent = (cb) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cb();
  });
};

/**
 * Событие обновления аватарки.
 */
const onAvatarChange = () => {
  avatarChoser.addEventListener('change', () => {
    const file = avatarChoser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      avatarPreview.src = URL.createObjectURL(file);
    }
  });
};

/**
 * Событие обновления аватарки.
 */
const onImagesChange = () => {
  imagesChoser.addEventListener('change', () => {
    const file = imagesChoser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      imagesPreview.style.backgroundImage = `url('${URL.createObjectURL(file)}')`;
      imagesPreview.style.backgroundSize = 'contain';
      imagesPreview.style.backgroundPosition = 'center center';
      imagesPreview.style.backgroundRepeat  = 'no-repeat';
    }
  });
};

export {onResetEvent, resetForm, onAvatarChange, onImagesChange};
