import config from '../config';

function validateResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

async pageAccess() {
  const token = localStorage.getItem('token');
  console.log(token);
  if (!token || token === undefined || token == null) {
    window.stop();
    window.location.replace('../UI/index.html');
  }

  fetch(')
}
// document.getElementById('check').addEventListener('onload', pageaccess);


// export function validateResponse(response) {
//   if (!response.ok) {
//     throw Error(response.statusText);
//   }
//   return response;
// }
