const URL = 'https://quickest-cubic-pyroraptor.glitch.me/api/goods';

import renderAndCreate from './moduls/renderAndCreate.js';
import { deleteItemInTable } from './moduls/itemsControl.js';
import { changeProductRender, productsRender } from './moduls/httpRequest.js';

const {
  totalSumTable,
  showModal,
} = renderAndCreate;

const init = () => {
  const amountElements = document.querySelector('.crm__number-elements');
  amountElements.addEventListener('change', () => {
    productsRender(URL, amountElements.value);
  });

  const addProductBtn =
    document.querySelector('.page .crm .crm__content .crm__head .crm__button');
  const table = document.querySelector('.crm__table-body');
  const totalSumAllSpan = document.querySelector('.crm__bold-text');

  window.onload = productsRender(URL, amountElements.value);

  totalSumAllSpan.textContent = totalSumTable();

  addProductBtn.addEventListener('mouseover', () => {
    addProductBtn.style.color = 'violet';
  })

  addProductBtn.addEventListener('mouseout', () => {
    addProductBtn.style.color = '';
  })

  addProductBtn.addEventListener('click', () => {
    showModal(null, {
      title: null,
      category: null,
      units: null,
      description: null,
      count: null,
      price: null,
      discount: null,
      image: null,
    },
      amountElements.value,
      'Добавить товар');
  });

  table.addEventListener('click', async ({ target }) => {
    if (target.closest('.correct-product')) {
      const id = target.closest('.crm__table-row').id;
      changeProductRender(`${URL}/${id}`, amountElements.value);
    }
  });


  deleteItemInTable(table, amountElements.value);


};

init();

// доделать:
//* 1) Баг - при внесении изменений в товар пропадает изображение
//! 2) узнать как работает фильтр
//* 3) разобраться с пагинацией
//* 4) добавить модальное окно при удалении 
//* 5) Добавить варианты выбора в графу "категории в модальном окне"
//! 6) добавить кнопку удаления при наведении картинку товара в модальном окне
//* 7) Перекинуть пагинацию в отдельный блок js
//! 8) Реализовать поисковик
