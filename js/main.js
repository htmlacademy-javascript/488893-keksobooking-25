/**
* Функция, возвращающая случайное целое число из переданного диапазона включительно.
* источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
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
* Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
*
* @param {number} min - Минимальное значение диапазона.
* @param {number} max - Максимальное значение диапазона.
* @param {number} decimalPlaces - Число знаков после зяпятой.
* @return {number} - Число с плавающей точкой
*/
const getRandomFloat = (a, b, decimalPlaces = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(decimalPlaces);
};

//Вызов функции для исключения ошибки esLint
getRandomNumber(1, 10);

//Вызов функции для исключения ошибки esLint
getRandomFloat(1, 10, 2);
