function topmenu() {
  document.write("<div class='logo-top'>");
  document.write("<a href='index.html'> <img src='images/logo.png' alt='Ilupeju Stores logo' srcset='images/logo.png 240w, images/logo.png 320w, images/logo.png 480w, images/logo.png 3200w' aria-setsize='' > </a > ");
  document.write("</div >");
  document.write("<div id='menubar' class='allmenu'>");
  document.write("<div class='menu' id='menubar'>");
  document.write("<ul>");
  document.write("<li class='active'><a href='dashboard.html'>Dashboard</a></li>");
  document.write("<li><a href='products.html'>Products</a></li>");
  document.write("<li><a href='audit/john-doe.html'>Sales Audit</a></li>");
  document.write("<li><a href='report-incidence.html'>Incidence</a></li>");
  document.write("<li><a href='cart/index.html'>Shopping cart</a></li>");
  document.write("</ul>");

  document.write("</div >");
  document.write("<div class='profile'>");
  document.write("<div class='dropdown'>");
  document.write("<button onclick='myProfileFunction()' class='dropbtn'> &nbsp;&nbsp;&nbsp;</button>");
  document.write("<div id='myDropdown' class='dropdown-content'>");
  document.write("<a href='#'>Hi John!</a>");
  document.write("<a href='#home'>Profile</a>");
  document.write("<a href='#about'>Sales orders</a>");
  document.write("<a href='#contact'>Logout</a>");
  document.write("</div>");
  document.write("</div>");
  document.write("</div>");
  document.write("<a href='javascript:void(0);' class='icon' onclick='myFunction()'>");
  document.write("<i class='fa fa-bars'></i>");
  document.write("</a>");
  document.write("</div >");
}