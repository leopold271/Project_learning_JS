import {
   openModal,
   closeModal
}
from './modalwindow';

import {
   postData
} from '../services/services';

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

      openModal('.modal', modalTimerId);
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
         closeModal('.modal');
      }, 4000);
   }
   fetch('http://localhost:3000/menu')
      .then(data => data.json())
      .then(res => console.log(res));
}

export default forms;