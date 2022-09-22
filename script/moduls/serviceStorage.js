const getStorage = () => {
  const arr = localStorage.getItem('CRMproducts') ?
    JSON.parse(localStorage.getItem('CRMproducts')) : [];
  return arr;
};

const setStorage = (key, value) => {
  const obj = JSON.stringify(value);
  localStorage.setItem(key, obj);
};

const removeStorage = (id, arr) => {
  id = +id;
  for (let i = 0; i < arr.length; i++) {
    if (id === arr[i].id) {
      arr.splice(i, 1);
    }
  }
  setStorage('CRMproducts', arr);
};

export default {
  getStorage,
  setStorage,
  removeStorage,
};
