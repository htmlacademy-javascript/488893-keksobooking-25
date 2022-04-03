const DEFAULT = 'any';

/**
 * Функция определения соответсвия объявления фильтру.
 * @param {object} offer - Значение типа жилья
 */
const getOffersRank = (offer) => {
  const typeSelect = document.querySelector('#housing-type');
  let rank = 0;

  if (typeSelect.value === offer.type || typeSelect.value === DEFAULT ) {
    rank += 3;
  }

  return rank;
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
