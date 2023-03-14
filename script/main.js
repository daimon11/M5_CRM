const URL = 'https://quickest-cubic-pyroraptor.glitch.me/api/goods';

import renderAndCreate from './moduls/renderAndCreate.js';
import { deleteItemInTable } from './moduls/itemsControl.js';
import { changeProductRender, productsRender } from './moduls/httpRequest.js';

const {
  totalSumTable,
  showModal,
} = renderAndCreate;

const init = () => {
  const addProductBtn =
    document.querySelector('.page .crm .crm__content .crm__head .crm__button');
  const table = document.querySelector('.crm__table-body');
  const totalSumAllSpan = document.querySelector('.crm__bold-text');

  window.onload = productsRender(URL);

  totalSumAllSpan.textContent = totalSumTable();

  addProductBtn.addEventListener('click', () => {
    showModal(null, {
      title: null,
      category: null,
      units: null,
      description: null,
      count: null,
      price: null,
      discount: null,
    },
    'Добавить товар');
  });

  table.addEventListener('click', async ({ target }) => {
    if (target.closest('.correct-product')) {
      const id = target.closest('.crm__table-row').id;
      changeProductRender(`${URL}/${id}`);
    }
  });

  deleteItemInTable(table);
};

init();
