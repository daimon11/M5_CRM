'use strict';

const createRow = ({ id, title, category, units, price, count, discont, images }) => {
  const row = document.createElement('tr');
  row.id = id;
  row.innerHTML = `
  <td class="crm__table-td crm__table-td--pos_left">${id}</td>
  <td class="crm__table-td crm__table-td--pos_left">${title}</td>
  <td class="crm__table-td crm__table-td--pos_left">${category}</td>
  <td class="crm__table-td">${units}</td>
  <td class="crm__table-td">${count}</td>
  <td class="crm__table-td crm__table-td--pos_right">${price}</td>
  <td class="crm__table-td crm__table-td--pos_right">${(price * count) * (1 - discont / 100)}</td>
  <td class="crm__table-td crm__table-td--flex">
    <button class="crm__btn">
      ${images && (images.small || images.big) ?
        `<img
        class="img-product"
        src="./style/crm/icons/image-not.svg"
        alt="Изображение товара есть">` :
        `<img
          class="img-product"
          src="./style/crm/icons/image-yes.svg"
          alt="Изображение товара нет">`
    }
        </button>
        <button class="crm__btn">
          <img
            class="img-product"
            src="./style/crm/icons/button-correct.svg"
            alt="Иконка корректировки товара">
        </button>
        <button class="crm__btn">
          <img class="img-product"
            src="./style/crm/icons/button-delete.svg"
            alt="Иконка удаления товара">
        </button>
      </td>
  `;
  return row;
};

const table = document.querySelector('.crm__table-body');
const renderGoods = (arr) => {
  table.textContent = '';
  table.append(...arr.map(item => createRow(item)));
};

renderGoods(products);

// module 5 unit 5

const init = () => {
  const modalWindow = document.querySelector('.modal');
  const form = document.querySelector('.form');
  const addProductBtn = document.querySelector('.page .crm .crm__content .crm__head .crm__button');
  const closeBtn = document.querySelector('.form__button-window');

  addProductBtn.addEventListener('click', () => {
    modalWindow.classList.add('modal_visible');
  });

  form.addEventListener('click', event => {
    event.stopPropagation();
  });

  modalWindow.addEventListener('click', () => {
    modalWindow.classList.remove('modal_visible');
  });

  closeBtn.addEventListener('click', () => {
    modalWindow.classList.remove('modal_visible');
  });
};

init();