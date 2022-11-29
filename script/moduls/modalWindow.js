import renderAndCreate from './renderAndCreate.js';

import { httpRequest, productsRender } from './httpRequest.js';

const modalError = document.querySelector('.modal-error');
const errorCloseBtn = document.querySelector('.error__close-btn');

const {
  totalSumTable,
} = renderAndCreate;

const closeModal = (modalWindow) => {
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

const btnImg = (modal, btn) => {
  modal.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.form__button--lit-text')) {
      btn.click();
    }
  });
};

const modalControl = (addProductBtn, modalWindow) => {
  addProductBtn.addEventListener('click', () => {
    modalWindow.classList.add('modal_visible');
  });

  modalWindow.addEventListener('click', e => {
    const target = e.target;
    if (target === modalWindow || target.closest('.form__button-window') ||
      target.closest('.modal-wrapper')) {
      closeModal(modalWindow);
    }
  });
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
},
  modalError,
  form,
  modalWindow,
  totalSumAllSpan,
  finishSumProductSpan) => {
  const contact = {
    'title': `${title}`,
    'price': +`${price}`,
    'description': `${description}`,
    'category': `${category}`,
    'discont': `${discont}`,
    'count': +`${count}`,
    'units': `${units}`,
    'images': `${images}`,
  };
  if (contact.images === 'undefined') {
    delete contact.images;
  }

  httpRequest(`http://localhost:3000/api/goods`, {
    method: 'POST',
    body: {
      'title': `${contact.title}`,
      'price': +`${contact.price}`,
      'description': `${contact.description}`,
      'category': `${contact.category}`,
      'discont': `${contact.discont}`,
      'count': +`${contact.count}`,
      'units': `${contact.units}`,
      'image': `${contact.image}`,
    },
    callback(err, data) {
      if (err) {
        console.warn(err, data);
        modalError.classList.remove('visually-hidden');
        errorCloseBtn.addEventListener('click', () => {
          modalError.classList.add('visually-hidden');
        });
      } else {
        form.reset();
        closeModal(modalWindow);
        finishSumProductSpan.textContent = 0;
        totalSumAllSpan.textContent = totalSumTable();
        productsRender(`http://localhost:3000/api/goods`);
      }
    },
    headers: {
      'Content-Type': 'application/json',
    },
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
      target === discontInput);
    finishSumProductSpan.textContent =
      Math.floor((
        `${(inputPrice.value * inputCount.value) *
        (1 - discontInput.value / 100)}` * 100) / 100);
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
        finishSumProductSpan);
  });
};

export default {
  discontControl,
  modalControl,
  formControl,
  btnImg,
};
