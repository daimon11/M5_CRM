export const totalSumTable = () => {
  const sums = document.querySelectorAll('.finish-sum');
  let result = 0;
  for (let i = 0; i < sums.length; i++) {
    result += +sums[i].innerText;
  }
  return result;
};

const createRow = ({
  id,
  title,
  category,
  units,
  price,
  count,
  discont = 0,
  image,
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
    <button 
    class="crm__btn img-correct-product">
      ${(image !== 'image/notimage.jpg') ?
      `<img
        class="img-product"
        src="./style/crm/icons/image-yes.svg"
        data-pic="http://www.mobileui.cn/blog/uploads/2012/07/161029fNL.jpg"
        alt="Изображение товара есть"` :
      `<img
          class="no-img-product"
          src="./style/crm/icons/image-not.svg"
          alt="Изображение товара нет">`}
    </button>
        <button class="crm__btn correct-product">
          <img
            class="button-correct"
            src="./style/crm/icons/button-correct.svg"
            alt="Иконка корректировки товара">
        </button>
        <button class="crm__btn del-product">
          <img class="img-del-btn"
            src="./style/crm/icons/button-delete.svg"
            alt="Иконка удаления товара">
        </button>
      </td>
  `;
  return row;
};

const renderGoods = async (err, arr) => {
  const totalSumAllSpan = document.querySelector('.crm__bold-text');
  const spanSumBlock = totalSumAllSpan.closest('.crm__finish-price');
  const elem = document.querySelector('.crm__table-body');
  elem.innerHTML = '';

  console.log('renderGoods arr = ', arr);

  if (err) {
    const h2 = document.createElement('h2');
    h2.style.color = 'red';
    h2.textContent = err;
    elem.append(h2);
    return;
  }

  elem.append(...arr.map(item => createRow(item)));
  totalSumAllSpan.textContent = totalSumTable();
  spanSumBlock.classList.remove('visually-hidden');
};

export default {
  createRow,
  renderGoods,
  totalSumTable,
};

