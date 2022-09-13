'use strict';

const createRow = ({ id, title, category, units, price, count, discont, images }) => {
  const row = document.createElement('tr');
  row.classList.add('crm__table-row');
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
          <img class="img-del-btn"
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
  const addProductBtn = document.querySelector('.page .crm .crm__content .crm__head .crm__button');
  const table = document.querySelector('.crm__table-body');

  const deleteItem = (id, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (id == arr[i].id) {
        arr.splice(i, 1);
      };
    };
    console.log(arr);
  }

  addProductBtn.addEventListener('click', () => {
    modalWindow.classList.add('modal_visible');
  });

  modalWindow.addEventListener('click', e => {
    const target = e.target;
    console.log(target);
    if (target === modalWindow || target.closest('.form__button-window')
    || target.closest('.modal-wrapper')) {
      modalWindow.classList.remove('modal_visible');
    }
  });

  table.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.img-del-btn')) {
      let createID = target.closest('.crm__table-row').id;
      deleteItem(createID, products);
      target.closest('.crm__table-row').remove();
    }
  });
};

init();


