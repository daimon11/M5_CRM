'use strict';

const createRow = (obj) => {
  const wrapper = document.querySelector('.crm__wrapper');
  const elemTR = document.createElement('tr');
  elemTR.classList.add("crm__table-row");
  for (var key in obj) {
    const elemTD = document.createElement('td');
    elemTD.classList.add("crm__table-td__border_all");
    wrapper.insertAdjacentElement('beforeend', elemTR);
    elemTR.insertAdjacentElement('beforeend', elemTD);
    elemTD.insertAdjacentHTML('beforeend', obj[key]);
  }
};

const renderGoods = (arr) => {
  arr.map(function (index) {
    return createRow(index);
  })
};
renderGoods(products);



