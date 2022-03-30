const OFFER_TYPES = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const photoTemplate = cardTemplate.querySelector('.popup__photo');

/**
 * Функция генерирующая блок фотографий для вставки в DOM.
 *
 * @param {Array} photos - Массив с URL адресами фотографий.
 * @return {object} - DOM фрагмент блока фотографий.
 */
const renderPhotos = (photos) => {
  const photoFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const newPhoto = photoTemplate.cloneNode(true);
    newPhoto.src = photo;
    photoFragment.append(newPhoto);
  });

  return photoFragment;
};

/**
 * Функция генерирующая блок с возможностями Features.
 *
 * @param {object} containerBlock - NODE с элементами Features.
 * @param {object} features - список возможностей.
 * @return {object} - DOM фрагмент карточкой объявления.
 */
const renderFeatures = (containerBlock, features) => {
  const modifiers = features.map((element) => `popup__feature--${element}`);

  containerBlock.forEach((item) => {
    const modifier = item.classList[1];
    if (!modifiers.includes(modifier)) {
      item.remove();
    }
  });

  return 0;
};

/**
 * Функция генерирующая отдельную карточку объявления для вставки в DOM.
 *
 * @param {object} author - Обьект с данными автора (аватарка).
 * @param {object} offer - Обьект с данными объявления.
 * @return {object} - DOM фрагмент карточкой объявления.
 */
const renderCard = (author, offer) => {
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__avatar').src = author.avatar;
  card.querySelector('.popup__title').textContent = offer.title;

  if (offer.address) {
    card.querySelector('.popup__text--address').textContent = offer.address;
  } else {
    card.querySelector('.popup__text--address').remove();
  }

  if (offer.price) {
    card.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  } else {
    card.querySelector('.popup__text--price').remove();
  }

  if (offer.type) {
    card.querySelector('.popup__type').textContent = OFFER_TYPES[offer.type];
  } else {
    card.querySelector('.popup__type').remove();
  }

  if (offer.rooms && offer.guests) {
    card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else {
    card.querySelector('.popup__text--capacity').remove();
  }

  if (offer.checkin && offer.checkout) {
    card.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    card.querySelector('.popup__text--time').remove();
  }

  const featuresContainer = card.querySelector('.popup__features');
  const featureList = featuresContainer.querySelectorAll('.popup__feature');

  if (offer.features) {
    renderFeatures(featureList, offer.features);
  } else {
    featuresContainer.remove();
  }

  if (offer.description) {
    card.querySelector('.popup__description').textContent = offer.description;
  } else {
    card.querySelector('.popup__description').remove();
  }

  card.querySelector('.popup__photos').innerHTML = '';
  if (offer.photos) {
    card.querySelector('.popup__photos').appendChild(renderPhotos(offer.photos));
  } else {
    card.querySelector('.popup__photos').remove();
  }

  return card;
};

export {renderCard};
