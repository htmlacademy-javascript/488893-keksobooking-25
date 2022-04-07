
import {activateFilterForm} from './page.js';
import {getData} from './server.js';
import {initMap, addMapMarkers} from './map.js';
import {resetForm, addResetListener} from './form.js';
import {addFilterListener} from './filter.js';
import {startValidation} from './validation.js';
import {debounce, showErrorMessage} from './utils.js';

/**
 * Запуск ключевых функций после активации страницы.
 */
const activatePage = () => {
  getData(
    (offers) => {
      activateFilterForm();
      startValidation(() => resetForm(offers));
      addResetListener(debounce(() => resetForm(offers)));
      addMapMarkers(offers);
      addFilterListener(offers);
    },
    () => {
      showErrorMessage();
      startValidation();
      addResetListener(debounce(() => resetForm()));
    });
};

initMap(activatePage);
