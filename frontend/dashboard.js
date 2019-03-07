import config from './config.js';
import {
  token, access, userPageAccess, topMenu,
} from './functions.js';

const portPath = config.port;

let productCount;
let categoryCount;
let userCount;

async function notifications() {
  try {
    const notify = await fetch(`${portPath}/notifications`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const notices = await notify.json();
    const vals = Object.values(notices.rows);
    for (const val of vals) {
      document.getElementById('notificationList').innerHTML += `<p>${val.notifications}</p>`;
    }
  } catch (err) {
    if (err) console.log(err);
  }
}

(async function getProducts() {
  try {
    const allProducts = await fetch(`${portPath}/products`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const productsAll = await allProducts.json();
    const productsArr = Object.values(productsAll);
    productCount = productsArr[0].length;
  } catch (err) {
    console.log(err);
  }
}());

(async function getCategories() {
  try {
    const allCategories = await fetch(`${portPath}/categories`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const categoriesAll = await allCategories.json();
    const categoriesArr = Object.values(categoriesAll);
    categoryCount = categoriesArr[0].length;
  } catch (err) {
    console.log(err);
  }
}());

(async function getUsers() {
  try {
    const allUsers = await fetch(`${portPath}/users`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const usersAll = await allUsers.json();
    const usersArr = Object.values(usersAll);
    userCount = usersArr[0].length;
  } catch (err) {
    console.log(err);
  }
}());

function dashboard() {
  document.getElementById('dashboard').innerHTML = `
  <div id="products">
  <h3><i class="fas fa-clipboard-list"></i> &nbsp; Products</h3>
  <p class="label">
    ${productCount}
  </p><br>
  <a href="products.html"> <button id='viewAll'>View all</button></a>
  </div>

  <div id="noproducts">
  <h3><i class="fas fa-list-ul"></i> &nbsp; Out of Stock</h3>
  <p class="label">
    30
  </p><br>
  <a href="admin/products/out-of-stock.html">
    <button id='viewAll'>View all</button>
  </a>
  </div>

  <div id="categories">
  <h3><i class="fas fa-users"></i> &nbsp; Product Categories</h3>
  <p class="label">
    ${categoryCount}
  </p><br>
  <a href="admin/categories/index.html">
    <button id='viewAll'>View all</button>
  </a>
  <!-- </div> -->
  </div>`;

  const layer2 = `<div id="audit">
  <h3><i class="fas fa-clipboard-list"></i> &nbsp; Sales Report</h3>
  <p class="label">
    93
  </p>
  <button id='viewAll' onclick="window.location='admin/audit/index.html'">View all</button>
  </a>
  </div >

  <div id="attendants">
    <h3><i class="fas fa-users"></i> &nbsp; Users</h3>
    <p class="label">
      ${userCount}
  </p>

    <a href="admin/users/index.html">
      <button id='viewAll'>View all</button>
    </a>
  </div>

  <div id="incidents">
    <h3><i class="fas fa-list-ul"></i> &nbsp; Incidents</h3>
    <p class="label">
      15
  </p>

    <a href="admin/incidence/index.html">
      <button id='viewAll'>View all</button>
    </a>
  </div>
  `;
  if (access === 'Admin') {
    document.getElementById('dashboard').innerHTML += layer2;
  }
}

window.addEventListener('DOMContentLoaded', userPageAccess);
window.addEventListener('load', topMenu);
window.addEventListener('load', notifications);
window.addEventListener('load', dashboard);
