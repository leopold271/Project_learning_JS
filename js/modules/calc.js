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
}

export default calc;