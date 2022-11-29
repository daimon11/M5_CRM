import { httpRequestDel } from './httpRequest.js';

const deleteItemInTable = (table) => {
  table.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.img-del-btn')) {
      const id = target.closest('.crm__table-row').id;

      httpRequestDel(`http://localhost:3000/api/goods/${id}`);
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

export default {
  deleteItemInTable,
};
