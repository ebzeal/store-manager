import config from '../config.js';
import {
  token, access, userPageAccess, topMenu, getimage, categoryDropdown, searchCatgProd, deleteItem,
} from '../functions.js';
// import modalTab from '../modal.js';

const portPath = config.port;
let cartItem = [];
const cart = localStorage.getItem('cart');
const productDisplay = document.querySelector('#productsHeader');

// function adminuse() {
//   if (access === 'Admin') {
//     return <td>
//       <a href="admin/products/edit.html?${val.productname}&id=${val.id}" title="Edit Product"><i class="fas fa-edit"></i></a>
//       <a href="stock.html" title="Stock Product"> <i class="fas fa-cart-plus"></i> </a>
//       <a href="admin/products/delete.html?id=${val.id}" title="Delete Product"><i class="fas fa-trash-alt"></i></a>
//     </td>
//   };

function addToCart(val) {
  const item = {
    productId: `${val.id}`,
    productName: `${val.productname}`,
    productPrice: `${val.productprice}`,
    // productId: `${document.querySelector('#prodId').value}`,
    // productName: `${document.querySelector('#prodName').value}`,
    // productPrice: `${document.querySelector('#prodPrice').value}`,
  };
  if (cart === '') {
    cartItem.push(item);
  } else {
    cartItem = JSON.parse(cart);
    cartItem.push(item);
  }
  console.log(cartItem);
  localStorage.setItem('cart', JSON.stringify(cartItem));
}

async function allProducts() {
  // let category;

  function newFunction() {
    return console.log;
  }
  try {
    const notify = await fetch(`${portPath}/products`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const notices = await notify.json();
    const vals = Object.values(notices.rows);

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
      productDisplay.insertAdjacentHTML('afterend', `<tr>
        <td id='prodName'><a href='products/?${val.productname}&id=${val.id}'> ${val.productname}</a></td>
        <td> <img src="../${getimage(val)}" alt="" class="getProduct"> <input type='hidden' value='${val.id}' id='prodId' /> </td>
        <td id='prodCatg'>${theCategory}</td>
        <td id='prodSpec'>${val.productspec}</td>
        <td id='prodQty'>${val.productquantity}</td>
        <td id='prodPrice'>${val.productprice}</td>
        <td><button class="btn" id="addCart" onclick="${addToCart(val)}">Add to Cart</button></td>
        <td>
        <a href="admin/products/edit.html?${val.productname}&id=${val.id}" title="Edit Product"><i class="fas fa-edit"></i></a>
                <a href="stock.html" title="Stock Product"> <i class="fas fa-cart-plus"></i> </a>
                <a href="admin/products/delete.html?id=${val.id}" title="Delete Product"><i class="fas fa-trash-alt"></i></a>
       </td>
       </tr>
      `);
    }

  } catch (err) {
    if (err) newFunction()(err);
  }

}

// function addToCart(val) {
//   const item = {
//     id: `${ val.id } `,
//     productName: `${ val.productName } `,
//     productPrice: `${ val.productPrice } `,
//   }
//   cartItem.push(item);
//   localStorage.setItem('cart', cartItem);
// }

window.addEventListener('DOMContentLoaded', userPageAccess);
window.addEventListener('load', topMenu);
window.addEventListener('load', allProducts);
window.addEventListener('load', categoryDropdown);
document.getElementById('prodCatgSearch').addEventListener('submit', searchCatgProd);
// document.getElementById('addCart').addEventListener('click', addToCart);
