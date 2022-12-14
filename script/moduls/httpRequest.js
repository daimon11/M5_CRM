import { renderGoods, showModal } from './renderAndCreate.js';

export const httpRequest = (url, {
  method = 'get',
  callback,
  body = {},
  headers,
}) => {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    if (headers) {
      for (const [key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value);
      }
    }

    xhr.addEventListener('load', () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        callback(new Error(xhr.status), xhr.response);
        return;
      }

      const data = JSON.parse(xhr.response);
      console.log('httpRequest data = ', data);
      if (callback) callback(null, data);
    });

    xhr.addEventListener('error', () => {
      callback(new Error(xhr.status), xhr.response);
    });

    xhr.send(JSON.stringify(body));
  } catch (err) {
    callback(new Error(err));
    console.log('ошибка');
  }
};

export const productsRender = (url) => {
  httpRequest(url, {
    methed: 'get',
    callback: renderGoods,
  });
};

export const changeProductRender = (url) => {
  httpRequest(url, {
    methed: 'get',
    callback: showModal,
  });
};

export const httpRequestDel = (url) => {
  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', url);

  xhr.addEventListener('load', () => {
    if (xhr.status < 204 || xhr.readyState === 4) {
      console.log('Good request');
      productsRender(`https://quickest-cubic-pyroraptor.glitch.me/api/goods`);
    } else {
      throw new Error('Bad request');
    }
  });

  xhr.send();
};


