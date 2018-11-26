import config from '../config.js';
import {
  token, access, adminPageAccess, topMenu, getimage, categoryDropdown,
} from '../functions.js';
// import modalTab from '../modal.js';

const portPath = config.port;

const url = document.URL;
const urlsplit = url.split('=');
const urlid = urlsplit[1];

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
    // eslint-disable-next-line no-restricted-syntax
    for (const val of vals) {
      let theCategory; // Try refactor this
      try {
        const findCategory = await fetch(`${portPath}/categories/${val.categories_id}`, {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        });
        const seeCategory = await findCategory.json();
        theCategory = seeCategory.categoryname;
      } catch (err) {
        console.log(err);
      }
      productsTable += `<tr>
        <td><a href='products/?${val.productname}&id=${val.id}'> ${val.productname}</a></td>
        <td> <img src="../${getimage(val)}" alt="" class="getProduct"> </td>
        <td>${theCategory}</td>
        <td>${val.productspec}</td>
        <td>${val.productquantity}</td>
        <td>${val.productprice}</td>
        <td><button type="submit" class="btn" onclick="window.location='cart/index.html'">Add to Cart</button></td>
        `;
      if (access === 'Admin') {
        productsTable += `
        <td>
        <a href="admin/products/edit.html?${val.productname}&id=${val.id}" title="Edit Product"><i class="fas fa-edit"></i></a>
                <a href="stock.html" title="Stock Product"> <i class="fas fa-cart-plus"></i> </a>
                <a href="admin/products/delete.html?id=${val.id}" title="Delete Product"><i class="fas fa-trash-alt"></i></a>
       </td>
       `;
      }

      // })
    }
    productsTable += `
    </tr></table>`;

    document.getElementById('showProducts').innerHTML = productsTable;
  } catch (err) {
    if (err) newFunction()(err);
  }

  function newFunction() {
    return console.log;
  }
}

async function deleteProduct() {
  const deleteItem = confirm('Are you sure you want to delete this product?');
  if (deleteItem) {
    try {
      const delitem = await fetch(`${portPath}/products/${urlid}`, {
        method: 'DELETE',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
      const thedelitem = await delitem.json();
      document.getElementById('successMsg').innerHTML = thedelitem.message;
      setTimeout(window.location.replace(`/UI/products.html`), 10000);
    } catch (err) {
      console.log(err);
    }
  } else {
    window.location.replace(`/UI/products.html`);
  }
}

window.addEventListener('DOMContentLoaded', adminPageAccess);
window.addEventListener('load', topMenu);
window.addEventListener('load', allProducts);
window.addEventListener('load', deleteProduct);
// window.addEventListener('load', deleteItem('product'));
window.addEventListener('load', categoryDropdown);
