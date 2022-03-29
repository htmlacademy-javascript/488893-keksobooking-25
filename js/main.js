import {startValidation} from './form.js';
import {createMap} from './map.js';
import {getData} from './server.js';

getData((offers) => {
  createMap(offers);
});

startValidation();
