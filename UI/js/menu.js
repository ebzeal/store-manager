function myFunction() {
  var x = document.getElementById('menubar');
  if (x.className === 'allmenu') {
    x.className += ' responsive';
  } else {
    x.className = 'allmenu';
  }
}
