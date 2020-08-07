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
      width = window.getComputedStyle(slidesWrapper).width;
   let slideIndex = 1,
      offset = 0;

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

   buttonNext.addEventListener('click', () => {
      if (offset == +width.slice(0, (width.length - 2)) * (slides.length - 1)) {
         offset = 0;
      } else {
         offset += +width.slice(0, (width.length - 2));
      }

      if (slideIndex == slides.length) {
         slideIndex = 1;
      } else {
         slideIndex++;
      }

      if (slideIndex < 10) {
         currSlideNum.textContent = `0${slideIndex}`;
      } else {
         currSlideNum.textContent = slideIndex;
      }

      slidesField.style.transform = `translateX(-${offset}px)`;
   });

   buttonPrev.addEventListener('click', () => {
      if (offset == 0) {
         offset = +width.slice(0, (width.length - 2)) * (slides.length - 1);
      } else {
         offset -= +width.slice(0, (width.length - 2));
      }

      if (slideIndex == 1) {
         slideIndex = slides.length;
      } else {
         slideIndex--;
      }

      if (slideIndex < 10) {
         currSlideNum.textContent = `0${slideIndex}`;
      } else {
         currSlideNum.textContent = slideIndex;
      }


      slidesField.style.transform = `translateX(-${offset}px)`;
   });





   // showSlides(1);

   // function addZeros() {
   //    if (slides.length < 10) {
   //       allSlideNum.textContent = `0${slides.length}`;
   //    } else {
   //       allSlideNum.textContent = '{slideIndex}';
   //    }
   // }

   // function showSlides(n) {
   //    if (slideIndex > slides.length) {
   //       slideIndex = 1;
   //    }
   //    if (slideIndex < 1) {
   //       slideIndex = slides.length;
   //    }

   //    addZeros();

   //    if (currSlideNum < 10) {
   //       currSlideNum.textContent = `0${slideIndex}`;
   //    } else {
   //       currSlideNum.textContent = '{slideIndex}';
   //    }

   //    document.querySelector('#current').textContent = `0${slideIndex}`;
   //    slides.forEach(slide => {
   //       slide.style.display = 'none';
   //    });

   //    slides[slideIndex - 1].style.display = '';
   // }

   // function changeSliderNumber(n) {
   //    slideIndex += n;
   // }

   // counter.addEventListener('click', (e) => {
   //    if (e.target === buttonNext) {
   //       changeSliderNumber(1);
   //       showSlides(slideIndex);
   //    }
   //    if (e.target === buttonPrev) {
   //       changeSliderNumber(-1);
   //       showSlides(slideIndex);
   //    }
   // });
});