import serviceStorage from './serviceStorage.js';
import renderAndCreate from './renderAndCreate.js';

const {
  createRow,
  totalSumTable,
} = renderAndCreate;

const {
  setStorage,
  removeStorage,
} = serviceStorage;

const addContactProducts = ({
  title,
  price,
  description,
  category,
  discont = false,
  count,
  units,
  // images,
}, id, arr) => {
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
    // 'images': `${images}`,
  };
  arr.push(contact);
  setStorage('CRMproducts', arr);
};

const addContactPage = (contact, list, id) => {
  contact.id = id.textContent;
  list.append(createRow(contact));
};

const deleteItemInArr = (id, arr) => {
  id = +id;
  for (let i = 0; i < arr.length; i++) {
    if (id === arr[i].id) {
      arr.splice(i, 1);
    }
  }
  removeStorage('CRMproducts', arr);
};

const deleteItemInTable = (table, span, arr) => {
  table.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.img-del-btn')) {
      const createID = target.closest('.crm__table-row').id;
      deleteItemInArr(createID, arr);
      target.closest('.crm__table-row').remove();
      span.textContent = totalSumTable();
    }
  });
};

export default {
  addContactProducts,
  addContactPage,
  deleteItemInArr,
  deleteItemInTable,
};
