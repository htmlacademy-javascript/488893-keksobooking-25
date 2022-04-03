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

/**
 * Функция определения соответсвия объявления фильтру.
 * @param {object} offer - Значение типа жилья
 */
const getOffersRank = (offer) => {
  let rank = 0;

  const type = document.querySelector('#housing-type').value;
  const price = document.querySelector('#housing-price').value;
  const rooms = document.querySelector('#housing-rooms').value;
  const guests = document.querySelector('#housing-guests').value;
  const features = document.querySelector('#housing-features');
  const wifiFeature = features.querySelector('#filter-wifi');
  const dishwasherFeature = features.querySelector('#filter-dishwasher');
  const parkingFeature = features.querySelector('#filter-parking');
  const washerFeature = features.querySelector('#filter-washer');
  const elevatorFeature = features.querySelector('#filter-elevator');
  const conditionerFeature = features.querySelector('#filter-conditioner');

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

export {getOffersRank};
