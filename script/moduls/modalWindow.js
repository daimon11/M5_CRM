import { addContactProducts } from './itemsControl.js';

export const sumOfGood = (price, count, discont = 0) => {
  const sum = Math.floor((
    `${(price * count) *
    (1 - discont / 100)}` * 100) / 100);
  return +sum;
};

export const formControl = (
  id = null,
  modal,
  errWindow,
  form,
  price,
  count,
  discount,
  priceProduct,
) => {
  form.addEventListener('change', e => {
    const target = e.target;
    if (target === price ||
      target === count ||
      target === discount) {
      priceProduct.textContent =
        sumOfGood(price.value, count.value, discount.value);
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);

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
) => {
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
};
