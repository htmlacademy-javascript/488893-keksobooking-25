import {similarAds} from './data.js';
import {renderCard} from './card.js';
import {setInactivePage, setActivePage} from './form.js';

const mapCanvas = document.querySelector('#map-canvas');
const cards = renderCard(similarAds[0]);

mapCanvas.appendChild(cards);
setInactivePage();
setActivePage();
