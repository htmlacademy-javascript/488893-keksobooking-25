import {resetMainMarker, getDefaultCoordinates, resetMapMarkers, addMapMarkers} from './map.js';

const form = document.querySelector('.ad-form');
const resetButton = form.querySelector('.ad-form__reset');
const addressField = form.querySelector('#address');
const formFilter = document.querySelector('.map__filters');

/**
 * Функция сбрасывает Форму в состояние по умолчанию.
 */
const resetForm = () => {
  form.reset();
  addressField.value = getDefaultCoordinates();
  formFilter.reset();
  resetMainMarker();
  resetMapMarkers();
};

/**
 * Событие сброса состояния формы, фильтров и карты.
 * @param {object[]} data - Массив данных с объявлениями.
 */
const onResetEvent = (data) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
    addMapMarkers(data);
  });
};

export {onResetEvent, resetForm};
