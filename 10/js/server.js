const DATA_PATCH = 'https://25.javascript.pages.academy/keksobooking/data';
const SERVER_PATCH = 'https://25.javascript.pages.academy/keksobooking';

/**
* Функция получения данных с сервера HTML Academy.
* @param {function} onSuccess - Collback функция.
*/
const getData = (onSuccess) => {
  fetch(DATA_PATCH)
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
    SERVER_PATCH,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
