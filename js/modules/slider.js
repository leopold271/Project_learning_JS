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

export default slider;