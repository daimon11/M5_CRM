'use strict';

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
        src="./style/crm/icons/image-not.svg"
        alt="Изображение товара есть">` :
      `<img
          class="img-product"
          src="./style/crm/icons/image-yes.svg"
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

const table = document.querySelector('.crm__table-body');
const renderGoods = (arr) => {
  table.textContent = '';
  table.append(...arr.map(item => createRow(item)));
};

renderGoods(products);

// манипуляции с модальным окном

const totalSumTable = () => {
  const sums = document.querySelectorAll('.finish-sum');
  let result = 0;
  for (let i = 0; i < sums.length; i++) {
    result += +sums[i].innerText;
  }
  return result;
};

const addContactProducts = ({
  title,
  price,
  description,
  category,
  discont = false,
  count,
  units,
  images,
}, id) => {
  id = id.textContent;
  const contact = {
    'id': +`${id}`,
    'title': `${title}`,
    'price': +`${price}`,
    'description': `${description}`,
    'category': `${category}`,
    'discont': `${discont}`,
    'count': +`${count}`,
    'units': `${units}`,
    'images': `${images}`,
  };
  products.push(contact);
  console.log(products);
};

const addContactPage = (contact, list, id) => {
  contact.id = id.textContent;
  list.append(createRow(contact));
};

const deleteItem = (id, arr) => {
  id = +id;
  for (let i = 0; i < arr.length; i++) {
    if (id === arr[i].id) {
      arr.splice(i, 1);
    }
  }
  console.log(arr);
};

const closeModal = (modalWindow) => {
  modalWindow.classList.remove('modal_visible');
};

const createIdProduct = (span) => {
  span.textContent = '';
  const randomIntFromInterval = (min, max) => {
    const num = Math.floor(Math.random() * (max - min + 1) + min);
    return num;
  };
  span.textContent = randomIntFromInterval(200000000, 300000000);
};

const discontControl = (modalWindow, discontInput, checkbox) => {
  modalWindow.addEventListener('click', e => {
    const target = e.target;
    switch (true) {
      case (target.closest('.form__checkbox') &&
        discontInput.hasAttribute('disabled')):
        discontInput.removeAttribute('disabled');
        checkbox.name = 'discont-on';
        discontInput.style.background = '#F2F0F9';
        break;

      case (target.closest('.form__checkbox') &&
        checkbox.name === 'discont-on'):
        discontInput.setAttribute('disabled', 'disabled');
        checkbox.name = 'discont-off';
        discontInput.value = '';
        discontInput.style.background = '#EEEEEE';
        break;
      default:
        break;
    }
  });
};

const modalControl = (addProductBtn, modalWindow, IDProduct) => {
  addProductBtn.addEventListener('click', () => {
    modalWindow.classList.add('modal_visible');
    createIdProduct(IDProduct);
  });

  modalWindow.addEventListener('click', e => {
    const target = e.target;
    console.log(target);
    if (target === modalWindow || target.closest('.form__button-window') ||
      target.closest('.modal-wrapper')) {
      closeModal(modalWindow);
    }
  });
};

const deleteControl = (table, span) => {
  table.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.img-del-btn')) {
      const createID = target.closest('.crm__table-row').id;
      deleteItem(createID, products);
      target.closest('.crm__table-row').remove();
      span.textContent = totalSumTable();
    }
  });
};

const updateСostProduct = (form, span, price, count, discont) => {
  form.addEventListener('change', e => {
    const target = e.target;
    if (target === price || target === count || target === discont);
    span.textContent =
    Math.floor((
      `${(price.value * count.value) *
        (1 - discont.value / 100)}` * 100) / 100);
  });
};


const formControl = (
    form,
    list,
    IDProduct,
    modalWindow,
    spanCRM,
    spanForm,
    inputPrice,
    inputCount,
    discontInput,
) => {
  updateСostProduct(form, spanForm, inputPrice, inputCount, discontInput);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);
    console.log('newContact', newContact);
    console.log('products', products);
    addContactPage(newContact, list, IDProduct);
    addContactProducts(newContact, IDProduct);
    form.reset();
    closeModal(modalWindow);
    spanCRM.textContent = totalSumTable();
  });
};

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
  totalSumAllSpan.textContent = totalSumTable();
  const finishSumProductSpan = document.querySelector('.form__bold-text');
  finishSumProductSpan.textContent = 0;

  discontControl(modalWindow, discontInput, checkbox);
  modalControl(addProductBtn, modalWindow, IDProduct);
  deleteControl(table, totalSumAllSpan);
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
  );
};

init();


