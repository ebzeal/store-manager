import config from '../config.js';
import {
  token, access, userPageAccess, topMenu, getimage, categoryDropdown, searchCatgProd,
} from '../functions.js';

const portPath = config.port;

const url = document.URL;
const urlsplit = url.split('=');
const urlid = urlsplit[1];

async function getcatgProduct() {
  // let category;
  try {
    const findproducts = await fetch(`${portPath}/search/productsbycategories/${urlid}`, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    });
    const theproducts = await findproducts.json();
    const eachProduct = Object.values(theproducts);
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
    for (const val of eachProduct) {
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
        <td> <img src="../${getimage(val, '../')}" alt="" class="getProduct"> </td>
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
                <a href="/UI/admin/products/delete.html?id=${val.id}" title="Delete Product"><i class="fas fa-trash-alt"></i></a>
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
// async function getProduct() {

//   // let category;
//   try {
//     const findproducts = await fetch(`${portPath}/search/productsbytext/${urlid}`, {
//       headers: {
//         Authorization: `${token}`,
//         'Content-Type': 'application/json',
//       },
//     });
//     const theproducts = await findproducts.json();
//     const eachProduct = Object.values(theproducts);
//     let productsTable = `<table>
//     <tr>
//       <th>Name</th>
//       <th>Picture</th>
//       <th>Category</th>
//       <th>Specification</th>
//       <th>Quantity</th>
//       <th>Price (N)</th>
//       <th>Buy</th>
//     </tr>`;
//     // eslint-disable-next-line no-restricted-syntax
//     for (const val of eachProduct) {
//       let theCategory; // Try refactor this
//       try {
//         const findCategory = await fetch(`${portPath}/categories/${val.categories_id}`, {
//           headers: {
//             Authorization: `${token}`,
//             'Content-Type': 'application/json',
//           },
//         });
//         const seeCategory = await findCategory.json();
//         theCategory = seeCategory.categoryname;
//       } catch (err) {
//         console.log(err);
//       }
//       productsTable += `<tr>
//         <td><a href='products/?${val.productname}&id=${val.id}'> ${val.productname}</a></td>
//         <td> <img src="../${getimage(val, '../')}" alt="" class="getProduct"> </td>
//         <td>${theCategory}</td>
//         <td>${val.productspec}</td>
//         <td>${val.productquantity}</td>
//         <td>${val.productprice}</td>
//         <td><button type="submit" class="btn" onclick="window.location='cart/index.html'">Add to Cart</button></td>
//         `;
//       if (access === 'Admin') {
//         productsTable += `
//         <td>
//         <a href="edit.html" title="Edit Product"><i class="fas fa-edit"></i></a>
//                 <a href="stock.html" title="Stock Product"> <i class="fas fa-cart-plus"></i> </a>
//                 <a href="#" title="Delete Product"><i class="fas fa-trash-alt"></i></a>
//        </td>
//        `;
//       }

//       // })
//     }
//     productsTable += `
//     </tr></table>`;

//     document.getElementById('showProducts').innerHTML = productsTable;
//   } catch (err) {
//     if (err) newFunction()(err);
//   }

//   function newFunction() {
//     return console.log;
//   }

// }

window.addEventListener('DOMContentLoaded', userPageAccess);
window.addEventListener('load', topMenu);
window.addEventListener('load', getcatgProduct);
window.addEventListener('load', categoryDropdown);
document.getElementById('prodCatgSearch').addEventListener('submit', searchCatgProd);
