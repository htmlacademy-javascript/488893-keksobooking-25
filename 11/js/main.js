import {getData} from './server.js';
import {createMap} from './map.js';
import {onResetEvent} from './form.js';
import {onFilterChange} from './filter.js';
import {startValidation} from './validation.js';

getData((offers) => {
  createMap(offers);
  onResetEvent(offers);
  startValidation();
  onFilterChange(offers);
});
