/**
* Функция получения данных с сервера HTML Academy.
* @param {function} onSuccess - Collback функция.
*/
const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    });
};

/**
* Функция отпраки данных на сервер HTML Academy.
* @param {object} onSuccess - Collback функция при успешной отправки данных.
* @param {object} onFail - Collback функция при ошибке отправки данных.
* @param {object} body - Данные с формы.
*/
const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
