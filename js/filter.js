import {updateMap} from './map.js';
import {debounce, addChangeListener} from './utils.js';

const DEFAULT = 'any';
const priceRule = {
  'middle': {
    min: 10000,
    max: 50000
  },
  'low': {
    min: 0,
    max: 10000
  },
  'high': {
    min: 50000,
    max: 100000
  }
};

const typeFilter = document.querySelector('#housing-type');
const priceFilter = document.querySelector('#housing-price');
const roomsFilter = document.querySelector('#housing-rooms');
const guestsFilter = document.querySelector('#housing-guests');
const featuresFilter = document.querySelector('#housing-features');

/**
 * Проверка соответствия объявления фильтру "Тип жилья".
 * @param {string} filter - Значение фильтра.
 * @param {string} element - Текущее значение элемента.
 * @returns {boolean} - Соответсвие фильтру (True|False)
 */
const typeCheck = (filter, element) => filter !== DEFAULT && filter === element;

/**
 * Проверка соответствия объявления фильтру "Число комнат".
 * @param {string} filter - Значение фильтра.
 * @param {number} element - Текущее значение элемента.
 * @returns {boolean} - Соответсвие фильтру (True|False)
 */
const roomsCheck = (filter, element) => filter !== DEFAULT && element === +filter;

/**
 * Проверка соответствия объявления фильтру "Число гостей".
 * @param {string} filter - Значение фильтра.
 * @param {number} element - Текущее значение елемента.
 * @returns {boolean} - Соответсвие фильтру (True|False)
 */
const guestsCheck = (filter, element) => filter !== DEFAULT && element === +filter;

/**
 * Проверка соответствия объявления фильтру "Цена".
 * @param {string} filter - Значение фильтра.
 * @param {number} element - Текущее значение елемента.
 * @returns {boolean} - Соответсвие фильтру (True|False)
 */
const priceCheck = (filter, element) => filter !== DEFAULT && element >= priceRule[filter].min && element <= priceRule[filter].max;

/**
 * Проверка фильтра возможностей (feature).
 * @param {object} filter - Значение фильтра.
 * @param {object} element - Текущее значение елемента.
 */
const featuresCheck = (filter, element) => filter.checked && element.includes(`${filter.value}`);

/**
 * Функция определения соответсвия объявления фильтру.
 * @param {object} offer - Значение типа жилья
 * @returns {number} - Ранг объявления по фильтру.
 */
const getOffersRank = (offer) => {
  let rank = 0;

  const type = typeFilter.value;
  const price = priceFilter.value;
  const rooms = roomsFilter.value;
  const guests = guestsFilter.value;

  const wifiFeature = featuresFilter.querySelector('#filter-wifi');
  const dishwasherFeature = featuresFilter.querySelector('#filter-dishwasher');
  const parkingFeature = featuresFilter.querySelector('#filter-parking');
  const washerFeature = featuresFilter.querySelector('#filter-washer');
  const elevatorFeature = featuresFilter.querySelector('#filter-elevator');
  const conditionerFeature = featuresFilter.querySelector('#filter-conditioner');

  const filters = [
    type !== DEFAULT,
    price !== DEFAULT,
    rooms !== DEFAULT,
    guests !== DEFAULT,
    wifiFeature.checked,
    dishwasherFeature.checked,
    parkingFeature.checked,
    washerFeature.checked,
    elevatorFeature.checked,
    conditionerFeature.checked
  ];

  const filterCount = filters.reduce((count, element) => count + element, 0);

  if (!filterCount) {
    rank = 1;
    return rank;
  }

  rank += typeCheck(type, offer.type);
  rank += priceCheck(price, offer.price);
  rank += roomsCheck(rooms, offer.rooms);
  rank += guestsCheck(guests, offer.guests);

  const featureList = (offer.features) ? Array.from(offer.features) : '';

  if (featureList) {
    rank += featuresCheck(wifiFeature, featureList);
    rank += featuresCheck(dishwasherFeature, featureList);
    rank += featuresCheck(parkingFeature, featureList);
    rank += featuresCheck(washerFeature, featureList);
    rank += featuresCheck(elevatorFeature, featureList);
    rank += featuresCheck(conditionerFeature, featureList);
  }

  return (rank >= filterCount) ? rank : 0;
};

/**
 * Запуск отслеживания событий изменения фильтров.
 * @param {object[]} data - Массив данных с объявлениями.
 */
const addFilterListener = (data) => {
  addChangeListener(typeFilter, debounce(() => updateMap(data)));
  addChangeListener(priceFilter, debounce(() => updateMap(data)));
  addChangeListener(roomsFilter, debounce(() => updateMap(data)));
  addChangeListener(guestsFilter, debounce(() => updateMap(data)));
  addChangeListener(featuresFilter, debounce(() => updateMap(data)));
};

export {getOffersRank, addFilterListener};
