import { modalControl, formControl, sumOfGood } from './modalWindow.js';

const styles = new Map();

export const totalSumTable = () => {
  const sums = document.querySelectorAll('.finish-sum');
  let result = 0;
  for (let i = 0; i < sums.length; i++) {
    result += +sums[i].innerText;
  }
  return result;
};

const loadStyle = (url) => {
  if (styles.has(url)) {
    return styles.get(url);
  }

  const stylePromise = new Promise((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.addEventListener('load', () => {
      resolve();
    });
    document.head.append(link);
  });

  styles.set(url, stylePromise);

  return stylePromise;
};

const createLabel = (
    params,
    data = {},
) => {
  const label = document.createElement('label');
  label.classList.add('form__label');
  if (params.positionLabel) {
    label.classList.add(params.positionLabel);
  }

  const span = document.createElement('span');
  span.classList.add('form__label-name');
  span.textContent = params.textContentSpan;

  const elem = document.createElement(params.element);
  elem.classList.add('form__text-input');
  elem.setAttribute('type', params.type);
  elem.setAttribute('name', params.name);
  elem.setAttribute('id', params.name);
  elem.setAttribute('required', 'required');
  if (data) elem.value = data;

  label.span = span;
  label.elem = elem;

  label.append(span, elem);

  return label;
};

export const showModal = async (err, data) => {
  await loadStyle('style/add-product/add-product.css');
  console.log('showModal', data);
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.id = 'openModal';

  const form = document.createElement('form');
  form.classList.add('form');
  form.id = 'my-form';

  const container = document.createElement('div');
  container.classList.add('container');


  const titleWrapper = document.createElement('div');
  titleWrapper.classList.add('form__title-wrapper');
  const formTitle = document.createElement('h2');
  formTitle.classList.add('form__title');
  formTitle.textContent = 'Добавить товар';
  titleWrapper.append(formTitle);

  const buttonWindow = document.createElement('button');
  buttonWindow.classList.add('form__button-window');
  buttonWindow.setAttribute('type', 'reset');


  const formBox = document.createElement('fieldset');
  formBox.classList.add('form__box');

  const labelName = createLabel({
    element: 'input',
    positionLabel: 'form__label--position_left',
    name: 'title',
    type: 'text',
    textContentSpan: 'Наименование',
  }, data.title);

  const labelCategory = createLabel({
    element: 'input',
    positionLabel: 'form__label--position_left',
    name: 'category',
    type: 'text',
    textContentSpan: 'Категория',
  }, data.category);

  const labelUnits = createLabel({
    element: 'input',
    positionLabel: 'form__label--position_left',
    name: 'units',
    type: 'text',
    textContentSpan: 'Единицы измерения',
  }, data.units);

  const checkboxWrapper = document.createElement('div');
  checkboxWrapper.classList.add('form__div');
  const checkboxLabel = document.createElement('label');
  checkboxLabel.classList.add('form__label');
  const checkboxInput = document.createElement('input');
  checkboxInput.classList.add('form__checkbox');
  checkboxInput.setAttribute('type', 'checkbox');
  checkboxLabel.append(checkboxInput);
  const labelDiscount = createLabel({
    element: 'input',
    positionLabel: null,
    name: 'units',
    type: 'number',
    textContentSpan: 'Дисконт',
  });
  labelDiscount.elem.classList.add('form__text-input--type_discont');
  labelDiscount.elem.setAttribute('id', 'discont');
  if (data.discount) {
    console.log('discont-on');
    labelDiscount.elem.value = data.discount;
    checkboxInput.setAttribute('name', 'discont-on');
    checkboxInput.checked = true;
  } else {
    console.log('discont-off');
    labelDiscount.elem.setAttribute('disabled', 'disabled');
    checkboxInput.setAttribute('name', 'discont-off');
  }
  checkboxWrapper.append(checkboxLabel, labelDiscount);

  const labelDescription = createLabel({
    element: 'textarea',
    positionLabel: 'form__label--great_height',
    name: 'description',
    type: 'text',
    textContentSpan: 'Описание',
  }, data.description);
  labelDescription.elem.classList.add('form__description');

  const labelCount = createLabel({
    element: 'input',
    positionLabel: 'form__label--position_right',
    name: 'count',
    type: 'number',
    textContentSpan: 'Количество',
  }, data.count);

  const labelPrice = createLabel({
    element: 'input',
    positionLabel: 'form__label--position_right',
    name: 'price',
    type: 'number',
    textContentSpan: 'Цена',
  }, data.price);

  const formFooter = document.createElement('div');
  formFooter.classList.add('form__button-wrap');
  formFooter.innerHTML = `
    <p 
    class="form__finish-price">
      Итоговая стоимость: <span class="form__bold-text">0</span>
    </p>
    <button 
      class="form__button--big-text form__button" 
      type="submit" 
      value="Добавить товар"
      form="my-form">Добавить товар</button>
  `;


  const labelImg = document.createElement('label');
  labelImg.classList.add('form__label-img');
  labelImg.innerHTML = `
  <input class="form__text-input form__text-input--hidden" 
    type="file" accept="image/*" name="file">
  <span class="form__button--lit-text form__button" 
    type="button" 
    value="Добавить товар"
    form="my-form">Добавить изображение</span>
  `;

  formBox.append(
      labelName,
      labelCategory,
      labelUnits,
      checkboxWrapper,
      labelDescription,
      labelCount,
      labelPrice,
      labelImg,
  );

  container.append(titleWrapper, buttonWindow, formBox, formFooter);

  form.append(container);


  const errWindow = document.createElement('div');
  errWindow.classList.add('modal-error');
  errWindow.classList.add('visually-hidden');
  errWindow.innerHTML = `
    <div class="error">
      <div class="error__wrapper">
        <button class="error__close-btn"></button>
        <img src="./style/add-product/icons/err-icon.svg" 
          alt="Изображение ошибки" 
          class="error-img">
        <p class="error__text">ЧТО-ТО ПОШЛО НЕ ТАК</p>
      </div>
    </div>
  `;

  modal.append(form, errWindow);
  document.body.append(modal);

  if (data.count !== null & data.price !== null) {
    let sumGood = document.querySelector('.form__bold-text');
    sumGood.textContent = sumOfGood(data.price, data.count, data.discount);
    console.log('data.discount ', data.discount);
  }

  modalControl(
    formFooter.querySelector('.form__bold-text'),
    labelPrice.elem,
    labelCount.elem,
    labelDiscount.elem,
    checkboxInput,
    modal,
    buttonWindow,
  );
  formControl(
    data.id,
    modal,
    errWindow,
    form,
    labelPrice.elem,
    labelCount.elem,
    labelDiscount.elem,
    formFooter.querySelector('.form__bold-text'),
  );

  if (err) {
    formTitle.textContent = err;
    formTitle.style.color = 'red';
    return;
  }
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

export const renderGoods = async (err, arr) => {
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

  return true;
};

export default {
  createRow,
  // renderGoods,
  totalSumTable,
  showModal,
};

