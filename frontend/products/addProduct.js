/* eslint-disable no-restricted-syntax */
import config from '../config.js';
import {
  token, access, userPageAccess, topMenu, clear,
} from '../functions.js';

const portPath = config.port;


async function addProduct(event) {
  const fileInput = document.getElementById('productImage');
  event.preventDefault();
  clear();
  const formData = new FormData();
  formData.append('categories_id', document.getElementById('categories_id').value);
  formData.append('productName', document.getElementById('productName').value);
  formData.append('productImage', fileInput.files[0]);
  formData.append('productDetails', document.getElementById('productDetails').value);
  formData.append('productSpec', document.getElementById('productSpec').value);
  formData.append('productPrice', document.getElementById('productPrice').value);
  formData.append('productQuantity', document.getElementById('productQuantity').value);
  formData.append('productLimit', document.getElementById('productLimit').value);

  try {
    const newProduct = await fetch(`${portPath}/products`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `${token}`,
      },
    });
    const addedProduct = await newProduct.json();
    console.log(addedProduct);
    if ((addedProduct.categories_id || addedProduct.productName || addedProduct.productPrice) && !addedProduct.id) {
      const errormsgs = Object.values(addedProduct);
      for (const msg of errormsgs) {
        document.querySelector('#errorDisplay').innerHTML += `${msg}<br>`;
      }
    }
    if (addedProduct.message && !addedProduct.id) {
      document.querySelector('#errorDisplay').innerHTML += `${addedProduct.message}<br>`;
    }
    if (addedProduct.id) {
      document.querySelector('#successMsg').innerHTML += `${addedProduct.productname} has been added <br>Quantity - ${addedProduct.productquantity}  <br>`;
    }

  } catch (err) {
    console.log(err);
  }
}
const submitInput = document.getElementById('addProduct');
submitInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    document.getElementById('submitForm').click();
  }
});

window.addEventListener('DOMContentLoaded', adminPageAccess);
window.addEventListener('load', topMenu);
document.getElementById('addProduct').addEventListener('submit', addProduct);
