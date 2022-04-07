const PATCH = 'https://25.javascript.pages.academy/keksobooking';

/**
* Получение данных с сервера.
* @param {function} onSuccess - Collback функция при успешном получении данных.
* @param {object} onFail - Collback функция при ошибке отправки данных.
*/
const getData = (onSuccess, onFail) => {
  fetch(`${PATCH}/data`)
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      onFail();
    });
};

/**
* Отправка данных на сервер.
* @param {object} onSuccess - Collback функция при успешной отправки данных.
* @param {object} onFail - Collback функция при ошибке отправки данных.
* @param {object} body - Данные с формы.
*/
const sendData = (onSuccess, onFail, body) => {
  fetch(
    PATCH,
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
