'use strict';
const products = [
  {
    "id": 253842678,
    "title": "Смартфон Xiaomi 11T 8/128GB",
    "category": "mobile-phone",
    "units": "шт",
    "count": 3,
    "price": 27000,
    get totalPrice() {
      return (this.count * this.price);
    },
    "images": "Изображение отсутствует",
  },
  {
    "id": 296378448,
    "title": "Радиоуправляемый автомобиль Cheetan",
    "category": "toys",
    "units": "шт",
    "count": 1,
    "price": 4000,
    get totalPrice() {
      return (this.count * this.price);
    },
    "images": "Изображение отсутствует",
  },
  {
    "id": 215796548,
    "title": "ТВ приставка MECOOL KI",
    "category": "technic",
    "units": "шт",
    "count": 4,
    "price": 12400,
    get totalPrice() {
      return (this.count * this.price);
    },
    "images": "Изображение отсутствует",
  },
  {
    "id": 246258248,
    "title": "Витая пара PROConnect 01-0043-3-25",
    "category": "cables",
    "units": "v",
    "count": 420,
    "price": 22,
    get totalPrice() {
      return (this.count * this.price);
    },
    "images": "Изображение отсутствует",
  }
];
