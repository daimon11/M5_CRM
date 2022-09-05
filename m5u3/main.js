'use strict';

const createRow = (obj) => {
  const tableBody = document.querySelector('.crm__table-body');
  const images = document.querySelector('.crm__table-td--flex');
  const newImages = images.cloneNode(true);
  const elemTR = document.createElement('tr');
  elemTR.classList.add("crm__table-row");
  for (var key in obj) {
    const elemTD = document.createElement('td');
    elemTD.classList.add("crm__table-td");
    tableBody.insertAdjacentElement('beforeend', elemTR);
    elemTR.insertAdjacentElement('beforeend', elemTD);
    switch (true) {
      case (key === 'id' || key === 'title' || key === 'category'):
        elemTD.classList.add("crm__table-td--pos_left"); break;
      case (key === 'price' || key === 'totalPrice'):
        elemTD.classList.add("crm__table-td--pos_right");
        break;
      case (key === 'images'):
        elemTD.replaceWith(newImages);
        break;
      default:
        break;
    };
    elemTD.insertAdjacentHTML('beforeend', obj[key]);
  }
};

const renderGoods = (arr) => {
  arr.map(function (index) {
    return createRow(index);
  })
};
renderGoods(products);