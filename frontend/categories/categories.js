import config from '../config.js';
import {
  token, access, userPageAccess, topMenu,
} from '../functions.js';
// import modalTab from '../modal.js';

const portPath = config.port;

let cartItem = [];

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

        <a href="/UI/admin/categories/delete.html?id=${val.id}" title="Delete category"><i class="fas fa-trash-alt"></i></a>
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

window.addEventListener('DOMContentLoaded', userPageAccess);
window.addEventListener('load', topMenu);
window.addEventListener('load', allCategories);
