import { addContactProducts } from './itemsControl.js';

const modalError = document.querySelector('.modal-error');
const errorCloseBtn = document.querySelector('.error__close-btn');

export const closeModal = (modalWindow) => {
  modalWindow.classList.remove('modal_visible');
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

const modalControl = (addProductBtn, modalWindow, inputHidden) => {
  addProductBtn.addEventListener('click', () => {
    modalWindow.classList.add('modal_visible');
  });

  modalWindow.addEventListener('click', e => {
    const target = e.target;

    if (target === modalWindow || target.closest('.form__button-window') ||
      target.closest('.modal-wrapper')) {
      closeModal(modalWindow);
    }

    if (target.closest('.form__button--lit-text')) {
      inputHidden.click();
    }
  });
};

const formControl = (
    form,
    modalWindow,
    totalSumAllSpan,
    finishSumProductSpan,
    inputPrice,
    inputCount,
    discontInput,
) => {
  form.addEventListener('change', e => {
    const target = e.target;
    if (target === inputPrice ||
      target === inputCount ||
      target === discontInput) {
      finishSumProductSpan.textContent =
        Math.floor((
          `${(inputPrice.value * inputCount.value) *
          (1 - discontInput.value / 100)}` * 100) / 100);
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);

    console.log('newContact', newContact);
    addContactProducts(
        newContact,
        modalError,
        form,
        modalWindow,
        totalSumAllSpan,
        errorCloseBtn);
  });
};

export default {
  discontControl,
  modalControl,
  formControl,
};
