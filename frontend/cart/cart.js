import {
  userPageAccess, topMenu,
} from '../functions.js';

function viewCart() {
  const items = localStorage.getItem('cart');
  console.log(items);
  const itemsObject = JSON.parse(items || 0);
  const cartDisplay = document.querySelector('#itemsheader');
  // let amount = [];
  // let subTotalVal = 0;
  if (itemsObject.length > 0) {
    itemsObject.forEach((item) => {
      if (item.productId !== 'undefined') {
        cartDisplay.insertAdjacentHTML('afterend', `
      <tr id='itemRow'>
      <td id="prodItem">
      <input type='hidden' value='${item.productId}' id="productId"></input>
      <h3 id="productName">${item.productName}</h3>
      <p></p>
    </td>
    <td id="price">
    ${item.productPrice}
    </td>
    <td>
      <input type="number" name="" class="input" id="productQty" value = '${item.productQty || 1}'>
    </td>
    <td id="subtotal">

    ${item.prodSubTotal || item.productPrice}
    </td>
    <td>
      <i class="fas fa-trash-alt" id="deleteItem"></i>
    </td>
</tr>
      `);
      }
      //SubTotal Display
      const cartItems = document.querySelectorAll('#itemRow');
      cartItems.forEach((eachItem) => {
        const itemQuantity = eachItem.querySelector('#productQty');
        itemQuantity.addEventListener('input', () => {
          const qty = parseInt(eachItem.querySelector('#productQty').value);
          const prc = eachItem.querySelector('#price').innerText;
          const subTotal = qty * prc;
          // eslint-disable-next-line no-param-reassign
          eachItem.querySelector('#subtotal').innerText = subTotal;
          // // amount.push(subTotal);
          // console.log(`amount = ${amount}`);
        });


        // Default Total Amount display
        const itemqty = document.querySelectorAll('#productQty');
        itemqty.forEach((eachqty) => {
          const allSubTotalArr = [];
          const allSubTotal = document.querySelectorAll('#subtotal');
          allSubTotal.forEach((subTotal) => {
            allSubTotalArr.push(parseFloat(subTotal.innerText) || 0);
            document.querySelector('#totalPrice').innerText = allSubTotalArr.reduce((total, num) => total + num);
          });
        });

        // Total Amount display on Quantity Change
        itemqty.forEach((eachqty) => {
          eachqty.addEventListener('input', () => {
            const allSubTotalArr = [];
            const allSubTotal = document.querySelectorAll('#subtotal');
            allSubTotal.forEach((subTotal) => {
              allSubTotalArr.push(parseFloat(subTotal.innerText) || 0);
              // console.log(allSubTotalArr);
              document.querySelector('#totalPrice').innerText = allSubTotalArr.reduce((total, num) => total + num);
            });
          });
        });

        const deleteItem = eachItem.querySelector('#deleteItem');
        deleteItem.addEventListener('click', () => { // returns a bug if deleted row is not first row
          const Itemlist = deleteItem.parentNode.parentNode;
          const itemTotal = Itemlist.querySelector('#subtotal').innerText;
          const allTotal = document.querySelector('#totalPrice').innerText;
          document.querySelector('#totalPrice').innerText = allTotal - itemTotal;

          eachItem.remove();
        });
      });
    });
  }
}

function checkOut() {
  const allCartItems = [];
  const cart = [];
  const itemRows = document.querySelectorAll('#itemRow');
  itemRows.forEach((itemRow) => {
    const rowObj = {
      productId: itemRow.querySelector('#productId').value,
      productName: itemRow.querySelector('#productName').innerText,
      productPrice: itemRow.querySelector('#price').innerText,
      productQty: itemRow.querySelector('#productQty').value,
      prodSubTotal: itemRow.querySelector('#subtotal').innerText,
      cartTotal: document.querySelector('#totalPrice').innerText,
    };
    allCartItems.push(rowObj);
    cart.push(rowObj);

    localStorage.setItem('cartItems', JSON.stringify(allCartItems));
    localStorage.setItem('cart', JSON.stringify(cart));

    window.location.replace('/UI/cart/receipt.html');
  });
}
window.addEventListener('DOMContentLoaded', userPageAccess);
window.addEventListener('load', topMenu);
window.addEventListener('load', viewCart);
document.querySelector('#checkout').addEventListener('click', checkOut);
