import {getData} from './server.js';
import {createMap} from './map.js';
import {resetForm, onResetEvent, onAvatarChange, onImagesChange} from './form.js';
import {onFilterChange} from './filter.js';
import {startValidation} from './validation.js';
import {debounce} from './utils.js';

getData((offers) => {
  createMap(offers);
  onResetEvent(debounce(() => resetForm(offers)));
  onFilterChange(offers);
  startValidation(offers);
  onAvatarChange();
  onImagesChange();
});
