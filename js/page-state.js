const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFilterSelectors = mapFilters.querySelectorAll('select');
const mapFilterFieldset = mapFilters.querySelector('fieldset');
const filterFeatures = mapFilterFieldset.querySelectorAll('.map__feature');
const sliderElement = document.querySelector('.ad-form__slider');

/**
 * Функция перевода страницы в неактивное состояние.
 */
const setInactivePage = () => {
  adForm.classList.add('ad-form--disabled');
  adFormFieldsets.forEach((element) => element.setAttribute('disabled', 'disabled'));
  mapFilterSelectors.forEach((element) => element.setAttribute('disabled', 'disabled'));
  mapFilterFieldset.setAttribute('disabled', 'disabled');
  filterFeatures.forEach((element) => element.classList.add('map__filters--disabled'));
  sliderElement.setAttribute('disabled', true);
};

/**
 * Функция перевода страницы в активное состояние.
 */
const setActivePage = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormFieldsets.forEach((element) => element.removeAttribute('disabled'));
  mapFilterSelectors.forEach((element) => element.removeAttribute('disabled'));
  mapFilterFieldset.removeAttribute('disabled');
  filterFeatures.forEach((element) => element.classList.remove('map__filters--disabled'));
  sliderElement.removeAttribute('disabled');
};

setInactivePage();

export {setActivePage};
