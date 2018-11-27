import config from '../config.js';
import {
  token, access, adminPageAccess, topMenu,
} from '../functions.js';
// import modalTab from '../modal.js';

const portPath = config.port;

let cartItem = [];

async function allUsers() {
  // let category;
  try {
    const notify = await fetch(`${portPath}/users`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const notices = await notify.json();
    const vals = Object.values(notices.rows);
    let usersTable = ` <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Picture</th>
    <th>Priviledge</th>
    <th></th>
  </tr>`;
    // eslint-disable-next-line no-restricted-syntax
    for (const val of vals) {
      usersTable += `<tr>
      <td>${val.username}</td>
      <td>${val.useremail}</td>
      <td><img src="../../images/john-doe.jpg" alt="John Doe"></td>
      <td>${val.userpriviledge}</td>
      <td>
        <a href="../../users/john-doe.html" title="View attendant"><i class="fas fa-eye"></i></a>
        <a href="edit.html" title="Edit attendant"><i class="fas fa-edit"></i></a>
        <a href="../../audit/john-doe.html" title="View Sales Record"> <i class="fas fa-clipboard-list"></i> </a>
        <a href="#" title="Delete attendant"><i class="fas fa-trash-alt"></i></a>
      </td>
    </tr>
       `;
    }

    // })
    // }
    usersTable += `
    </tr></table>`;

    document.getElementById('showusers').innerHTML = usersTable;
  } catch (err) {
    if (err) newFunction()(err);
  }

  function newFunction() {
    return console.log;
  }
}

// function addToCart(val) {
//   const item = {
//     id: `${val.id}`,
//     userName: `${val.userName}`,
//     userPrice: `${val.userPrice}`,
//   }
//   cartItem.push(item);
//   localStorage.setItem('cart', cartItem);
// }

window.addEventListener('DOMContentLoaded', adminPageAccess);
window.addEventListener('load', topMenu);
window.addEventListener('load', allUsers);
// window.addEventListener('load', usersCategoryDropdown);
// document.getElementById('prodCatgSearch').addEventListener('submit', searchCatgUser);
// document.getElementById('addCart').addEventListener('click', addToCart);
