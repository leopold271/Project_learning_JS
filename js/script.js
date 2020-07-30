//'use strict';
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

   modalWindowTriggers.forEach(btn => {
      btn.addEventListener('click', () => {
         modal.classList.add('show');
         modal.classList.remove('hide');
         document.documentElement.style.overflow = 'hidden';
      });
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



});