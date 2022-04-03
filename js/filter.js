import {resetMapMarkers, addMapMarkers} from './map.js';

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

export {getOffersRank, onFilterChange};
