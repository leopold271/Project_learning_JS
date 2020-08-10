'use strict';
document.addEventListener('DOMContentLoaded', () => {
   //tabs

   const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

   function closeTabs() {
      tabsContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('show', 'fade');
         tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
         });
      });
   }

   function OpenTab(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
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

   //timer

   const deadLine = '2020-08-20';

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

   function setTimer(endtime) {
      const timer = document.querySelector('.timer'),
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
   setTimer(deadLine);

   //modal window

   const modalWindowTriggers = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal');

   function openModal() {
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.documentElement.style.overflow = 'hidden';
      clearInterval(modalTimerId);
   }

   modalWindowTriggers.forEach(btn => {
      btn.addEventListener('click', openModal);
   });

   function closeModal() {
      modal.classList.add('hide');
      modal.classList.remove('show');
      document.documentElement.style.overflow = '';
   }


   modal.addEventListener('click', (e) => {
      if (e.target == modal || e.target.getAttribute('data-close') == '') {
         closeModal();
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
         closeModal();
      }
   });

   const modalTimerId = setTimeout(openModal, 30000);

   function openModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
         openModal();
         window.removeEventListener('scroll', openModalByScroll);
      }
   }

   window.addEventListener('scroll', openModalByScroll);

   //menu
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

   const getResourcesForCards = async (url) => {
      const res = await fetch(url);
      if (!res.ok) {
         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }
      return await res.json();
   };

   // getResourcesForCards('http://localhost:3000/menu')
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
   //forms

   const message = {
      success: 'Спасибо! Мы с вами скоро свяжемся!',
      failure: 'Что то пошло не так...',
      loading: 'img/form/spinner.svg'
   };

   const forms = document.querySelectorAll('form');

   forms.forEach(item => {
      bindpostData(item);
   });

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
         postData('http://localhost:3000/requests', json)
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

      openModal();
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
         closeModal();
      }, 4000);
   }
   fetch('http://localhost:3000/menu')
      .then(data => data.json())
      .then(res => console.log(res));


   //slider 

   const buttonNext = document.querySelector('.offer__slider-next'),
      buttonPrev = document.querySelector('.offer__slider-prev'),
      slides = document.querySelectorAll('.offer__slide'),
      currSlideNum = document.querySelector('#current'),
      allSlideNum = document.querySelector('#total'),
      slidesWrapper = document.querySelector('.offer__slider-wrapper'),
      slidesField = document.querySelector('.offer__slider-inner'),
      width = window.getComputedStyle(slidesWrapper).width,
      slider = document.querySelector('.offer__slider');
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

   //calc

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

         true && false && true

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
});