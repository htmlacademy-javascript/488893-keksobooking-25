const ESC_ALL_BROWSERS = 'Escape';
const ESC_IE = 'Esc';

const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const body = document.querySelector('body');

/**
 * Функция проверяет событие нажатия клавишы ESC.
 * @returns {boolean}
 */
const isEscEvent = (evt) => evt.key === ESC_ALL_BROWSERS || evt.key === ESC_IE;

/**
* Функция возвращающая случайное целое число из переданного диапазона
* включительно.
* источник: https://up.htmlacademy.ru/profession/fullstack/2/javascript/25/tasks/7
*
* @param {number} a - Значение диапазона (либо минимальное либо максимальное).
* @param {number} b - Значение диапазона (либо минимальное либо максимальное).
* @return {number} - Целое число
*/
const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/**
 * Функция возвращающая случайное число с плавающей точкой из переданного
 * диапазона включительно.
 * источник: https://up.htmlacademy.ru/profession/fullstack/2/javascript/25/tasks/7
 *
 * @param {number} a - Значение диапазона (либо минимальное либо максимальное).
 * @param {number} b - Значение диапазона (либо минимальное либо максимальное).
 * @param {number} decimalPlaces - Число знаков после зяпятой.
 * @return {number} - Число с плавающей точкой
 */
const getRandomFloat = (a, b, decimalPlaces = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(decimalPlaces);
};

/**
* Функция возвращающая случайный элемент массива.
*
* @param {array} elements - Массив с элементами.
* @return {object} - Элемент массива.
*/
const getRandomArrayElement = (elements) => {
  const result = elements[getRandomNumber(0, elements.length - 1)];
  return result;
};

/**
* Функция возвращающая массив случайной длины из списка значений.
* (без повторений).
*
* @param {array} list - список значений.
* @return {array} - массив значений.
*/
const getRandomList = (list) => {
  const count = getRandomNumber(0, list.length - 1);
  const selectionList = list.slice();
  const result = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = getRandomNumber(0, selectionList.length - 1);
    result.push(selectionList[randomIndex]);
    selectionList.splice(randomIndex, 1);
  }

  return result;
};

/**
* Функция возвращающая массив случайной длины из списка значений.
* (с повторениями).
*
* @param {array} list - список значений.
* @param {number} maxRange - максимальный размер длинны массива.
* @return {array} - массив значений.
*/
const getRandomArrayList = (list, maxRange = 10) => {
  const count = getRandomNumber(0, maxRange);
  const result = Array.from({ length: count }, () => list[getRandomNumber(0, list.length - 1)]);

  return result;
};

/**
* Функция дбавления в DOM сообщения об успешности/ошибке отправки данных
* на сервер.
*
* @param {boolean} isError - Признак ошибки.
*/
const showMessage = (isError) => {
  const resultMessage = (isError) ? errorMessageTemplate.cloneNode(true) : successMessageTemplate.cloneNode(true);
  body.append(resultMessage);

  resultMessage.addEventListener('click', () => {
    resultMessage.remove();
  });

  const onKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      document.removeEventListener('keydown', onKeydown);
      resultMessage.remove();
    }
  };

  document.addEventListener('keydown', onKeydown);
};

export {
  getRandomNumber,
  getRandomFloat,
  getRandomArrayElement,
  getRandomList,
  getRandomArrayList,
  isEscEvent,
  showMessage
};
