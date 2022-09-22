import itemsControl from './itemsControl.js';
import renderAndCreate from './renderAndCreate.js';

const {
  totalSumTable,
} = renderAndCreate;

const {
  addContactProducts,
  addContactPage,
} = itemsControl;

const closeModal = (modalWindow) => {
  modalWindow.classList.remove('modal_visible');
};

const idProductControl = (span) => {
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
    idProductControl(IDProduct);
  });

  modalWindow.addEventListener('click', e => {
    const target = e.target;
    if (target === modalWindow || target.closest('.form__button-window') ||
      target.closest('.modal-wrapper')) {
      closeModal(modalWindow);
    }
  });
};

const updatePriceProductControl = (form, span, price, count, discont) => {
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
    CRMproducts,
) => {
  updatePriceProductControl(
      form,
      spanForm,
      inputPrice,
      inputCount,
      discontInput,
  );

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);
    console.log('newContact', newContact);
    addContactPage(newContact, list, IDProduct);
    addContactProducts(newContact, IDProduct, CRMproducts);
    form.reset();
    closeModal(modalWindow);
    spanCRM.textContent = totalSumTable();
  });
};

export default {
  discontControl,
  modalControl,
  formControl,
};
