import config from './config.js';
import {
  token, access, userPageAccess, topMenu,
} from './functions.js';

const portPath = config.port;

let productCount;

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

function dashboard() {
  document.getElementById('dashboard').innerHTML = `
  <div id="products">
  <h3><i class="fas fa-clipboard-list"></i> &nbsp; Products</h3>
  <p class="label">
    ${productCount}
  </p><br>
  <p class="desc">in stock</p>
  <a href="products.html"> <button>View all</button></a>
  </div>

  <div id="noproducts">
  <h3><i class="fas fa-list-ul"></i> &nbsp; Restock</h3>
  <p class="label">
    30
  </p><br>
  <p class="desc">out of stock</p>
  <a href="admin/products/out-of-stock.html">
    <button>View all</button>
  </a>
  </div>

  <div id="categories">
  <h3><i class="fas fa-users"></i> &nbsp; Categories</h3>
  <p class="label">
    12
  </p><br>
  <p class="desc">Product Categories</p>
  <a href="admin/categories/index.html">
    <button>View all</button>
  </a>
  <!-- </div> -->
  </div>`;

  const layer2 = `<div id="audit">
  <h3><i class="fas fa-clipboard-list"></i> &nbsp; Audit</h3>
  <p class="label">
    93
  </p>
  <p class="desc">sales Reports</p>
  <button onclick="window.location='admin/audit/index.html'">View all</button>
  </a>
  </div >

  <div id="attendants">
    <h3><i class="fas fa-users"></i> &nbsp; Attendants</h3>
    <p class="label">
      7
  </p>
    <p class="desc">Registered Attendants</p>

    <a href="admin/attendants/index.html">
      <button>View all</button>
    </a>
  </div>

  <div id="incidents">
    <h3><i class="fas fa-list-ul"></i> &nbsp; Incidents</h3>
    <p class="label">
      15
  </p>
    <p class="desc">Incidents reported</p>

    <a href="admin/incidence/index.html">
      <button>View all</button>
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
