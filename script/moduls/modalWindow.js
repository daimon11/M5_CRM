import { addContactProducts } from './itemsControl.js';

import { createImgProduct } from './renderAndCreate.js';

export const sumOfGood = (price, count, discont = 0) => {
  const sum = Math.floor((
    `${(price * count) *
    (1 - discont / 100)}` * 100) / 100);
  return +sum;
};

const toBase64 = file => new Promise((resolve, reject) => {
  // console.log('toBase64');
  console.log('toBase64', file);
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
  image,
  rows,
) => {
  console.log('formControl');
  console.log('id', id);
  console.log('formControl image', image);
  form.addEventListener('input', e => {
    const target = e.target;
    switch (true) {
      case (target === name ||
        target === category ||
        target === description):
        target.value = target.value.replace(/[^а-яё-\s]/gi, '');

      case (target === units):
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

    if (newContact.image) {
      switch (true) {
        case (image === `image/${id}.jpg` &&
          newContact.image.size === undefined ||
          newContact.image.size === 0):
          newContact.image = image;
          break;
        case (newContact.image !== undefined && newContact.image.size > 0):
          newContact.image = await toBase64(newContact.image);
          break;
        default:
          delete newContact.image;
      }
    }

    console.log('formControl newContact', newContact);

    addContactProducts(
      id,
      newContact,
      modal,
      errWindow,
      form,
      priceProduct,
      rows,
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
  console.log('modalControl labelImg', labelImg);
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
    const imgBlock = document.querySelector('.form__img-display');
    console.log('imgBlock', document.querySelector('.form__img-display'));


    let src = URL.createObjectURL(btnAddImg.files[0]);
    const target = e.target;
    const formBox = modal.querySelector('.form__box');
    console.log(target);
    if (target === btnAddImg) {
    console.log('imgBlock', document.querySelector('.form__img-display'));
      if (btnAddImg.files.length > 0 && btnAddImg.files[0].size < 1000000) {
        imgErrText.textContent = '';
        if (!(labelImg.querySelector('.form__text-input').hasAttribute('name'))) {
          labelImg.querySelector('.form__text-input').setAttribute('name', 'image');
        }
        if (labelImg.querySelector('.form__img-display')) {
          labelImg.querySelector('.form__img-product').src = src;

        } else {
          if (imgBlock) {
            imgBlock.remove();
          }
          formBox.append(createImgProduct(src));
          labelImg.querySelector('.form__button').textContent = 'Изменить изображение';
          console.log('imgBlock', document.querySelector('.form__img-display'));
        }
      } else {
        imgErrText.textContent = 'Изображение не должно превышать размер 1 Мб';
        formBox.append(imgErrText);
        labelImg.querySelector('.form__text-input').removeAttribute('name');
        if (imgBlock) {
          imgBlock.remove();
        }
      }
    }
  });
};
