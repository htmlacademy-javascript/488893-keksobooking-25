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
 * Функция генерирующая отдельную карточку объявления для вставки в DOM.
 *
 * @param {object} author - Обьект с данными автора (аватарка).
 * @param {object} offer - Обьект с данными объявления.
 * @return {object} - DOM фрагмент карточкой объявления.
 */
const renderCard = ({author, offer}) => {
  const cardFragment = document.createDocumentFragment();
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__avatar').src = author.avatar;
  card.querySelector('.popup__title').textContent = offer.title;

  if (offer.address) {
    card.querySelector('.popup__text--address').textContent = offer.address;
  } else {
    card.querySelector('.popup__text--address').classList.add('visually-hidden');
  }

  if (offer.price) {
    card.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  } else {
    card.querySelector('.popup__text--price').classList.add('visually-hidden');
  }

  if (offer.type) {
    card.querySelector('.popup__type').textContent = OFFER_TYPES[offer.type];
  } else {
    card.querySelector('.popup__type').classList.add('visually-hidden');
  }

  if (offer.rooms && offer.guests) {
    card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else {
    card.querySelector('.popup__text--capacity').classList.add('visually-hidden');
  }

  if (offer.checkin && offer.checkout) {
    card.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    card.querySelector('.popup__text--time').classList.add('visually-hidden');
  }

  const featuresContainer = card.querySelector('.popup__features');

  if (offer.features.length !== 0) {
    const featureList = featuresContainer.querySelectorAll('.popup__feature');
    const modifiers = offer.features.map((element) => `popup__feature--${element}`);

    featureList.forEach((item) => {
      const modifier = item.classList[1];
      if (!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  } else {
    featuresContainer.classList.add('visually-hidden');
  }

  if (offer.description) {
    card.querySelector('.popup__description').textContent = offer.description;
  } else {
    card.querySelector('.popup__description').classList.add('visually-hidden');
  }

  card.querySelector('.popup__photos').innerHTML = '';
  if (offer.photos.length !== 0) {
    card.querySelector('.popup__photos').appendChild(renderPhotos(offer.photos));
  } else {
    card.querySelector('.popup__photos').classList.add('visually-hidden');
  }

  cardFragment.appendChild(card);
  return cardFragment;
};

/**
 * Функция генерирующая карточки объявления для вставки в DOM.
 *
 * @param {object} data - Обьект с данными карточек объявлений.
 * @return {object} - DOM фрагмент с карточками объявлений.
 */
const renderCards = (data) => {
  const cardsFragment = document.createDocumentFragment();

  data.forEach((element) => {
    cardsFragment.appendChild(renderCard(element));
  });

  return cardsFragment;
};

export {renderCard, renderCards};
