import config from '../config.js';
import {
  token, access, userPageAccess, topMenu, getimage, categoryDropdown, searchCatgProd, deleteItem,
} from '../functions.js';
// import modalTab from '../modal.js';

const portPath = config.port;

function viewCart() {
  const items = localStorage.getItem('cart');
  const itemsArr = Object.values(items);
  console.log(items)
}

window.addEventListener('DOMContentLoaded', userPageAccess);
window.addEventListener('load', topMenu);
window.addEventListener('load', categoryDropdown);
window.addEventListener('load', viewCart);
document.getElementById('prodCatgSearch').addEventListener('submit', searchCatgProd);
