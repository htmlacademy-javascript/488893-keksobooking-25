import {setActivePage} from './page-state.js';
import {renderCard} from './card.js';
import {getOffersRank} from './filter.js';

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

const tileLayer = L.tileLayer(
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

const markerGroup = L.layerGroup().addTo(map);

/**
 * Функция создания маркера.
 * @param {object} point - Координаты метки.
 * @param {object} data - Данные с обьявлением.
 * @param {string} author - Автор объявления.
 */
const createMarker = (point, data, author) => {
  const marker = L.marker(
    point,
    {
      defaultPinIcon,
    }
  );

  marker
    .addTo(markerGroup)
    .bindPopup(renderCard(author, data));
};

/**
 * Отрисовка меток на слое карты.
 * @param {object} data - Данные с объявлениями.
 */
const addMapMarkers = (data) => {
  data
    .slice()
    .filter((element) => getOffersRank(element.offer) > 0)
    .slice(0, MAX_MARKERS)
    .forEach(({location, offer, author}) => {
      createMarker(location, offer, author);
    });
};

/**
 * Функция сброса значения центральной метки.
 */
const resetMainMarker = () => {
  mainPinMarker.setLatLng(TOKYO_COORDINATES);
  map.setView(TOKYO_COORDINATES, ZOOM_DEFAULT);
};

/**
 * Функция сброса меток на карте.
 */
const resetMapMarkers = () => {
  markerGroup.clearLayers();
};

/* Создание карты и меток
  ========================================================================== */

const mapInit = (cb) => {
  tileLayer.addTo(map);
  mainPinMarker.addTo(map);

  const address = document.querySelector('#address');

  mainPinMarker.on('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();
    address.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
  });

  cb();
};

/**
 * Функция обновления карты после фильтрации.
 * @param {object[]} data - Данные объявляений для отрисовки
 */
const updateMap = (data) => {
  resetMapMarkers();
  addMapMarkers(data);
};

export {
  mapInit,
  resetMainMarker,
  getDefaultCoordinates,
  resetMapMarkers,
  addMapMarkers,
  updateMap
};
