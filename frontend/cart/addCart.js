import config from '../config.js';
import {
  token, access, userPageAccess, topMenu, getimage, categoryDropdown, searchCatgProd, deleteItem,
} from '../functions.js';
// import modalTab from '../modal.js';

const portPath = config.port;

let cartItem = [];

const url = document.URL;
const urlsplit = url.split('=');
// const urlids = url.searchParams.get('id');
// const urlname = url.searchParams.get('name');
// const urlprice = url.searchParams.get('price');
console.log(urlsplit);
const urlid = urlsplit[1];
const urlname = urlsplit[2];
const urlprice = urlsplit[3];

function addToCart() {
  const item = {
    id: `${urlid}`,
    productName: `${urlname}`,
    productPrice: `${urlprice}`,
  }
  cartItem.push(item);
  console.log(cartItem);
  localStorage.setItem('cart', cartItem);
  window.location.replace('/UI/products.html');
}

window.addEventListener('DOMContentLoaded', userPageAccess);
window.addEventListener('load', topMenu);
window.addEventListener('load', categoryDropdown);
window.addEventListener('load', addToCart);
document.getElementById('prodCatgSearch').addEventListener('submit', searchCatgProd);
