import {getData} from './server.js';
import {mapInit, addMapMarkers} from './map.js';
import {resetForm, addResetListener} from './form.js';
import {addFilterListener} from './filter.js';
import {startValidation} from './validation.js';
import {debounce, showErrorMessage} from './utils.js';
import {activateFilterForm} from './page-state.js';

const pageActivate = () => {
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

mapInit(pageActivate);
