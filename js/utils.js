const ESC_ALL_BROWSERS = 'Escape';
const ESC_IE = 'Esc';
const DEBOUNCE_TIME = 500;

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
* Функция дбавления в DOM сообщения об успешности/ошибке отправки данных
* на сервер.
* @param {boolean} isError - Признак ошибки.
*/
const showMessage = (isError) => {
  const resultMessage = (isError) ? errorMessageTemplate.cloneNode(true) : successMessageTemplate.cloneNode(true);
  body.append(resultMessage);

  resultMessage.addEventListener('click', () => resultMessage.remove());

  const onKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      document.removeEventListener('keydown', onKeydown);
      resultMessage.remove();
    }
  };

  document.addEventListener('keydown', onKeydown);
};

/**
 * Функция для устранения дребезга
 * @param {*} callback - Колбэк функция.
 * @param {*} timeoutDelay - Задержка выполнения функции.
 * @returns - Выполнение колбэк функции с задержкой.
 */
function debounce (callback, timeoutDelay = DEBOUNCE_TIME) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

/**
 * Событие при изменении элемента.
 * @param {object} element - Элемент фильтра в разметке.
 * @param {object} cb - Функция collback.
 */
const onChange = (element, cb) => {
  element.addEventListener('change', (evt) => {
    evt.preventDefault();
    cb();
  });
};

export {
  isEscEvent,
  showMessage,
  debounce,
  onChange
};
