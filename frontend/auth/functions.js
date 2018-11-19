import config from '../config';
// let errorMsg = '';
// let errorDisplay = document.getElementById('errorDisplay').innerHTML;

// function validateResponse(response) {
//   if (!response.ok) {
//     console.log(response);
//     document.getElementById('errorDisplay').innerHTML = response.message;
//     throw Error(response.statusText);
//   }
//   return response;
// }


function userLogin(e) {
  e.preventDefault();
  const formContent = {
    userEmail: document.getElementById('userEmail').value,
    password: document.getElementById('password').value,
  };
  // fetch('http://localhost:3000/api/v1/auth/login', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(formContent),
  // })
  //   .then((res) => {
  //     console.log(res.json());
  //     return res.json();
  //   })
  //   .then(data => localStorage.setItem('token', data.token))
  //   // redirect: window.location.replace('../../UI/dashboard.html');
  //   // )
  //   .catch((err) => {
  //     // document.getElementById('errorDisplay').innerHTML = err.message;
  //     console.log(err.message);
  //   });
  fetch(`${config.port}/auth/login,` {
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
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('userPriviledge', data.userPriviledge);
      localStorage.setItem('userName', data.userName);
      console.log(localStorage);
    })
    .catch(error => console.log(error.message));
}
document.getElementById('userLogin').addEventListener('submit', userLogin);
