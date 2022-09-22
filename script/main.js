// массив с данными
import { products } from './goods.js';

// функционал
import serviceStorage from './moduls/serviceStorage.js';
import modalWindow from './moduls/modalWindow.js';
import renderAndCreate from './moduls/renderAndCreate.js';
import itemsControl from './moduls/itemsControl.js';

const {
  getStorage,
} = serviceStorage;

const {
  discontControl,
  modalControl,
  formControl,
} = modalWindow;

const {
  renderGoods,
  totalSumTable,
} = renderAndCreate;

const {
  deleteItemInTable,
} = itemsControl;


// манипуляции с модальным окном


const init = () => {
  const modalWindow = document.querySelector('.modal');
  const addProductBtn =
    document.querySelector('.page .crm .crm__content .crm__head .crm__button');
  const table = document.querySelector('.crm__table-body');
  const discontInput =
    document.querySelector('.form__text-input--type_discont');
  const IDProduct = document.querySelector('.vendor-code__id');
  const checkbox = document.querySelector('.form__checkbox');
  const form = document.querySelector('.form');
  const list = document.querySelector('.crm__table-body');
  const inputPrice = document.querySelector('#price');
  const inputCount = document.querySelector('#count');
  const totalSumAllSpan = document.querySelector('.crm__bold-text');
  const finishSumProductSpan = document.querySelector('.form__bold-text');
  finishSumProductSpan.textContent = 0;

  const productsOrStorage = () => {
    if (getStorage().length === 0) {
      return products;
    } else {
      return getStorage();
    }
  };

  const CRMproducts = productsOrStorage();

  console.log('CRMproducts: ', CRMproducts);

  renderGoods(CRMproducts, table);
  totalSumAllSpan.textContent = totalSumTable();

  discontControl(modalWindow, discontInput, checkbox);
  modalControl(addProductBtn, modalWindow, IDProduct);
  deleteItemInTable(table, totalSumAllSpan, CRMproducts);
  formControl(
      form,
      list,
      IDProduct,
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


const a = `привет ` + `, ` + `работает`;
console.log(a);
