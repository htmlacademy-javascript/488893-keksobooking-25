import {updateMap} from './map.js';
import {debounce, addChangeListener} from './utils.js';

const DEFAULT = 'any';
const apartmentPrice = {
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

const typeElement = document.querySelector('#housing-type');
const priceElement = document.querySelector('#housing-price');
const roomsElement = document.querySelector('#housing-rooms');
const guestsElement = document.querySelector('#housing-guests');
const featuresElement = document.querySelector('#housing-features');

const filterWifiElement = featuresElement.querySelector('#filter-wifi');
const filterDishwasherElement = featuresElement.querySelector('#filter-dishwasher');
const filterParkingElement = featuresElement.querySelector('#filter-parking');
const filterWasherElement = featuresElement.querySelector('#filter-washer');
const filterElevatorElement = featuresElement.querySelector('#filter-elevator');
const filterConditionerElement = featuresElement.querySelector('#filter-conditioner');

/**
 * Проверка соответствия объявления фильтру "Тип жилья".
 * @param {string} filter - Значение фильтра.
 * @param {string} element - Текущее значение элемента.
 * @returns {boolean} - Соответсвие фильтру (True|False)
 */
const checkType = (filter, element) => filter !== DEFAULT && filter === element;

/**
 * Проверка соответствия объявления фильтру "Число комнат".
 * @param {string} filter - Значение фильтра.
 * @param {number} element - Текущее значение элемента.
 * @returns {boolean} - Соответсвие фильтру (True|False)
 */
const checkRoomsOrGuests = (filter, element) => filter !== DEFAULT && element === +filter;

/**
 * Проверка соответствия объявления фильтру "Цена".
 * @param {string} filter - Значение фильтра.
 * @param {number} element - Текущее значение елемента.
 * @returns {boolean} - Соответсвие фильтру (True|False)
 */
const checkPrice = (filter, element) => filter !== DEFAULT && element >= apartmentPrice[filter].min && element <= apartmentPrice[filter].max;

/**
 * Проверка фильтра возможностей (feature).
 * @param {object} filter - Значение фильтра.
 * @param {object} element - Текущее значение елемента.
 */
const checkFeatures= (filter, element) => filter.checked && element.includes(`${filter.value}`);

/**
 * Функция определения соответсвия объявления фильтру.
 * @param {object} data - Значение типа жилья
 * @returns {number} - Ранг объявления по фильтру.
 */
const getOffersRank = (data) => {
  let rank = 0;

  const type = typeElement.value;
  const price = priceElement.value;
  const rooms = roomsElement.value;
  const guests = guestsElement.value;

  const filters = [
    type !== DEFAULT,
    price !== DEFAULT,
    rooms !== DEFAULT,
    guests !== DEFAULT,
    filterWifiElement.checked,
    filterDishwasherElement.checked,
    filterParkingElement.checked,
    filterWasherElement.checked,
    filterElevatorElement.checked,
    filterConditionerElement.checked
  ];

  const filterCount = filters.reduce((count, element) => count + element, 0);

  if (!filterCount) {
    rank = 1;
    return rank;
  }

  rank += checkType(type, data.type);
  rank += checkPrice(price, data.price);
  rank += checkRoomsOrGuests(rooms, data.rooms);
  rank += checkRoomsOrGuests(guests, data.guests);

  const featureList = (data.features) ? Array.from(data.features) : '';

  if (featureList) {
    rank += checkFeatures(filterWifiElement, featureList);
    rank += checkFeatures(filterDishwasherElement, featureList);
    rank += checkFeatures(filterParkingElement, featureList);
    rank += checkFeatures(filterWasherElement, featureList);
    rank += checkFeatures(filterElevatorElement, featureList);
    rank += checkFeatures(filterConditionerElement, featureList);
  }

  return (rank >= filterCount) ? rank : 0;
};

/**
 * Запуск отслеживания событий изменения фильтров.
 * @param {object[]} data - Массив данных с объявлениями.
 */
const addFilterListener = (data) => {
  addChangeListener(typeElement, debounce(() => updateMap(data)));
  addChangeListener(priceElement, debounce(() => updateMap(data)));
  addChangeListener(roomsElement, debounce(() => updateMap(data)));
  addChangeListener(guestsElement, debounce(() => updateMap(data)));
  addChangeListener(featuresElement, debounce(() => updateMap(data)));
};

export {getOffersRank, addFilterListener};
