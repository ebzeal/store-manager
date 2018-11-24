import config from './config.js';
export const token = localStorage.getItem('token');
export const accessed = localStorage.getItem('userPriviledge');
export let userName;
export let userId;
export let access;


const portPath = config.port;

function validateResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function clear() {
  document.querySelector('#errorDisplay').innerHTML = '';
}

export async function adminPageAccess() {
  try {
    const getAuth = await fetch(`${portPath}/auth/access`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const newAuth = await getAuth.json();
    console.log(newAuth);
    if (newAuth.userPriviledge === 'Admin') {
      access = newAuth.userPriviledge;
      userName = newAuth.userName;
      userId = newAuth.userId;
      topMenu();
    } else {
      window.stop();
      window.location.replace('../../dashboard.html');
    }
  } catch (err) {
    console.log(err);
  }
}
export async function userPageAccess() {
  try {
    const getAuth = await fetch(`${portPath}/auth/access`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const newAuth = await getAuth.json();
    console.log(newAuth);
    if (newAuth.userPriviledge) {
      access = newAuth.userPriviledge;
      userName = newAuth.userName;
      userId = newAuth.userId;
      topMenu();
    } else {
      window.stop();
      window.location.replace('../UI/index.html');
    }
  } catch (err) {
    console.log(err);
  }
}
export function topMenu() {
  if (access === 'User') {
    document.getElementById('menu').innerHTML = `
    <li><a href="dashboard.html">Dashboard</a></li>

    <li><a href="products.html">Products</a></li>
    <li><a href="report-incidence.html">Incidence</a></li>
    <li><a href="cart/index.html">Shopping Cart</a></li>

    <li class="profile">
      <!-- First Tier Drop Down -->
      <label for="drop-1" class="toggle"> <img src="images/john-doe.jpg" alt=""> +</label>
      <a href="#" class="dropbtn"><img src="images/john-doe.jpg" alt=""></a>
      <input type="checkbox" id="drop-1" />
      <ul>
        <li><a href="#">Hi ${userName}</a></li>
        <li><a href="users/john-doe.html">Profile</a></li>
        <li><a href="audit/john-doe.html">Sales Orders</a></li>
        <li><a href="index.html">Logout</a></li>
      </ul>
    </li>
    `;
  } else if (access === 'Admin') {
    document.getElementById('menu').innerHTML = `
    <li><a href="dashboard.html">Dashboard</a></li>

    <li>

      <!-- First Tier Drop Down -->
      <label for="drop-2" class="toggle">Products +</label>
      <a href="#">Products</a>
      <input type="checkbox" id="drop-2" />
      <ul>
        <li><a href="products.html">View All Products</a></li>
        <li><a href="admin/products/new.html">Add Product</a></li>
        <li><a href="admin/categories/index.html">Add Categories</a></li>
        
      </ul>
    </li>
    <li><a href="report-incidence.html">Incidence</a></li>
    <li><a href="admin/audit/index.html">View Sales</a></li>
    <li>

    <!-- First Tier Drop Down -->
    <label for="drop-2" class="toggle">Products +</label>
    <a href="#">Users</a>
    <input type="checkbox" id="drop-2" />
    <ul>
      <li><a href="products.html">Attendants</a></li>
      <li><a href="admin/products/new.html">Admin</a></li>
      
    </ul>
  </li>

    <li class="profile">
      <!-- First Tier Drop Down -->
      <label for="drop-1" class="toggle"> <img src="images/john-doe.jpg" alt=""> +</label>
      <a href="#" class="dropbtn"><img src="images/john-doe.jpg" alt=""></a>
      <input type="checkbox" id="drop-1" />
      <ul>
        <li><a href="#">Hi ${userName}</a></li>
        <li><a href="users/john-doe.html">Profile</a></li>
        <li><a href="index.html">Logout</a></li>
      </ul>
    </li>
    `;
  }
}
