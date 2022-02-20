/**
* Функция, возвращающая случайное целое число из переданного диапазона включительно.
* источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*
* @param {number} min - Минимальное значение диапазона.
* @param {number} max - Максимальное значение диапазона.
* @return {number} - Целое число
*/
function getRandomNumber(min, max) {
  if (min >= max) {
    return 0;
  }
  min = Math.ceil(min) <= 0 ? 0 : Math.ceil(min);
  max = Math.floor(max) <= 0 ? 0 : Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
* Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
*
* @param {number} min - Минимальное значение диапазона.
* @param {number} max - Максимальное значение диапазона.
* @param {number} decimalPlaces - Число знаков после зяпятой.
* @return {number} - Число с плавающей точкой
*/
function getRandomFloat(min, max, decimalPlaces) {
  if (min >= max) {
    return 0;
  }
  min = min <= 0 ? 0 : min;
  max = max <= 0 ? 0 : max;
  const randomFoat = ((Math.random() * (max - min + 1)) + min);
  return randomFoat.toFixed(decimalPlaces);
}

//Вызов функции для исключения ошибки esLint
getRandomNumber(1, 10);

//Вызов функции для исключения ошибки esLint
getRandomFloat(1, 10, 2);
