import serviceStorage from './serviceStorage.js';

const {
  setStorage,
} = serviceStorage;

const createRow = ({
  id,
  title,
  category,
  units,
  price,
  count,
  discont = 0,
  images,
}) => {
  if (discont === 'false') {
    discont = false;
  }

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
  <td class="crm__table-td crm__table-td--pos_right finish-sum">
    ${(price * count) * (1 - discont / 100)}
  </td>
  <td class="crm__table-td crm__table-td--flex">
    <button class="crm__btn">
      ${images && (images.small || images.big) ?
      `<img
        class="img-product"
        src="./style/crm/icons/image-yes.svg"
        alt="Изображение товара есть">` :
      `<img
          class="img-product"
          src="./style/crm/icons/image-not.svg"
          alt="Изображение товара нет">`}
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

const renderGoods = (arr, elem) => {
  elem.append(...arr.map(item => createRow(item)));
  setStorage('CRMproducts', arr);
};

const totalSumTable = () => {
  const sums = document.querySelectorAll('.finish-sum');
  let result = 0;
  for (let i = 0; i < sums.length; i++) {
    result += +sums[i].innerText;
  }
  return result;
};

export default {
  createRow,
  renderGoods,
  totalSumTable,
};

