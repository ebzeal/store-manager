import config from '../config.js';
import {
  token, userPageAccess, userName, userId,
} from '../functions.js';

const portPath = config.port;

function viewReceipt() {
  const items = localStorage.getItem('cartItems');
  console.log(items);
  const itemsObject = JSON.parse(items);
  const checkoutDisplay = document.querySelector('#itemsheader');
  if (itemsObject.length > 0) {
    itemsObject.forEach((item) => {
      if (item.productId !== 'undefined') {
        checkoutDisplay.insertAdjacentHTML('afterend', `
        <tr id='cartList'>
        <td>
          <div class="productdetails" id='productdetails'>
          <input type='hidden' value='${item.productId}' id="productId"></input>
            <p>${item.productName}</p>
          </div>
        </td>
        <td id='productPrice'>${item.productPrice}</td>
        <td id='productQty'>
        ${item.productQty}
        </td>
        <td id='productSubTotal'>${item.prodSubTotal}</td>
      </tr>
      `);
      }
      document.querySelector('#cartTotal').innerText = `${itemsObject[0].cartTotal}`;
      document.querySelector('#attendant').innerText = userName;
      document.querySelector('#attendantId').value = userId;
      const salesdate = new Date();
      document.querySelector('#salesDate').innerText = `Date : ${salesdate.getDate()} - ${salesdate.getMonth() + 1} - ${salesdate.getFullYear()}`;
      document.querySelector('#salesInvoice').innerText = `${salesdate.getFullYear()}${salesdate.getMonth() + 1}${salesdate.getDate()}${Math.floor(Math.random() * 100) + 1}`;
    });
  }
}

function payCart() {
  const itemRows = document.querySelectorAll('#cartList');
  itemRows.forEach((itemRow) => {
    const bodyVal = {
      invoice_num: parseInt(document.querySelector('#salesInvoice').innerText, 10),
      products_id: itemRow.querySelector('#productId').value,
      users_id: document.querySelector('#attendantId').value,
      quantity: itemRow.querySelector('#productQty').innerText,
      amount: itemRow.querySelector('#productSubTotal').innerText,
      totalAmount: document.querySelector('#cartTotal').innerText,
    };
    console.log(bodyVal);
    fetch(`${portPath}/sales`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyVal),
    })
      .then(res => res.json());
  });
}
window.addEventListener('DOMContentLoaded', userPageAccess);
window.addEventListener('load', viewReceipt);
document.querySelector('#payButton').addEventListener('click', payCart);
