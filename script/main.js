const URL = 'http://localhost:3000/api/goods';

import modalWindow from './moduls/modalWindow.js';
import renderAndCreate from './moduls/renderAndCreate.js';
import itemsControl from './moduls/itemsControl.js';
import {productsRender} from './moduls/httpRequest.js';

const {
  discontControl,
  modalControl,
  formControl,
  btnImg,
} = modalWindow;

const {
  totalSumTable,
} = renderAndCreate;

const {
  deleteItemInTable,
} = itemsControl;

const init = () => {
  const modalWindow = document.querySelector('.modal');
  const addProductBtn =
    document.querySelector('.page .crm .crm__content .crm__head .crm__button');
  const table = document.querySelector('.crm__table-body');
  const discontInput =
    document.querySelector('.form__text-input--type_discont');
  const checkbox = document.querySelector('.form__checkbox');
  const form = document.querySelector('.form');
  const inputPrice = document.querySelector('#price');
  const inputCount = document.querySelector('#count');
  const inputHidden = document.querySelector('.form__text-input--hidden');
  const totalSumAllSpan = document.querySelector('.crm__bold-text');
  const finishSumProductSpan = document.querySelector('.form__bold-text');
  finishSumProductSpan.textContent = 0;

  const CRMproducts = productsRender(URL);

  totalSumAllSpan.textContent = totalSumTable();

  discontControl(modalWindow, discontInput, checkbox);
  btnImg(modalWindow, inputHidden);
  modalControl(addProductBtn, modalWindow);
  deleteItemInTable(table);
  formControl(
      form,
      modalWindow,
      totalSumAllSpan,
      finishSumProductSpan,
      inputPrice,
      inputCount,
      discontInput,
      CRMproducts,
  );
};

init();
