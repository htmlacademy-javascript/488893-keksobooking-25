import {getData} from './server.js';
import {mapInit, addMapMarkers} from './map.js';
import {resetForm, addResetListener} from './form.js';
import {addFilterListener} from './filter.js';
import {startValidation} from './validation.js';
import {debounce} from './utils.js';
import {setInactiveFilterForm} from './page-state.js';

const pageActivate = () => {
  getData(
    (offers) => {
      startValidation(offers);
      addResetListener(debounce(() => resetForm(offers)));
      addMapMarkers(offers);
      addFilterListener(offers);
    },
    () => {
      setInactiveFilterForm();
    });
};

mapInit(pageActivate);
