import config from '../config.js';
import {
  token, access, adminPageAccess, topMenu, getimage, categoryDropdown
} from '../functions.js';
// import modalTab from '../modal.js';

const portPath = config.port;

const url = document.URL;
const urlsplit = url.split('=');
const urlid = urlsplit[1];

async function getCategory() {
  let thecategory;
  try {
    const findcategory = await fetch(`${portPath}/categories/${urlid}`, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    });
    thecategory = await findcategory.json();
    console.log(thecategory);
    document.getElementById('categoryName').value = `${thecategory.categoryname}`;
    document.getElementById('categoryDetails').value = `${thecategory.categorydetails}`;
  } catch (err) {
    console.log(err);
  }
}


async function editcategory(event) {
  event.preventDefault();
  // clear();
  const formData = new FormData();
  formData.append('categoryName', document.getElementById('categoryName').value);
  formData.append('categoryDetails', document.getElementById('categoryDetails').value);
  console.log(formData);
  try {
    const newcategory = await fetch(`${portPath}/categories/${urlid}`, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    });
    const addedcategory = await newcategory.text();
    console.log(addedcategory);
    if (addedcategory.id) {
      document.querySelector('#successMsg').innerHTML += `${addedcategory.categoryname} has been updated <br>Quantity - ${addedcategory.categoryquantity}  <br>`;
    }

  } catch (err) {
    console.log(err);
  }
}

window.addEventListener('DOMContentLoaded', adminPageAccess);
window.addEventListener('load', topMenu);
window.addEventListener('load', getCategory);
document.getElementById('updateCategory').addEventListener('submit', editcategory);
