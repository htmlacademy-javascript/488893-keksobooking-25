import {resetMainMarker, getDefaultCoordinates, resetMapMarkers, addMapMarkers} from './map.js';

const form = document.querySelector('.ad-form');
const resetButton = form.querySelector('.ad-form__reset');
const addressField = form.querySelector('#address');
const formFilter = document.querySelector('.map__filters');
const typeFilter = document.querySelector('#housing-type');
const priceFilter = document.querySelector('#housing-price');
const roomsFilter = document.querySelector('#housing-rooms');
const guestsFilter = document.querySelector('#housing-guests');
const featuresFilter = document.querySelector('#housing-features');

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

/**
 * Обновление карты при изменении фильтра.
 * @param {object} element - Элемент фильтра в разметке.
 * @param {object[]} data - Данные объявлений.
 */
const onChange = (element, data) => {
  element.addEventListener('change', (evt) => {
    evt.preventDefault();
    resetMapMarkers();
    addMapMarkers(data);
  });
};

/**
 * Событие изменения фильтра.
 * @param {object[]} data - Массив данных с объявлениями.
 */
const onFilterChange = (data) => {
  onChange(typeFilter, data);
  onChange(priceFilter, data);
  onChange(roomsFilter, data);
  onChange(guestsFilter, data);
  onChange(featuresFilter, data);
};

export {onResetEvent, resetForm, onFilterChange};
