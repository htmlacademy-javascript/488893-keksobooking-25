import {setActivePage} from './page-state.js';
import {renderCard} from './card.js';
import {getOffersRank} from './filter.js';

const ZOOM_DEFAULT = 13;
const MAIN_PIN_SIZE = 52;
const DEFAULT_PIN_SIZE = 40;
const MAX_MARKERS = 10;
const CenterMap = {
  lat: 35.68302,
  lng: 139.75377,
};

const addressField = document.querySelector('#address');

/**
 * Получение текста с координатами центра карты.
 * @return {string} - Текст с координатами центра карты .
 */
const getDefaultCoordinates = () =>  `${CenterMap.lat}, ${CenterMap.lng}`;

const map = L.map('map-canvas')
  .on('load', () => {
    setActivePage();
    addressField.value = getDefaultCoordinates();
  })
  .setView(CenterMap, ZOOM_DEFAULT);

const tileLayer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
);

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

const mainPinMarker = L.marker(CenterMap, {
  draggable: true,
  icon: mainPinIcon
});

const markerGroup = L.layerGroup().addTo(map);

/**
 * Создание маркера.
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
 * Сброс значения центральной метки.
 */
const resetMainMarker = () => {
  mainPinMarker.setLatLng(CenterMap);
  map.setView(CenterMap, ZOOM_DEFAULT);
};

/**
 * Сброс всех меток на карте.
 */
const resetMapMarkers = () => {
  markerGroup.clearLayers();
};

/**
 * Инициализация карты, отрисовка главного маркера.
 * @param {object} cb - Collback функция.
 */
const initMap = (cb) => {
  tileLayer.addTo(map);
  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();
    addressField.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
  });

  cb();
};

/**
 * Обновление карты после фильтрации (сброс и отрисовка меток).
 * @param {object} data - Данные для отрисовки меток.
 */
const updateMap = (data) => {
  resetMapMarkers();
  addMapMarkers(data);
};

export {
  initMap,
  resetMainMarker,
  getDefaultCoordinates,
  resetMapMarkers,
  addMapMarkers,
  updateMap
};
