/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calc() {
   const result = document.querySelector('.calculating__result span');
   let sex, weight, height, age, levelOfActivity;

   if (localStorage.getItem('sex')) {
      sex = localStorage.getItem('sex');
   } else {
      localStorage.setItem('sex', 'male');
      sex = 'male';
   }

   if (localStorage.getItem('levelOfActivity')) {
      levelOfActivity = localStorage.getItem('levelOfActivity');
   } else {
      localStorage.setItem('levelOfActivity', 1.375);
      levelOfActivity = 1.375;
   }

   function calcCalories() {
      if (!sex || !weight || !height || !age || !levelOfActivity) {
         result.textContent = '____';
         return;
      }

      if (sex === 'female') {
         result.textContent = Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * (levelOfActivity));
      } else {
         result.textContent = Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * (levelOfActivity));
      }
   }

   calcCalories();

   function initLocalSettings(selector, activeClass) {
      const elements = document.querySelectorAll(selector);

      elements.forEach(element => {
         element.classList.remove(activeClass);

         if (element.getAttribute('id') === localStorage.getItem('sex')) {
            element.classList.add(activeClass);
         }

         if (element.getAttribute('data-ratio') === localStorage.getItem('levelOfActivity')) {
            element.classList.add(activeClass);
         }
      });
   }

   initLocalSettings('#gender div', 'calculating__choose-item_active');
   initLocalSettings('#activity div', 'calculating__choose-item_active');

   function getSexAndActivity(selector, activeClass) {
      const elements = document.querySelectorAll(selector);

      elements.forEach(element => {
         element.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
               levelOfActivity = +e.target.getAttribute('data-ratio');
               localStorage.setItem('levelOfActivity', +e.target.getAttribute('data-ratio'));
            } else {
               sex = e.target.getAttribute('id');
               localStorage.setItem('sex', e.target.getAttribute('id'));
            }

            elements.forEach(element => {
               element.classList.remove(activeClass);
            });

            e.target.classList.add(activeClass);

            calcCalories();
         });
      });

   }

   getSexAndActivity('#gender div', 'calculating__choose-item_active');
   getSexAndActivity('#activity div', 'calculating__choose-item_active');

   function getInputInfo(selector) {
      const input = document.querySelector(selector);

      input.addEventListener('input', (e) => {

         if (input.value.match(/\D/g)) {
            input.style.border = '4px solid red';
         } else {
            input.style.border = '';
         }

          false && false

         switch (input.getAttribute('id')) {
            case 'height':
               height = +e.target.value;
               break;
            case 'weight':
               weight = +e.target.value;
               break;
            case 'age':
               age = +e.target.value;
               break;
         }
         calcCalories();
      });
   }
   getInputInfo('#age');
   getInputInfo('#weight');
   getInputInfo('#height');
}

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modalwindow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modalwindow */ "./js/modules/modalwindow.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");




function forms(formSelector, modalTimerId) {
   const message = {
      success: 'Спасибо! Мы с вами скоро свяжемся!',
      failure: 'Что то пошло не так...',
      loading: 'img/form/spinner.svg'
   };

   const forms = document.querySelectorAll(formSelector);

   forms.forEach(item => {
      bindpostData(item);
   });

   function bindpostData(form) {
      form.addEventListener('submit', (e) => {
         e.preventDefault();

         const statusMessage = document.createElement('img');
         statusMessage.src = message.loading;
         statusMessage.style.cssText = `
         display: block;
         margin: 0 auto;
         `;
         form.insertAdjacentElement('afterend', statusMessage);

         const formData = new FormData(form);

         const json = JSON.stringify(Object.fromEntries(formData.entries()));

         const obj = {};
         formData.forEach((value, key) => {
            obj[key] = value;
         });
         Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["postData"])('http://localhost:3000/requests', json)
            .then((data) => {
               console.log(data);
               showThanksModal(message.success);
               statusMessage.remove();
            }).catch(() => {
               showThanksModal(message.failure);
            }).finally(() => {
               form.reset();
            });
      });
   }

   function showThanksModal(message) {
      const prevModal = document.querySelector('.modal__dialog');
      prevModal.classList.add('hide');

      Object(_modalwindow__WEBPACK_IMPORTED_MODULE_0__["openModal"])('.modal', modalTimerId);
      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
      <div class="modal__content">
      <div data-close class="modal__close">×</div>
      <div class="modal__title">${message}</div> 
      </div>
      `;

      document.querySelector('.modal').append(thanksModal);

      setTimeout(() => {
         thanksModal.remove();
         prevModal.classList.add('show');
         prevModal.classList.remove('hide');
         Object(_modalwindow__WEBPACK_IMPORTED_MODULE_0__["closeModal"])('.modal');
      }, 4000);
   }
   fetch('http://localhost:3000/menu')
      .then(data => data.json())
      .then(res => console.log(res));
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/menucards.js":
/*!*********************************!*\
  !*** ./js/modules/menucards.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function menuCards() {
   class MenuCard {
      constructor(src, alt, subtitle, text, price, parent, ...classes) {
         this.src = src;
         this.alt = alt;
         this.subtittle = subtitle;
         this.text = text;
         this.price = price;
         this.course = 27;
         this.classes = classes;
         this.parent = document.querySelector(parent);
         this.changeToUa();
      }

      changeToUa() {
         this.price = this.price * this.course;
      }

      render() {
         const element = document.createElement('div');
         if (this.classes.length == 0) {
            this.element = 'menu__item';
            element.classList.add(this.element);
         } else {
            this.classes.forEach(className => element.classList.add(className));
         }


         element.innerHTML = `
         <img src=${this.src} alt=${this.alt}>
         <h3 class="menu__item-subtitle">${this.subtittle}</h3>
         <div class="menu__item-descr">${this.text}</div>
         <div class="menu__item-divider"></div>
         <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
         </div>
         `;
         this.parent.append(element);
      }
   }

   // getResource('http://localhost:3000/menu')
   //    .then(data => {
   //       data.forEach(({
   //          img,
   //          altimg,
   //          title,
   //          descr,
   //          price
   //       }) => {
   //          new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
   //       });
   //    });

   axios.get('http://localhost:3000/menu')
      .then(data => {
         data.data.forEach(({
            img,
            altimg,
            title,
            descr,
            price
         }) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
         });
      });
}

/* harmony default export */ __webpack_exports__["default"] = (menuCards);

/***/ }),

/***/ "./js/modules/modalwindow.js":
/*!***********************************!*\
  !*** ./js/modules/modalwindow.js ***!
  \***********************************/
/*! exports provided: default, closeModal, openModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModal", function() { return closeModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openModal", function() { return openModal; });
function openModal(modalSelector, modalTimerId) {
   const modal = document.querySelector(modalSelector);

   modal.classList.add('show');
   modal.classList.remove('hide');
   document.documentElement.style.overflow = 'hidden';

   console.log(modalTimerId);
   if (modalTimerId) {
      clearInterval(modalTimerId);
   }
}

function closeModal(modalSelector) {
   const modal = document.querySelector(modalSelector);

   modal.classList.add('hide');
   modal.classList.remove('show');
   document.documentElement.style.overflow = '';
}

function modalWindow(modalSelector, triggerSelector, modalTimerId) {
   const modalWindowTriggers = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector);


   modalWindowTriggers.forEach(btn => {
      btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
   });

   modal.addEventListener('click', (e) => {
      if (e.target == modal || e.target.getAttribute('data-close') == '') {
         closeModal(modalSelector);
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
         closeModal(modalSelector);
      }
   });



   function openModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
         openModal(modalSelector, modalTimerId);
         window.removeEventListener('scroll', openModalByScroll);
      }
   }

   window.addEventListener('scroll', openModalByScroll);
}

/* harmony default export */ __webpack_exports__["default"] = (modalWindow);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function slider({
   container,
   slide,
   prevArrow,
   nextArrow,
   totalCounter,
   currentCounter,
   field,
   wrapper
}) {
   const buttonNext = document.querySelector(nextArrow),
      buttonPrev = document.querySelector(prevArrow),
      slides = document.querySelectorAll(slide),
      currSlideNum = document.querySelector(currentCounter),
      allSlideNum = document.querySelector(totalCounter),
      slidesWrapper = document.querySelector(wrapper),
      slidesField = document.querySelector(field),
      width = window.getComputedStyle(slidesWrapper).width,
      slider = document.querySelector(container);
   let slideIndex = 1,
      offset = 0,
      dotsMassive = [];

   if (slides.length < 10) {
      allSlideNum.textContent = `0${slides.length}`;
      currSlideNum.textContent = `0${slideIndex}`;
   } else {
      allSlideNum.textContent = slides.length;
      if (slideIndex >= 10) {
         currSlideNum.textContent = slideIndex;
      }
   }

   slidesField.style.width = 100 * slides.length + '%';
   slidesField.style.display = 'flex';
   slidesField.style.transition = '0.5s all';

   slidesWrapper.style.overflow = 'hidden';

   slides.forEach(slide => {
      slide.style.width = width;
   });

   slider.style.position = 'relative';

   const dots = document.createElement('ol');
   dots.classList.add('carousel-indicators');


   for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dotsMassive.push(dot);
      dot.classList.add('dot');
      dot.setAttribute('data-slide', i + 1);
      dots.append(dot);
   }
   slider.append(dots);
   dotsMassive[slideIndex - 1].style.opacity = 1;

   function changeActiveDot() {
      dotsMassive.forEach(dot => {
         dot.style.opacity = 0.6;
      });
      dotsMassive[slideIndex - 1].style.opacity = 1;
   }

   function changeCurrSlide() {
      slidesField.style.transform = `translateX(-${offset}px)`;
   }

   function changeCurrSlideNum() {
      if (slideIndex < 10) {
         currSlideNum.textContent = `0${slideIndex}`;
      } else {
         currSlideNum.textContent = slideIndex;
      }
   }

   function noDigitsInStr(str) {
      return +str.replace(/\D/g, ' ');
   }

   buttonNext.addEventListener('click', () => {
      if (offset == noDigitsInStr(width) * (slides.length - 1)) {
         offset = 0;
      } else {
         offset += noDigitsInStr(width);
      }

      if (slideIndex == slides.length) {
         slideIndex = 1;
      } else {
         slideIndex++;
      }

      changeActiveDot();
      changeCurrSlide();
      changeCurrSlideNum();
   });

   buttonPrev.addEventListener('click', () => {
      if (offset == 0) {
         offset = noDigitsInStr(width) * (slides.length - 1);
      } else {
         offset -= noDigitsInStr(width);
      }

      if (slideIndex == 1) {
         slideIndex = slides.length;
      } else {
         slideIndex--;
      }

      changeActiveDot();
      changeCurrSlide();
      changeCurrSlideNum();
   });

   dotsMassive.forEach(dot => {
      dot.addEventListener('click', (e) => {
         const slideTo = dot.getAttribute('data-slide');

         slideIndex = slideTo;
         offset = (slideTo - 1) * noDigitsInStr(width);

         changeActiveDot();
         changeCurrSlide();
         changeCurrSlideNum();

      });
   });
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, tabsActiveClass) {
   const tabs = document.querySelectorAll(tabsSelector),
      tabsContent = document.querySelectorAll(tabsContentSelector),
      tabsParent = document.querySelector(tabsParentSelector);

   function closeTabs() {
      tabsContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('show', 'fade');
         tabs.forEach(item => {
            item.classList.remove(tabsActiveClass);
         });
      });
   }

   function OpenTab(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add(tabsActiveClass);
   }

   closeTabs();
   OpenTab(2);
   tabsParent.addEventListener('click', (e) => {
      const target = e.target;
      if (target) {
         tabs.forEach((item, i) => {
            if (e.target == item) {
               closeTabs();
               OpenTab(i);
            }
         });
      }
   });
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timer(id, deadLine) {

   function timeUntilEnd(endtime) {
      const t = Date.parse(endtime) - Date.parse(new Date()),
         days = Math.round(t / 1000 / 60 / 60 / 24),
         hours = Math.round((t / 1000 / 60 / 60) % 24),
         minutes = Math.round((t / 1000 / 60) % 60),
         seconds = Math.round((t / 1000) % 60);
      return {
         remainingTime: t,
         days: days,
         hours: hours,
         minutes: minutes,
         seconds: seconds
      };
   }

   function plusZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

   function setTimer(id, endtime) {
      const timer = document.querySelector(id),
         days = timer.querySelector('#days'),
         hours = timer.querySelector('#hours'),
         minutes = timer.querySelector('#minutes'),
         seconds = timer.querySelector('#seconds'),
         timerUpdate = setInterval(updateClock, 1000);

      updateClock();

      function updateClock() {
         const t = timeUntilEnd(endtime);
         days.innerHTML = plusZero(t.days);
         hours.innerHTML = plusZero(t.hours);
         minutes.innerHTML = plusZero(t.minutes);
         seconds.innerHTML = plusZero(t.seconds);

         // TODO: figure out why remainingTime < 0 and interval is cleared
         if (t.remainingTime <= 0) {
            clearInterval(timerUpdate);
         }
      }
   }
   setTimer(id, deadLine);
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modalwindow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modalwindow */ "./js/modules/modalwindow.js");
/* harmony import */ var _modules_menucards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/menucards */ "./js/modules/menucards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");











document.addEventListener('DOMContentLoaded', () => {
   const modalTimerId = setTimeout(() => Object(_modules_modalwindow__WEBPACK_IMPORTED_MODULE_2__["openModal"])('.modal', modalTimerId), 30000);

   Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
   Object(_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])('.timer', '2020-08-29');
   Object(_modules_modalwindow__WEBPACK_IMPORTED_MODULE_2__["default"])('.modal', '[data-modal]', modalTimerId);
   Object(_modules_menucards__WEBPACK_IMPORTED_MODULE_3__["default"])();
   Object(_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerId);
   Object(_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
      container: '.offer__slider',
      slide: '.offer__slide',
      prevArrow: '.offer__slider-prev',
      nextArrow: '.offer__slider-next',
      totalCounter: '#total',
      currentCounter: '#current',
      field: '.offer__slider-inner',
      wrapper: '.offer__slider-wrapper'
   });
   Object(_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
});

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! exports provided: postData, getResource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postData", function() { return postData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResource", function() { return getResource; });
const postData = async (url, data) => {
   const res = await fetch(url, {
      method: 'POST',
      headers: {
         'Content-type': 'application/json'
      },
      body: data
   });
   return await res.json();
};

const getResource = async (url) => {
   const res = await fetch(url);
   if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
   }
   return await res.json();
};



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map