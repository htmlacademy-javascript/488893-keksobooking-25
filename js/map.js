import {setInactivePage, setActivePage} from './page-state.js';
import {renderCard} from './card.js';

setInactivePage();

/* Настройки карты и меток
  ========================================================================== */

const TOKYO_COORDINATES = {
  lat: 35.68302,
  lng: 139.75377,
};
const ZOOM_DEFAULT = 13;
const MAIN_PIN_SIZE = 52;
const DEFAULT_PIN_SIZE = 40;
const MAX_MARKERS = 10;

const addressField = document.querySelector('#address');

/* Определение карты и слоя для фильтров
  ========================================================================== */

/**
 * Функция возвращает текст с дефолтными координатами главной метки.
 *
 * @return {string} Координаты центра Токио в текстовом формате.
 */
const getDefaultCoordinates = () =>  `${TOKYO_COORDINATES.lat}, ${TOKYO_COORDINATES.lng}`;

const map = L.map('map-canvas')
  .on('load', () => {
    setActivePage();
    addressField.value = getDefaultCoordinates();
  })
  .setView(TOKYO_COORDINATES, ZOOM_DEFAULT);

const filterLayer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
);

/* Определение меток
  ========================================================================== */

const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [MAIN_PIN_SIZE, MAIN_PIN_SIZE],
  iconAnchor: [MAIN_PIN_SIZE / 2, MAIN_PIN_SIZE],
});

const defaultPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [DEFAULT_PIN_SIZE, DEFAULT_PIN_SIZE],
  iconAnchor: [DEFAULT_PIN_SIZE / 2, DEFAULT_PIN_SIZE],
});

const mainPinMarker = L.marker(TOKYO_COORDINATES, {
  draggable: true,
  icon: mainPinIcon
});

/**
 * Отрисовка меток и popup с описанием меток на слое карты.
 *
 * @param {object} layer - слой для добавления на него меток.
 * @param {object} data - Данные с объявлениями.
 */
const addOffersMarkers = (layer, data) => {
  data
    .slice(0, MAX_MARKERS)
    .forEach(({location, offer, author}) => {
      const marker = L.marker(
        location,
        {
          defaultPinIcon,
        }
      );

      marker
        .addTo(layer)
        .bindPopup(renderCard(author, offer));
    });
};

/**
 * Функция сброса значения центральной метки.
 */
const resetMarker = () => {
  mainPinMarker.setLatLng(TOKYO_COORDINATES);
  map.setView(TOKYO_COORDINATES, ZOOM_DEFAULT);
};

/* Создание карты и меток
  ========================================================================== */

const createMap = (offersData) => {
  filterLayer.addTo(map);
  mainPinMarker.addTo(map);
  addOffersMarkers(map, offersData);

  const address = document.querySelector('#address');

  mainPinMarker.on('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();
    address.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
  });
};

export {createMap, resetMarker, getDefaultCoordinates};
