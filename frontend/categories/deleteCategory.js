import config from '../config.js';
import {
  token, access, adminPageAccess, topMenu,
} from '../functions.js';
// import modalTab from '../modal.js';

const portPath = config.port;

const url = document.URL;
const urlsplit = url.split('=');
const urlid = urlsplit[1];

async function allCategories() {
  // let category;
  try {
    const notify = await fetch(`${portPath}/categories`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const notices = await notify.json();
    const vals = Object.values(notices.rows);
    let categoriesTable = ` <table class="halfborder">
    <tr>
      <th>Name</th>
      <th>Details</th>
      <th></th>
    </tr>`;
    // eslint-disable-next-line no-restricted-syntax
    for (const val of vals) {
      categoriesTable += `<tr>
      <td>${val.categoryname}</td>
      <td> ${val.categorydetails}</td>
      <td>
        <a href="../../categories/bread.html" title="View category"> </a>
        
        `;
      if (access === 'Admin') {
        categoriesTable += `
        <a href="/UI/admin/categories/edit.html?${val.categoryname}&id=${val.id}" title="Edit category"><i class="fas fa-edit"></i></a>

        <a href="admin/categorys/delete.html?id=${val.id}" title="Delete category"><i class="fas fa-trash-alt"></i></a>
       `;
      }

      // })
    }
    categoriesTable += `
    
    </td>
    </tr>`;

    document.getElementById('showCategories').innerHTML = categoriesTable;
  } catch (err) {
    if (err) newFunction()(err);
  }

  function newFunction() {
    return console.log;
  }
}

async function deletecategory() {
  const deleteItem = confirm('Are you sure you want to delete this category?');
  if (deleteItem) {
    try {
      const delitem = await fetch(`${portPath}/categories/${urlid}`, {
        method: 'DELETE',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
      const thedelitem = await delitem.json();
      document.getElementById('successMsg').innerHTML = thedelitem.message;
      setTimeout(window.location.replace(`/UI/admin/categories/index.html`), 10000);
    } catch (err) {
      console.log(err);
    }
  } else {
    window.location.replace(`/UI/admin/categories/index.html`);
  }
}

window.addEventListener('DOMContentLoaded', adminPageAccess);
window.addEventListener('load', topMenu);
window.addEventListener('load', allCategories);
window.addEventListener('load', deletecategory);
// window.addEventListener('load', deleteItem('category'));
