import {resetMarker, getDefaultCoordinates} from './map.js';

const form = document.querySelector('.ad-form');
const resetButton = form.querySelector('.ad-form__reset');
const addressField = form.querySelector('#address');

/**
 * Функция сбрасывает Форму в состояние по умолчанию.
 */
const resetForm = () => {
  form.reset();
  addressField.value = getDefaultCoordinates();
  resetMarker();
};

/**
 * Функция запускает отслеживание события Сброса формы.
 */
const onResetEvent = () => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
  });
};

export {onResetEvent, resetForm};
