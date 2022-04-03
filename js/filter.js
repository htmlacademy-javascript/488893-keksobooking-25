import {resetMapMarkers, addMapMarkers} from './map.js';
import {debounce} from './utils.js';

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
 * Функция определения соответсвия объявления фильтру.
 * @param {object} offer - Значение типа жилья
 * @returns {number} - Ранг обявления по фильтру.
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

  const featureList = (offer.features) ? Array.from(offer.features) : '';

  /**
   * Проверка основных фильтров.
   * @param {object} element - Значение проверяемого фильтра.
   * @param {string} name - Наименование фильтра.
   */
  const filterCheck = (element, name) => {
    switch (name) {
      case 'price':
        return element !== DEFAULT && offer[`${name}`] >= priceRule[price].min && offer[`${name}`] >= priceRule[price].max;
      case 'rooms':
      case 'guests':
        return element !== DEFAULT && offer[`${name}`] === +element;
      default:
        return element !== DEFAULT && offer[`${name}`] === element;
    }
  };

  rank += filterCheck(type, 'type');
  rank += filterCheck(price, 'price');
  rank += filterCheck(rooms, 'rooms');
  rank += filterCheck(guests, 'guests');

  /**
   * Проверка фильтра возможностей (feature).
   * @param {object} feature - Возможность.
   */
  const featuresCheck = (feature) => feature.checked && featureList.includes(`${feature.value}`);

  if (featureList) {
    rank += featuresCheck(wifiFeature);
    rank += featuresCheck(dishwasherFeature);
    rank += featuresCheck(parkingFeature);
    rank += featuresCheck(washerFeature);
    rank += featuresCheck(elevatorFeature);
    rank += featuresCheck(conditionerFeature);
  }

  return (rank >= filterCount) ? rank : 0;
};

/**
 * Функция обновления карты после фильтрации.
 * @param {object[]} data - Данные объявляений для отрисовки
 */
const updateMap = (data) => {
  resetMapMarkers();
  addMapMarkers(data);
};

/**
 * Событие при изменении фильтров.
 * @param {object} element - Элемент фильтра в разметке.
 * @param {object} cb - Функция collback.
 */
const onChange = (element, cb) => {
  element.addEventListener('change', (evt) => {
    evt.preventDefault();
    cb();
  });
};

/**
 * Событие изменения фильтра.
 * @param {object[]} data - Массив данных с объявлениями.
 */
const onFilterChange = (data) => {
  onChange(typeFilter, debounce(() => updateMap(data)));
  onChange(priceFilter, debounce(() => updateMap(data)));
  onChange(roomsFilter, debounce(() => updateMap(data)));
  onChange(guestsFilter, debounce(() => updateMap(data)));
  onChange(featuresFilter, debounce(() => updateMap(data)));
};

export {getOffersRank, onFilterChange};
