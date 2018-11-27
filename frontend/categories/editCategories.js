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
    document.getElementById('updateCategory').innerHTML = `
    <input type="text" name="categoryName" id="categoryName" placeholder="category Name" value="${thecategory.categoryname}">

    <textarea name="categoryDetails" id="categoryDetails" cols="30" rows="5"> ${thecategory.categorydetails}</textarea>
      `;
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
      },
    });
    const addedcategory = await newcategory.json();
    console.log(addedcategory);
    if (addedcategory.id) {
      document.querySelector('#successMsg').innerHTML += `${addedcategory.categoryname} has been updated <br>Quantity - ${addedcategory.categoryquantity}  <br>`;
    }

  } catch (err) {
    console.log(err);
  }
}
// const submitInput = document.getElementById('addcategory');
// submitInput.addEventListener('keyup', (e) => {
//   if (e.keyCode === 13) {
//     document.getElementById('submitForm').click();
//   }
// });

window.addEventListener('DOMContentLoaded', adminPageAccess);
window.addEventListener('load', topMenu);
window.addEventListener('load', getCategory);
window.addEventListener('load', categoryDropdown);
document.getElementById('updatecategory').addEventListener('submit', editcategory);
