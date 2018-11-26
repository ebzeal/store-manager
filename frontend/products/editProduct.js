import config from '../config.js';
import {
  token, access, adminPageAccess, topMenu, getimage, categoryDropdown
} from '../functions.js';
// import modalTab from '../modal.js';

const portPath = config.port;

const url = document.URL;
const urlsplit = url.split('=');
const urlid = urlsplit[1];

async function getProduct() {
  let theproduct;
  try {
    const findproduct = await fetch(`${portPath}/products/${urlid}`, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    });
    theproduct = await findproduct.json();
    console.log(theproduct);
    let theCategory;
    let theCategoryId;
    try {
      const findCategory = await fetch(`${portPath}/categories/${theproduct.categories_id}`, {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      });
      const seeCategory = await findCategory.json();
      theCategory = seeCategory.categoryname;
      theCategoryId = seeCategory.id;
    } catch (err) {
      console.log(err);
    }
    // document.getElementById('updateProduct').innerHTML = `
    // <p>${theproduct.productname}</p>
    // <input type="text" name="productName" id="productName" placeholder="Product Name" value="${theproduct.productname}">
    // <p>Product Category</p>
    // <select id="categories_id">
    //   <option value="${theCategoryId}" disabled>${theCategory}</option>
    //   <option value="groceries" selected>Groceries</option>
    //   <option value="mshoes">Men Shoes</option>
    //   <option value="wshoes">Women Shoes</option>
    //   <option value="electronics">Electronics</option>
    // </select>
    // <p>Product Image</p>
    // <img src="../../../${theproduct.productimage}" alt="">
    // <p>Replace Product Image</p>
    // <input type="file" name="productImage" id="productImage">
    // <p>Product Details</p>
    // <textarea name="productDetails" id="productDetails" cols="30" rows="5"> ${theproduct.productdetails} </textarea>
    // <p>Product Specification</p>
    // <input type="text" name="productSpec" id="productSpec" placeholder="product specification" value="${theproduct.productspec}">
    // <p>Price</p>
    // <input type="number" name="productPrice" id="productPrice" placeholder="Price(N)" value="${theproduct.productprice}">
    // <p>Stock Limit</p>
    // <input type="number" name="productLimit" id="productLimit" placeholder="Quantity Limit" value="${theproduct.productlimit}">
    // <p>Quantity</p>
    // <input type="number" name="productQuantity" id="productQuantity" placeholder="Price(N)" value="${theproduct.productquantity}">    
    // <button type="submit">Edit Product</button>
    //  `;
    document.getElementById('productName').value = `${theproduct.productname}`;
    document.getElementById('prodCatgSearch').value = `${theproduct.categories_id}`;
    // document.getElementById('productImage').value = `${theproduct.productimage}`;
    document.getElementById('image').src = `${theproduct.productimage}`;
    document.getElementById('productDetails').value = `${theproduct.productdetails}`;
    document.getElementById('productSpec').value = `${theproduct.productspec}`;
    document.getElementById('productPrice').value = `${theproduct.productprice}`;
    document.getElementById('productLimit').value = `${(theproduct.productlimit).toString()}`;
    document.getElementById('productQuantity').value = `${(theproduct.productquantity).toString()}`;
  } catch (err) {
    console.log(err);
  }
}


async function editProduct(event) {
  const fileInput = document.getElementById('productImage');
  event.preventDefault();
  // clear();
  const formData = new FormData();
  formData.append('categories_id', document.getElementById('prodCatgSearch').value);
  formData.append('productName', document.getElementById('productName').value);
  formData.append('productImage', fileInput.files[0]);
  formData.append('productDetails', document.getElementById('productDetails').value);
  formData.append('productSpec', document.getElementById('productSpec').value);
  formData.append('productPrice', 300);
  formData.append('productQuantity', document.getElementById('productQuantity').value);
  formData.append('productLimit', document.getElementById('productLimit').value);
  console.log(formData);
  try {
    const newProduct = await fetch(`${portPath}/products/${urlid}`, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `${token}`,
      },
    });
    const addedProduct = await newProduct.json();
    console.log(addedProduct);
    // if ((addedProduct.categories_id || addedProduct.productName || addedProduct.productPrice) && !addedProduct.id) {
    //   const errormsgs = Object.values(addedProduct);
    //   for (const msg of errormsgs) {
    //     document.querySelector('#errorDisplay').innerHTML += `${msg}<br>`;
    //   }
    // }
    // if (addedProduct.message && !addedProduct.id) {
    //   document.querySelector('#errorDisplay').innerHTML += `${addedProduct.message}<br>`;
    // }
    if (addedProduct.id) {
      document.querySelector('#successMsg').innerHTML += `${addedProduct.productname} has been updated <br>Quantity - ${addedProduct.productquantity}  <br>`;
    }

  } catch (err) {
    console.log(err);
  }
}
// const submitInput = document.getElementById('addProduct');
// submitInput.addEventListener('keyup', (e) => {
//   if (e.keyCode === 13) {
//     document.getElementById('submitForm').click();
//   }
// });

window.addEventListener('DOMContentLoaded', adminPageAccess);
window.addEventListener('load', topMenu);
window.addEventListener('load', getProduct);
window.addEventListener('load', categoryDropdown);
document.getElementById('updateProduct').addEventListener('submit', editProduct);
