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

export function clear() {
  document.querySelector('#errorDisplay').innerHTML = '';
}

export function getimage(val, tag = '') {
  if (val.productimage === 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/ImagePlaceholder_icon.svg/2000px-ImagePlaceholder_icon.svg.png') {
    return `${tag}uploads/placeholder.png.png`;
  }
  return `${tag}${val.productimage}`;
}

export async function getCategory(val) {
  let theCategory;
  try {
    const findCategory = await fetch(`${portPath}/categories/${val.categories_id}`, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    });
    const seeCategory = await findCategory.json();
  } catch (err) {
    console.log(err);
  }
}

export function searchCatgProd() {
  window.location.replace(`/UI/products/search.html?catgid=${catgid}`);
}

export function deleteItem(item) {
  confirm(`Are you sure you want to delete this ${item}?`);
}

export async function categoryDropdown() {
  const getCategories = await fetch(`${portPath}/categories`, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  const seeCategories = await getCategories.json();
  let catgies = `  
  <option value="" disabled selected>Filter by Categories</option>
  `;
  const catgVals = Object.values(seeCategories.rows);
  let catgid;
  for (const val of catgVals) {
    catgies += `
    <option value="${val.id}">${val.categoryname}</option>
    `;
    catgid = `${val.id}`;
  }

  document.getElementById('prodCatgSearch').innerHTML = catgies;
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
      window.location.replace('/../../UI/dashboard.html');
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
      userId = newAuth.id;
      topMenu();
    } else {
      window.stop();
      window.location.replace('/../UI/index.html');
    }
  } catch (err) {
    console.log(err);
  }
}
export function topMenu() {
  if (access === 'User') {
    document.getElementById('menu').innerHTML = `
    <li><a href="/UI/dashboard.html">Dashboard</a></li>

    <li><a href="/UI/products.html">Products</a></li>
    <li><a href="/UI/report-incidence.html">Incidence</a></li>
    <li><a href="/UI/cart/index.html"><i class="fas fa-cart-arrow-down white"></i>1</a></li>

    <li class="profile">
      <!-- First Tier Drop Down -->
      <label for="drop-1" class="toggle"> <img src="images/john-doe.jpg" alt=""> +</label>
      <a href="/UI/#" class="dropbtn"><img src="/UI/images/john-doe.jpg" alt=""></a>
      <input type="checkbox" id="drop-1" />
      <ul>
        <li><a href="/UI/#">Hi ${userName}</a></li>
        <li><a href="/UI/users/john-doe.html">Profile</a></li>
        <li><a href="/UI/sales/index.html">View Sales</a></li>
        <li><a href="/UI/index.html">Logout</a></li>
      </ul>
    </li>
    `;
  } else if (access === 'Admin') {
    document.getElementById('menu').innerHTML = `
    <li><a href="/UI/dashboard.html">Dashboard</a></li>

    <li>

      <!-- First Tier Drop Down -->
      <label for="drop-2" class="toggle">Products +</label>
      <a href="/UI/#">Products</a>
      <input type="checkbox" id="drop-2" />
      <ul>
        <li><a href="/UI/products.html">View All Products</a></li>
        <li><a href="/UI/admin/products/new.html">Add Product</a></li>
        <li><a href="/UI/admin/categories/index.html">View Categories</a></li>
        
      </ul>
    </li>
    <li><a href="/UI/report-incidence.html">Incidence</a></li>
    <li><a href="/UI/sales/index.html">View Sales</a></li>
    <li><a href="/UI/admin/users/index.html">Users</a></li>
    <li><a href="/UI/cart/index.html"><i class="fas fa-cart-arrow-down white"></i>1</a></li>

    <li class="profile">
      <!-- First Tier Drop Down -->
      <label for="drop-1" class="toggle"> <img src="images/john-doe.jpg" alt=""> +</label>
      <a href="/UI/#" class="dropbtn"><img src="/UI/images/john-doe.jpg" alt=""></a>
      <input type="checkbox" id="drop-1" />
      <ul>
        <li><a href="/UI/#">Hi ${userName}</a></li>
        <li><a href="/UI/users/john-doe.html">Profile</a></li>
        <li><a href="/UI/logout.html">Logout</a></li>
      </ul>
    </li>
    `;
  }
}
