/* eslint-disable no-restricted-syntax */
import config from '../config.js';
import {
  token, adminPageAccess, topMenu, clear,
} from '../functions.js';

const portPath = config.port;


async function addcategory(event) {
  event.preventDefault();
  clear();
  const formContent = {
    categoryName: document.getElementById('categoryName').value,
    categoryDetails: document.getElementById('categoryDetails').value,
  };
  try {
    const newcategory = await fetch(`${portPath}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify(formContent),
    });
    const addedcategory = await newcategory.json();
    console.log(addedcategory);
    // if ((addedcategory.categories_id || addedcategory.categoryName || addedcategory.categoryPrice) && !addedcategory.id) {
    //   const errormsgs = Object.values(addedcategory);
    //   for (const msg of errormsgs) {
    //     document.querySelector('#errorDisplay').innerHTML += `${msg}<br>`;
    //   }
    // }
    // if (addedcategory.message && !addedcategory.id) {
    //   document.querySelector('#errorDisplay').innerHTML += `${addedcategory.message}<br>`;
    // }
    if (addedcategory.id) {
      document.querySelector('#successMsg').innerHTML += `${addedcategory.categoryname} has been added <br>Quantity - ${addedcategory.categoryquantity}  <br>`;
    }

  } catch (err) {
    console.log(err);
  }
}

window.addEventListener('DOMContentLoaded', adminPageAccess);
window.addEventListener('load', topMenu);
document.getElementById('addcategory').addEventListener('submit', addcategory);
