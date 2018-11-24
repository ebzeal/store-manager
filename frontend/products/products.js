import config from '../config.js';
import {
  token, access, userPageAccess, topMenu,
} from '../functions.js';
// import modalTab from '../modal.js';

const portPath = config.port;


async function getCategory(id) {
  let theCategory;
  try {
    const findCategory = await fetch(`${portPath}/categories/${id}`, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    });
    theCategory = await findCategory.json();
  } catch (err) {
    console.log(err);
  }
  console.log(theCategory.categoryname);
  return theCategory.categoryname;
}

async function allProducts() {
  // let category;
  try {
    const notify = await fetch(`${portPath}/products`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const notices = await notify.json();
    const vals = Object.values(notices.rows);
    let productsTable = `<table>
    <tr>
      <th>Name</th>
      <th>Picture</th>
      <th>Category</th>
      <th>Specification</th>
      <th>Quantity</th>
      <th>Price (N)</th>
      <th>Buy</th>
    </tr>`;
    for (const val of vals) {
      // fetch(`${portPath}/categories/${val.categories_id}`, {
      //   headers: {
      //     Authorization: `${token}`
      //   }
      // })
      //   .then((catVal) => {
      //     return catVal.json();
      //   })
      //   .then((catgVal) => {
      //     return catgVal.categoryname;
      //   })
      productsTable += `<tr>
      <td><a href='products/?${val.productname}?id=${val.id}'> ${val.productname}</a></td>
      <td> <img src="../${val.productimage}" alt="" onclick="window.location='products/'+ ${val.id}" class="getProduct"> </td>
      <td>${getCategory(val.categories_id)}</td>
      <td>${val.productspec}</td>
      <td>${val.productquantity}</td>
      <td>${val.productprice}</td>
      <td><button type="submit" class="btn" onclick="window.location='cart/index.html'">Add to Cart</button></td>
      `;
      if (access === 'Admin') {
        productsTable += `
      <td>
      <a href="edit.html" title="Edit Product"><i class="fas fa-edit"></i></a>
              <a href="stock.html" title="Stock Product"> <i class="fas fa-cart-plus"></i> </a>
              <a href="#" title="Delete Product"><i class="fas fa-trash-alt"></i></a>
     </td>
     `;
      }
    }
    productsTable += `
    </tr></table>`;

    document.getElementById('showProducts').innerHTML = productsTable;
  } catch (err) {
    if (err) console.log(err);
  }
}

async function getProduct() {
  let theproduct;
  try {
    const findproduct = await fetch(`${portPath}/products/${id}`, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    });
    theproduct = await findproduct.json();
    console.log(theproduct);
    // localStorage.setItem('productid', theproduct.id);
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener('DOMContentLoaded', userPageAccess);
window.addEventListener('load', topMenu);
window.addEventListener('load', allProducts);
// document.getElementById('getProduct').addEventListener('click', console.log('message'));
