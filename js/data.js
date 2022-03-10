import {getRandomNumber, getRandomFloat, getRandomArrayElement, getRandomList, getRandomArrayList} from './utils.js';

const OFFERS_COUNT = 10;

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHEK_IN = [
  '12:00',
  '13:00',
  '14:00'
];

const CHEK_OUT = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const TITLES = [
  'Уютная квартира, с видом на море.',
  'Небольшая квартирка, с мансардой.',
  'Квартира класса люкс, все включено',
  'Двухкомнатная квартира в центре.',
  'Коната в общежитии, дешево.',
  'Милая, уютная квартира в центре.',
  'Красивый уютный домик рядом с болотом.',
  'Изба в лесу на курьих ножках.',
  'Домик с приведениями на холму.',
  'Трехкомнатная квартира на окране далеко от метро. ',
  'Апартаменты с прекрасным видом на торговый центр.',
  'Апартаменты на мансарде.',
  'Пентхаус в небоскребе.',
  'Студия в центре.',
  'Домик на окраине.',
  'Номер в отеле.',
  'Пентхаус в небоскребе. Лифт не работает.',
  'Небольшая студия с удобным расположением.'
];

const DESCRIPTIONS = [
  'Кухня, две спальни, совмещенная ванная комната.',
  'Евроремонт, новая мебель, большая кухня. Все готово для заселения.',
  'Отдельное рабочее место, большая кровать, небольшая кухня.',
  'На рассветах и закатах комнаты сверкают яркими красками.',
  'Все удобства на улице, для отопления нужно использовать дрова и камин.',
  'Около дома располоена дискотека. Но вы не волнуйтесь мы выдадим вам беруши.',
  'Отсуствует подъездная дорога, порковка. Добраться можно только пешком 4 км. Присутсвует дворецкий, но последнее время его не видно. Иногда заходят горничные, но после них пропадает столовое серебро - будьте осторожны.',
  'Клевая хата друган, заезжай не преживай, все будет чики пуки. Только короче, предоплата полная. звани.'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const LOCATION_LAT_RANGE = {
  min: 35.65000,
  max: 35.70000
};

const LOCATION_LNG_RANGE = {
  min: 139.70000,
  max: 139.80000
};

const PRICE_RANGE = {
  min: 0,
  max: 9999
};

const ROOM_RANGE = {
  min: 1,
  max: 5
};

const GUEST_RANGE = {
  min: 1,
  max: 10
};

const avatarUrlNumbers = Array.from({ length: OFFERS_COUNT }, (v, k) => k+1);

/**
 * Функция возвращающая случайный неповторяющийся URL аватарки автора.
 * Номер аварарки - неповторяюшиеся число от 01 до 10.
 *
 * @param {array} avatarNumberList - массив с возможными номерами аватарки.
 * @returns {string} - строка с URL аватарки.
 */
const  getAvatarUrl = (avatarNumberList) => {
  const randomIndex = getRandomNumber(0, avatarNumberList.length - 1);
  const rendomNumber = avatarNumberList[randomIndex];
  avatarNumberList.splice(randomIndex, 1);
  return `img/avatars/user${(`0${rendomNumber}`).slice(-2)}.png`;
};

/**
 * Функция возвращающая обьект "Обявления" заполненный случайными данными.
 *
 * @return {object} - Обьект "Обявления".
 */
const createAd = () => {
  const locationLat = getRandomFloat(LOCATION_LAT_RANGE.min, LOCATION_LAT_RANGE.max, 5);
  const locationLng = getRandomFloat(LOCATION_LNG_RANGE.min, LOCATION_LNG_RANGE.max, 5);

  const result = {
    author: {
      avatar: getAvatarUrl(avatarUrlNumbers),
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${locationLat}, ${locationLng}`,
      price: getRandomNumber(PRICE_RANGE.min, PRICE_RANGE.max),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(ROOM_RANGE.min, ROOM_RANGE.max),
      guests: getRandomNumber(GUEST_RANGE.min, GUEST_RANGE.max),
      checkin: getRandomArrayElement(CHEK_IN),
      checkout: getRandomArrayElement(CHEK_OUT),
      features: getRandomList(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArrayList(PHOTOS),
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    }
  };

  return result;
};

const similarAds = Array.from({length: OFFERS_COUNT}, createAd);

export {similarAds};
