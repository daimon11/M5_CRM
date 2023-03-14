import { addContactProducts } from './itemsControl.js';

import { createImgProduct } from './renderAndCreate.js';

export const sumOfGood = (price, count, discont = 0) => {
  const sum = Math.floor((
    `${(price * count) *
    (1 - discont / 100)}` * 100) / 100);
  return +sum;
};

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.addEventListener('loadend', () => {
    resolve(reader.result);
  });
  reader.addEventListener('error', err => {
    reject(err);
  });
  reader.readAsDataURL(file);
});

export const formControl = (
  id = null,
  modal,
  errWindow,
  form,
  name,
  category,
  description,
  units,
  price,
  count,
  discount,
  priceProduct,
) => {

  form.addEventListener('input', e => {
    const target = e.target;
    switch (true) {
      case (target === name ||
        target === category ||
        target === description):
        console.log(target);
        target.value = target.value.replace(/[^а-яё\s]/gi, '');

      case (target === units):
        console.log(target);
        units.value = units.value.replace(/[^а-яё]/gi, '');

      case (target === price ||
        target === count ||
        target === discount):
        priceProduct.textContent =
          sumOfGood(price.value, count.value, discount.value);

    }
  });



  form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);
    newContact.image = await toBase64(newContact.image);
    console.log(newContact.image);
    console.log('newContact', newContact);
    addContactProducts(
      id,
      newContact,
      modal,
      errWindow,
      form,
      priceProduct,
    );
  });
};

export const modalControl = (
  priceProduct,
  price,
  count,
  discont,
  checkboxInput,
  modal,
  buttonWindow,
  labelImg,
  imgErrText,
) => {
  const btnAddImg = labelImg.querySelector('.form__text-input');

  modal.addEventListener('click', e => {
    const target = e.target;
    switch (true) {
      case (target.closest('.form__checkbox') &&
        discont.hasAttribute('disabled')):
        discont.removeAttribute('disabled');
        checkboxInput.dataset.status = 'discont-on';
        discont.style.background = '#F2F0F9';
        break;

      case (target.closest('.form__checkbox') &&
        checkboxInput.dataset.status === 'discont-on'):
        discont.setAttribute('disabled', 'disabled');
        checkboxInput.dataset.status = 'discont-off';
        discont.value = null;
        discont.style.background = '#EEEEEE';
        priceProduct.textContent =
          sumOfGood(price.value, count.value, 0);
        break;

      case (target === modal || target === buttonWindow ||
        target.closest('.modal-wrapper')):
        modal.remove();
        break;

      default:
        break;
    }
  });

  labelImg.addEventListener('change', e => {
    const target = e.target;
    const formBox = modal.querySelector('.form__box');
    if (target === btnAddImg) {
      if (btnAddImg.files.length > 0 && btnAddImg.files[0].size < 1000000) {
        imgErrText.textContent = '';
        const src = URL.createObjectURL(btnAddImg.files[0]);
        if (labelImg.querySelector('.form__img-display')) {
          labelImg.querySelector('.form__img-product').src = src;
        } else {
          formBox.append(createImgProduct(src));
          labelImg.querySelector('.form__button').textContent = 'Изменить изображение';
        }
      } else {
        imgErrText.textContent = 'Изображение не должно превышать размер 1 Мб';
        formBox.append(imgErrText);
        if (document.querySelector('.form__img-display')) {
          const imgBlock = document.querySelector('.form__img-display');
          imgBlock.remove();
        }
      }
    }
  });
};
