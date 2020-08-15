'use strict';

import tabs from './modules/tabs';
import timer from './modules/timer';
import modalWindow from './modules/modalwindow';
import menuCards from './modules/menucards';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';
import {
   openModal
} from './modules/modalwindow';

document.addEventListener('DOMContentLoaded', () => {
   const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 30000);

   tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
   timer('.timer', '2020-08-29');
   modalWindow('.modal', '[data-modal]', modalTimerId);
   menuCards();
   forms('form', modalTimerId);
   slider({
      container: '.offer__slider',
      slide: '.offer__slide',
      prevArrow: '.offer__slider-prev',
      nextArrow: '.offer__slider-next',
      totalCounter: '#total',
      currentCounter: '#current',
      field: '.offer__slider-inner',
      wrapper: '.offer__slider-wrapper'
   });
   calc();
});