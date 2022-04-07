import {sendData} from './server.js';
import {showMessage} from './utils.js';

const MAX_PRICE = 100000;
const MIN_PRICE = 0;
const PRICE_STEP = 100;
const DEFAULT_PRICE = 5000;

const minPrice = {
  'bungalow': MIN_PRICE,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const guestRestrictions = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

const pristineSettings = {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--error',
  successClass: 'ad-form__element--success',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error'
};

const formElement = document.querySelector('.ad-form');
const titleElement = formElement.querySelector('#title');
const sliderElement = document.querySelector('.ad-form__slider');
const priceElement = formElement.querySelector('#price');
const typeElement = formElement.querySelector('#type');
const roomElement = formElement.querySelector('#room_number');
const capacityElement = formElement.querySelector('#capacity');
const timeinElement = formElement.querySelector('#timein');
const timeoutElement = formElement.querySelector('#timeout');
const submitelement = formElement.querySelector('.ad-form__submit');

const pristine = new Pristine(formElement, pristineSettings);

noUiSlider.create(sliderElement, {
  range: {
    min: MIN_PRICE,
    max: MAX_PRICE,
  },
  start: DEFAULT_PRICE,
  step: PRICE_STEP,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});

sliderElement.noUiSlider.on('update', () => {
  priceElement.value = sliderElement.noUiSlider.get();
  pristine.validate(priceElement);
});

/**
 * Валидация длины заголовка.
 * @param {string} value - Текст.
 * @returns {boolean} - Результат валидации.
 */
const validateTitle = (value) => value.length >= 30 && value.length <= 100;

/**
 * Валидация минимального и максимального занчения "Цены за ночь"
 * @param {number} value - Значение.
 * @returns {boolean} - Результат валидации.
 */
const validatePrice = (value) => {
  const unit = formElement.querySelector('#type');
  return value.length && parseInt(value, 10) >= minPrice[unit.value] && parseInt(value, 10) <= MAX_PRICE;
};

/**
 * Получение сообщения ошибки валидации "Цены за ночь"
 * @returns {string} - строка с сообщением об ошибке
 */
const getPriceErrorMessage = () => {
  const unit = formElement.querySelector('#type');
  return `Цена от ${minPrice[unit.value]} до ${MAX_PRICE}`;
};

/**
 * Перезапуск валидации "Цены за ночь" при обновлении типа жилья.
 */
function onTypeChange () {
  priceElement.placeholder = minPrice[this.value];
  pristine.validate(priceElement);
}

/**
 * Изменение слайдера при обновлении "Цены за ночь".
 */
function onPriceChange () {
  sliderElement.noUiSlider.set(this.value);
}

/**
 * Валидация вместимости гостей в соответствии с выбранным количеством комнат.
 * @returns {boolean} - Результат валидации.
 */
const validateCapacity = () => guestRestrictions[roomElement.value].includes(capacityElement.value);

/**
 * Получение сообщения ошибки валидации "Количества гостей".
 * @returns {string} - Текст ошибки.
 */
const getCapacityErrorMessage = () => {
  if (roomElement.value === '100') {
    return 'Комнаты не для гостей';
  }
  return `${(roomElement.value === '1') ? 'Комната' : 'Комнаты'} для ${guestRestrictions[roomElement.value][0]} ${(guestRestrictions[roomElement.value][0] === '1') ? 'гостя' : 'гостей'} максимум`;
};

/**
 * Перезапуск валидации "Количества гостей" при обновлении количества комнат.
 */
function onRoomChange () {
  roomElement.placeholder = guestRestrictions[this.value];
  pristine.validate(capacityElement);
}

/**
 * Изменение времени выезда при изменении времени заезда.
 */
const onTimeInChange = () => {
  timeinElement.value = timeoutElement.value;
};

/**
 * Изменение времени заезда при изменении времени выезда.
 */
const onTimeOutChange = () => {
  timeoutElement.value = timeinElement.value;
};

/**
 * Блокировка кнопки "Опубликовать" при отправке формы.
 */
const blockSubmitButton = () => {
  submitelement.disabled = true;
  submitelement.textContent = 'Отправка...';
};

/**
 * Разблокировка кнопки "Опубликовать" при отправке формы.
 */
const unblockSubmitButton = () => {
  submitelement.disabled = false;
  submitelement.textContent = 'Опубликовать';
};

pristine.addValidator(titleElement, validateTitle, 'От 30 до 100 символов.');
pristine.addValidator(priceElement, validatePrice, getPriceErrorMessage);
pristine.addValidator(capacityElement, validateCapacity, getCapacityErrorMessage);

typeElement.addEventListener('change', onTypeChange);
priceElement.addEventListener('change', onPriceChange);
roomElement.addEventListener('change', onRoomChange);
timeinElement.addEventListener('change', onTimeOutChange);
timeoutElement.addEventListener('change', onTimeInChange);

/**
 * Запуск вализации на форме.
 * @param {object} cb - Collback функция.
 */
const startValidation = (cb) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          showMessage();
          unblockSubmitButton();
          if (cb) {
            cb();
          }
        },
        () => {
          showMessage(true);
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {startValidation};
