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
  isEscEvent,
  showMessage
};
