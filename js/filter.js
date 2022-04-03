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

  const filters = [
    type !== DEFAULT,
    price !== DEFAULT,
    rooms !== DEFAULT,
    guests !== DEFAULT,
  ];

  const filterCount = filters.reduce((count, element) => count + element, 0);

  if (!filterCount) {
    rank = 1;
    return rank;
  }

  if (type !== DEFAULT && offer.type === type) {
    rank += 1;
  }

  if (price !== DEFAULT && offer.price >= priceRule[price].min && offer.price <= priceRule[price].max ) {
    rank += 1;
  }

  if (rooms !== DEFAULT && offer.rooms === +rooms) {
    rank += 1;
  }

  if (guests !== DEFAULT && offer.guests === +guests) {
    rank += 1;
  }

  return (rank >= filterCount) ? rank : 0;
};

/**
 * Функция сортировки объявлений.
 * @param {object} dataA - Объявление А.
 * @param {object} dataB - Объявление Б.
 * @returns - Новый порядок объявлений с учетом сравнения.
 */
const sortOffers = (dataA, dataB) => {
  const rankA = getOffersRank(dataA.offer);
  const rankB = getOffersRank(dataB.offer);
  return rankB - rankA;
};

export {sortOffers, getOffersRank};
