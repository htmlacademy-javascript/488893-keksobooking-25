import {setInactivePage, setActivePage} from './page-state.js';
import {similarAds} from './data.js';
import {renderCard} from './card.js';

const address = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');

setInactivePage();

const map = L.map('map-canvas')
  .on('load', () => {
    setActivePage();
  })
  .setView({
    lat: 35.6574,
    lng: 139.7785,
  }, 10)
  .setZoom(12.45);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.6574,
    lng: 139.7785,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  address.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
});

const markerIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const addOffersMarkers = (mapLayer) => {
  similarAds.forEach(({location, offer, author}) => {
    const lat = location.lat;
    const lng = location.lng;
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        markerIcon,
      }
    );

    marker
      .addTo(mapLayer)
      .bindPopup(renderCard(author, offer));
  });
};

addOffersMarkers(map);

resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: 35.6574,
    lng: 139.7785,
  });

  map.setView({
    lat: 35.6574,
    lng: 139.7785,
  }, 10)
    .setZoom(12.45);

  addOffersMarkers(map);
});
