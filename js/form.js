const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--error',
  successClass: 'ad-form__element--success',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error'
});

/* Валидация заголовка объявления (ТЗ 3.1)
   ========================================================================== */

const titleField = form.querySelector('#title');

/**
 * Валидация длины заголовка
 * @param {number} value - заголовок введенный пользователем
 * @returns {boolean} - результат валидации
 */
function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(titleField, validateTitle, 'От 30 до 100 символов.');

/* Валидация Цены за ночь (ТЗ 3.2, 3.3)
   ========================================================================== */

const priceField = form.querySelector('#price');
const MAX_PRICE = 100000;
const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

/**
 * Валидация минимального и максимального занчения "Цены за ночь"
 * @param {number} value - значение введенное пользователем
 * @returns {boolean} - результа валидации
 */
function validatePrice (value) {
  const unit = form.querySelector('#type');
  return value.length && parseInt(value, 10) >= minPrice[unit.value] && parseInt(value, 10) <= MAX_PRICE;
}

/**
 * Получение сообщения ошибки валидации "Цены за ночь"
 * @returns {string} - строка с сообщением об ошибке
 */
function getPriceErrorMessage () {
  const unit = form.querySelector('#type');
  return `Цена от ${minPrice[unit.value]} до ${MAX_PRICE}`;
}

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

/**
 * Перезапуск валидации "Цены за ночь" при обновлении типа жилья
 */
function onPriceChange () {
  priceField.placeholder = minPrice[this.value];
  pristine.validate(priceField);
}

form.querySelector('#type').addEventListener('change', onPriceChange);

/* Валидация Количества комнат и гостей (ТЗ 3.2, 3.3)
   ========================================================================== */

const roomField = form.querySelector('#room_number');
const capacityField = form.querySelector('#capacity');

const guestRestrictions = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

/**
 * Валидация внестимости гостей в соответствии с выбранным количеством комнат.
 * @returns {boolean} - результа валидации
 */
function validateCapacity () {
  return guestRestrictions[roomField.value].includes(capacityField.value);
}

/**
 * Получение сообщения ошибки валидации "Количества гостей"
 * @returns {string} - строка с сообщением об ошибке
 */
function getCapacityErrorMessage () {
  if (roomField.value === '100') {
    return 'Комнаты не для гостей';
  }
  return `${(roomField.value === '1') ? 'Комната' : 'Комнаты'} для ${guestRestrictions[roomField.value][0]} ${(guestRestrictions[roomField.value][0] === '1') ? 'гостя' : 'гостей'} максимум`;
}

pristine.addValidator(capacityField, validateCapacity, getCapacityErrorMessage);

/**
 * Перезапуск валидации "Количества гостей" при обновлении количества комнат
 */
function onRoomChange () {
  roomField.placeholder = guestRestrictions[this.value];
  pristine.validate(capacityField);
}

roomField.addEventListener('change', onRoomChange);

/* Валидация Времени заезда и Времени выезда (ТЗ 3.5)
   ========================================================================== */

const timeinField = form.querySelector('#timein');
const timeoutField = form.querySelector('#timeout');

/**
 * Изменение времени выезда при изменении времени заезда.
 */
function onTimeInChange () {
  timeinField.value = timeoutField.value;
}

/**
 * Изменение времени заезда при изменении времени выезда.
 */
function onTimeOutChange () {
  timeoutField.value = timeinField.value;
}

timeinField.addEventListener('change', onTimeOutChange);
timeoutField.addEventListener('change', onTimeInChange);


/* Запуск валидации
  ========================================================================== */

const startValidation = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

export {startValidation};
