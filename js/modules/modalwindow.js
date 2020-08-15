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

export default modalWindow;
export {
   closeModal
};
export {
   openModal
};