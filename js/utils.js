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
 * Проверка нажатия клавишы ESC.
 * @returns {boolean}
 */
const onEscKeydown = (evt) => evt.key === ESC_ALL_BROWSERS || evt.key === ESC_IE;

/**
* Добавление в DOM сообщения об успешности/ошибке отправки данных.
* @param {boolean} isError - Признак ошибки.
*/
const showMessage = (isError) => {
  const resultMessage = (isError) ? errorMessageTemplate.cloneNode(true) : successMessageTemplate.cloneNode(true);
  body.append(resultMessage);

  const onClick = (evt) => {
    evt.preventDefault();
    resultMessage.removeEventListener('click', onClick);
    resultMessage.remove();
  };

  const onKeydown = (evt) => {
    if (onEscKeydown(evt)) {
      evt.preventDefault();
      document.removeEventListener('keydown', onKeydown);
      resultMessage.remove();
    }
  };

  document.addEventListener('keydown', onKeydown);
  resultMessage.addEventListener('click', onClick);
};

/**
* Добавление в DOM сообщения об ошибке получения данных.
*/
const showErrorMessage = () => {
  const resultMessage = errorMessageTemplate.cloneNode(true);
  const textMessage = resultMessage.querySelector('.error__message');
  const buttonMessage = resultMessage.querySelector('.error__button');
  textMessage.textContent = 'Ошибка получения данных с сервера';
  buttonMessage.remove();

  body.append(resultMessage);

  const onClick = (evt) => {
    evt.preventDefault();
    resultMessage.removeEventListener('click', onClick);
    resultMessage.remove();
  };

  const onKeydown = (evt) => {
    if (onEscKeydown(evt)) {
      evt.preventDefault();
      document.removeEventListener('keydown', onKeydown);
      resultMessage.remove();
    }
  };

  document.addEventListener('keydown', onKeydown);
  resultMessage.addEventListener('click', onClick);
};

/**
 * Устранения дребезга.
 * @param {object} cb - Collback функция.
 * @param {number} timeoutDelay - Задержка выполнения функции.
 * @returns - Выполнение Collback функции с задержкой.
 */
const debounce = (cb, timeoutDelay = DEBOUNCE_TIME) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(null, rest), timeoutDelay);
  };
};

/**
 * Отслеживание изменения элемента.
 * @param {object} element - Отслеживаемый элемент.
 * @param {object} cb - Collback функция.
 */
const addChangeListener = (element, cb) => {
  element.addEventListener('change', (evt) => {
    evt.preventDefault();
    cb();
  });
};

export {
  showMessage,
  showErrorMessage,
  debounce,
  addChangeListener
};
