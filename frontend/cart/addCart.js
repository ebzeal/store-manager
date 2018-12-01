import config from '../config.js';
import {
  token, access, userPageAccess, topMenu, getimage, categoryDropdown, searchCatgProd, deleteItem,
} from '../functions.js';
// import modalTab from '../modal.js';

const portPath = config.port;

let cartItem = [];
const cart = localStorage.getItem('cart');

const url = document.URL;
const urlsplit = url.split('=');
const urlid = urlsplit[1];
const urlname = urlsplit[2];
const urlprice = urlsplit[3];

function addToCart() {
  const item = {
    productId: `${urlid}`,
    productName: `${decodeURI(urlname)}`,
    productPrice: `${urlprice}`,
  };
  if (cart === '') {
    cartItem.push(item);
  } else {
    cartItem = JSON.parse(cart);
    cartItem.push(item);
  }
  console.log(cartItem);
  localStorage.setItem('cart', JSON.stringify(cartItem));
  window.location.replace('/UI/products.html');
}

window.addEventListener('DOMContentLoaded', userPageAccess);
window.addEventListener('load', topMenu);
window.addEventListener('load', categoryDropdown);
window.addEventListener('load', addToCart);
// document.getElementById('prodCatgSearch').addEventListener('submit', searchCatgProd);
