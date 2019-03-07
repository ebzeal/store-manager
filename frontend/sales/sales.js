import config from '../config.js';
import {
  userId, token, access, userPageAccess, topMenu, getimage,
} from '../functions.js';
// import modalTab from '../modal.js';

const portPath = config.port;

// let cartItem = [];

function newFunction() {
  return console.log;
}

// function userPath() {
//   if (access === 'Admin') {
//     return `${portPath}/sales`;
//   } return `${portPath}/sales/own/${localStorage.getItem('userId')}`;
// }
async function allSales() {
  if (access === 'Admin') {
    try {
      const notify = await fetch(`${portPath}/sales`, {
        headers: {
          Authorization: token,
        },
      });
      const notices = await notify.json();
      console.log('notices ' + notices);
      const vals = Object.values(notices.rows);
      console.log('vals ' + vals);
      const salesheader = document.querySelector('#itemsheader');
      vals.forEach((val) => {
        fetch(`${portPath}/products/${val.products_id}`, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        })
          .then(res => res.json())
          .then((theItem) => {
            fetch(`${portPath}/users/${val.users_id}`, {
              headers: {
                Authorization: token,
                'Content-Type': 'application/json',
              },
            })
              .then(res => res.json())
              .then((theUser) => {
                const readDate = val.salesdate.split('T');
                const readTime = val.salestime.split('T');
                salesheader.insertAdjacentHTML('afterend', `
      <tr>
            <td><a href="#">${theUser.username}</a> </td>
            <td><a href="/../../UI/products/?id=${val.products_id}">${theItem.productname}</a></td>
            <td> <img src='/${theItem.productimage}' /> </td>
            <td>${val.quantity}</td>
            <td>${val.amount}</td>
            <td>${(readTime[1].split('.'))[0]}</td>
            <td>${readDate[0]}</td>
          </tr>
      `);
              });
          });
      });
    } catch (err) {
      if (err) newFunction()(err);
    }
  } else {
    try {
      const notify = await fetch(`${portPath}/sales/own/${localStorage.getItem('userId')}`, {
        headers: {
          Authorization: token,
        },
      });
      const notices = await notify.json();
      console.log('notices ' + notices);
      const vals = Object.values(notices);
      console.log('vals ' + vals);
      const salesheader = document.querySelector('#itemsheader');
      vals.forEach((val) => {
        fetch(`${portPath}/products/${val.products_id}`, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        })
          .then(res => res.json())
          .then((theItem) => {
            fetch(`${portPath}/users/${val.users_id}`, {
              headers: {
                Authorization: token,
                'Content-Type': 'application/json',
              },
            })
              .then(res => res.json())
              .then((theUser) => {
                const readDate = val.salesdate.split('T');
                const readTime = val.salestime.split('T');
                salesheader.insertAdjacentHTML('afterend', `
      <tr>
            <td><a href="#">${theUser.username}</a> </td>
            <td><a href="/../../UI/products/?id=${val.products_id}">${theItem.productname}</a></td>
            <td> <img src='/${theItem.productimage}' /> </td>
            <td>${val.quantity}</td>
            <td>${val.amount}</td>
            <td>${(readTime[1].split('.'))[0]}</td>
            <td>${readDate[0]}</td>
          </tr>
      `);
              });
          });
      });
    } catch (err) {
      if (err) newFunction()(err);
    }
  }
}

// function addToCart(val) {
//   const item = {
//     id: `${val.id}`,
//     productName: `${val.productName}`,
//     productPrice: `${val.productPrice}`,
//   }
//   cartItem.push(item);
//   localStorage.setItem('cart', cartItem);
// }

window.addEventListener('DOMContentLoaded', userPageAccess);
window.addEventListener('load', topMenu);
window.addEventListener('load', allSales);
// window.addEventListener('load', categoryDropdown);
// document.getElementById('prodCatgSearch').addEventListener('submit', searchCatgProd);
// document.getElementById('addCart').addEventListener('click', addToCart);
