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
 * генерация блока фотографий для вставки в DOM.
 *
 * @param {Array} photos - Массив с URL фотографий.
 * @return {object} - DOM фрагмент.
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
 * Генерация блока с Features для вставки в DOM.
 *
 * @param {object} container - NODE с элементами Features.
 * @param {object} data - Данные для вставки в блок.
 * @return {object} - DOM фрагмент.
 */
const renderFeatures = (container, data) => {
  const modifiers = data.map((element) => `popup__feature--${element}`);

  container.forEach((item) => {
    const modifier = item.classList[1];
    if (!modifiers.includes(modifier)) {
      item.remove();
    }
  });

  return 0;
};

/**
 * Удаление всех дочерних элементов.
 * @param {object} element - Родительский элемент.
 */
const removeAllChildren = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

/**
 * Генерация карточки объявления для вставки в DOM.
 *
 * @param {object} author - Данные для вставки аватарки автора.
 * @param {object} offer - Данные для вставки содержимого объявления.
 * @return {object} - Элемент для вставки в DOM.
 */
const renderCard = (author, offer) => {
  const card = cardTemplate.cloneNode(true);
  const featuresElement = card.querySelector('.popup__features');
  const featureList = featuresElement.querySelectorAll('.popup__feature');
  const photosElement = card.querySelector('.popup__photos');

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

  if (offer.features) {
    renderFeatures(featureList, offer.features);
  } else {
    featuresElement.remove();
  }

  if (offer.description) {
    card.querySelector('.popup__description').textContent = offer.description;
  } else {
    card.querySelector('.popup__description').remove();
  }

  removeAllChildren(photosElement);
  if (offer.photos) {
    card.querySelector('.popup__photos').appendChild(renderPhotos(offer.photos));
  } else {
    card.querySelector('.popup__photos').remove();
  }

  return card;
};

export {renderCard};
