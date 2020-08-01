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

   const deadLine = '2020-08-07';

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

         if (t.remainingTime <= 0) {
            clearInterval(timerUpdate);
         }
      }
   }
   setTimer(deadLine);

   //modal window

   const modalWindowTriggers = document.querySelectorAll('[data-modal]'),
      closeModalWindowTrigger = document.querySelector('[data-close]'),
      modal = document.querySelector('.modal'),
      contentInsideModal = modal.querySelector('.modal__dialog');

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

   closeModalWindowTrigger.addEventListener('click', closeModal);

   modal.addEventListener('click', (e) => {
      if (e.target == modal) {
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

   new MenuCard(
      "img/tabs/vegy.jpg",
      "vegy",
      'Меню "Фитнес"',
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      9,
      '.menu .container',

   ).render();

   new MenuCard(
      "img/tabs/elite.jpg",
      "elite",
      'Меню “Премиум”',
      'В меню “Премиум” мы используем не только красивый дизайн упаковки, нои качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без походав ресторан!',
      20,
      '.menu .container',
      'menu__item'
   ).render();

   new MenuCard(
      "img/tabs/post.jpg",
      "post",
      '"Меню "Постное"',
      'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствиепродуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильноеколичество белков за счет тофу и импортных вегетарианских стейков.',
      7,
      '.menu .container',
      'menu__item'
   ).render();

   //forms

   const message = {
      success: 'Спасибо! Мы с вами скоро свяжемся!',
      failure: 'Что то пошло не так...',
      loading: 'Загрузка...'
   };

   const forms = document.querySelectorAll('form');

   forms.forEach(item => {
      postData(item);
   });

   function postData(form) {
      form.addEventListener('submit', (e) => {
         e.preventDefault();

         const statusMessage = document.createElement('div');
         statusMessage.classList.add('status');
         statusMessage.textContent = message.loading;
         form.append(statusMessage);

         const request = new XMLHttpRequest();
         request.open('POST', 'server.php');

         request.setRequestHeader('Сontent-type', 'application/json');
         const formData = new FormData(form);

         const obj = {};
         formData.forEach((value, key) => {
            obj[key] = value;
         });

         const json = JSON.stringify(obj);

         request.send(json);

         request.addEventListener('load', () => {
            if (request.status === 200) {
               console.log(request.response);
               statusMessage.textContent = message.success;
               form.reset();
               setTimeout(() => {
                  statusMessage.remove();
               }, 2000);
            } else {
               statusMessage.textContent = message.failure;
            }
         });

      });
   }
});