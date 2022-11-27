import { httpRequest, httpRequestDel, productsRender } from './httpRequest.js';

// const renderErrModal = () => {
//   const modalError = document.createElement('div');
//   modalError.classList.add('modal-error');
//   modalError.innerHTML = `
//     <div class="error">
//       <div class="error__wrapper">
//         <button class="error__close-btn"></button>
//           <img src="./style/add-product/icons/err-icon.svg" alt="Изображение ошибки" class="error-img">
//         <p class="error__text">ЧТО-ТО ПОШЛО НЕ ТАК</p>
//       </div>
//     </div>
//   `;
// };

const deleteItemInTable = (table) => {
  table.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.img-del-btn')) {
      const id = target.closest('.crm__table-row').id;

      httpRequestDel(`http://localhost:3000/api/goods/${id}`);
    }
  });

  table.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.img-correct-product') &&
      target.closest('.img-product')) {
      const btn = target.closest('.img-correct-product');
      const url = btn.querySelector('.img-product').getAttribute('data-pic');
      const top = ((screen.height - 600) / 2);
      const left = ((screen.width - 600) / 2);
      open(url, '', 'width = 600,height = 600,top=' + top + ',left=' + left + '');
    }
  });
};

export default {
  deleteItemInTable,
};
