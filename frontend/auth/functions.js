import config from '../config.js';

const portPath = config.port;
// const cartItems = [];
function userLogin(e) {
  e.preventDefault();
  const formContent = {
    userEmail: document.getElementById('userEmail').value,
    password: document.getElementById('password').value,
  };
  fetch(`${portPath}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formContent),
  })
    .then(res => res.json())
    .then((data) => {
      // const credentials = []; // how do you separate these values, you can't separate by comma
      // credentials.push(data.token);
      // credentials.push(data.userId);
      // credentials.push(data.userPriviledge);
      // credentials.push(data.userName);
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('userPriviledge', data.userPriviledge);
        localStorage.setItem('userName', data.userName);
        localStorage.setItem('cart', '');
        localStorage.removeItem('cartItems');
        redirect: window.location.replace('../../UI/dashboard.html');
        console.log(localStorage);
      } else {
        let errormsg = [];
        if (data.userEmail) {
          errormsg.push(data.userEmail);
        }
        if (data.password) {
          errormsg.push(`<br>${data.password}`);
        }
        if (data.message) {
          errormsg.push(`<br>${data.message}`);
        }

        document.getElementById('errorDisplay').innerHTML = `${errormsg}`;
        // document.getElementById('errorDisplay2').innerHTML = `${data.message}`;
      }
    })
    .catch(error => console.log(error.message));
}
document.getElementById('userLogin').addEventListener('submit', userLogin);
