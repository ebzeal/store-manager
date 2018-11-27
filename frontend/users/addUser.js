/* eslint-disable no-restricted-syntax */
import config from '../config.js';
import {
  token, access, adminPageAccess, topMenu, clear,
} from '../functions.js';

const portPath = config.port;


async function addUser(event) {
  const fileInput = document.getElementById('UserImage');
  event.preventDefault();
  clear();
  const formContent = {
    userName: document.getElementById('userName').value,
    userEmail: document.getElementById('userEmail').value,
    password: document.getElementById('password').value,
    password2: document.getElementById('password2').value,
    userPriviledge: document.getElementById('userPriviledge').value,
  };

  try {
    const newUser = await fetch(`${portPath}/auth/signup`, {
      method: 'POST',
      body: JSON.stringify(formContent),
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    const addedUser = await newUser.json();
    console.log(addedUser);
    if ((addedUser.userName || addedUser.userPriviledge) && !addedUser.id) {
      const errormsgs = Object.values(addedUser);
      for (const msg of errormsgs) {
        document.querySelector('#errorDisplay').innerHTML += `${msg}<br>`;
      }
    }
    if (addedUser.message && !addedUser.id) {
      document.querySelector('#errorDisplay').innerHTML += `${addedUser.message}<br>`;
    }
    if (addedUser.id) {
      document.querySelector('#successMsg').innerHTML += `${addedUser.username} has been added <br>Quantity - ${addedUser.userpriviledge}  <br>`;
    }

  } catch (err) {
    console.log(err);
  }
}
window.addEventListener('DOMContentLoaded', adminPageAccess);
window.addEventListener('load', topMenu);
document.getElementById('addUser').addEventListener('submit', addUser);
