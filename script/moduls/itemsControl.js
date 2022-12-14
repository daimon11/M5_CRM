import { httpRequest, httpRequestDel, productsRender } from './httpRequest.js';
import { totalSumTable } from './renderAndCreate.js';
// import { closeModal } from './modalWindow.js';

export const addContactProducts = (
  id,
  {
    title,
    price,
    description,
    category,
    discount = 0,
    count,
    units,
    images,
  },
  modal,
  modalError,
  form,
  finishSumProductSpan,
) => {
  const contact = {
    'title': `${title}`,
    'price': +`${price}`,
    'description': `${description}`,
    'category': `${category}`,
    'discount': `${discount}`,
    'count': +`${count}`,
    'units': `${units}`,
    'images': `${images}`,
  };
  if (contact.images === 'undefined') {
    delete contact.images;
  }
  if (id) {
    console.log('перезаписать');
    httpRequest(`https://quickest-cubic-pyroraptor.glitch.me/api/goods/${id}`, {
      method: 'PATCH',
      body: {
        'title': `${contact.title}`,
        'price': +`${contact.price}`,
        'description': `${contact.description}`,
        'category': `${contact.category}`,
        'discount': `${contact.discount}`,
        'count': +`${contact.count}`,
        'units': `${contact.units}`,
        'image': `${contact.image}`,
      },
      callback(err, data) {
        if (err) {
          const btnClose = modalError.querySelector('.error__close-btn');
          console.warn(err, data);
          modalError.classList.remove('visually-hidden');
          btnClose.addEventListener('click', () => {
            modalError.classList.add('visually-hidden');
          });
        } else {
          form.reset();
          finishSumProductSpan.textContent = 0;
          modal.remove();
          document.querySelector('.crm__bold-text').textContent = totalSumTable();
          productsRender(`https://quickest-cubic-pyroraptor.glitch.me/api/goods`);
        }
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    console.log('добавить');
    httpRequest(`https://quickest-cubic-pyroraptor.glitch.me/api/goods`, {
      method: 'POST',
      body: {
        'title': `${contact.title}`,
        'price': +`${contact.price}`,
        'description': `${contact.description}`,
        'category': `${contact.category}`,
        'discount': `${contact.discount}`,
        'count': +`${contact.count}`,
        'units': `${contact.units}`,
        'image': `${contact.image}`,
      },
      callback(err, data) {
        if (err) {
          const btnClose = modalError.querySelector('.error__close-btn');
          console.warn(err, data);
          modalError.classList.remove('visually-hidden');
          btnClose.addEventListener('click', () => {
            modalError.classList.add('visually-hidden');
          });
        } else {
          form.reset();
          finishSumProductSpan.textContent = 0;
          modal.remove();
          document.querySelector('.crm__bold-text').textContent = totalSumTable();
          productsRender(`https://quickest-cubic-pyroraptor.glitch.me/api/goods`);
        }
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const deleteItemInTable = (table) => {
  table.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.img-del-btn')) {
      const id = target.closest('.crm__table-row').id;

      httpRequestDel(`https://quickest-cubic-pyroraptor.glitch.me/api/goods/${id}`);
    }
  });

  table.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.img-correct-product') &&
      target.closest('.img-product')) {
      const btn = target.closest('.img-correct-product');
      const url = btn.querySelector('.img-product').getAttribute('data-pic');
      const top = ((screen.height - 600) / 2);
      const left = ((screen.width - 600) / 2);
      open(url, '', 'width = 600,height = 600,top=' + top + ',left=' + left + '');
    }
  });
};
