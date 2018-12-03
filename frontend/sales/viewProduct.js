import config from '../config.js';
import {
  token, access, userPageAccess, topMenu, getimage,
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
    try {
      const findCategory = await fetch(`${portPath}/categories/${theproduct.categories_id}`, {
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
    document.getElementById('container').innerHTML = `
    
    <h2>${theCategory} - ${theproduct.productname}</h2>

    <div class="content">
      <div class="left">
        <h3>Details</h3>
        <div class="filter">
          <p>&nbsp; for each ${theproduct.productspec} - N${theproduct.productprice}</p>
          <br>
          <p>&nbsp; ${theproduct.productspec} left in the store - ${theproduct.productquantity}</p>
          <br>
          <p>&nbsp; minimum inventory quantity allowed -${theproduct.productlimit}</p>
        </div>
      </div>
      <div class="right white-bg">

      <div class="showproduct">
        <div class="productimage">
          <img src="../../${getimage(theproduct)}" alt="Ilupeju Stores Bread" jprcset="../../${getimage(theproduct)} 240w, ${getimage(theproduct)} 320w, ${getimage(theproduct)} 480w, ${getimage(theproduct)} 800w"
            aria-setsize="">
        </div>
        <div class="productdetails">
        ${theproduct.productdetails}
          <br><br>
        </div>
        </div
        <div class='productreviews'>  
          <h3>Reviews/Feedback</h3>
          <form action="">
            <textarea name="" id="mytextarea" cols="30" rows="5"></textarea>
            <button type="submit">submit</button>
          </form>
        </div>
      </div>
    </div>

    `;
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener('DOMContentLoaded', userPageAccess);
window.addEventListener('load', topMenu);
window.addEventListener('load', getProduct);
// document.getElementById('getProduct').addEventListener('click', console.log('message'));
