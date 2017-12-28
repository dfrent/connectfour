document.addEventListener('DOMContentLoaded', function() {
  var container = document.querySelector('.container');

  function gameBoard() {
    for (var divCount = 42; divCount > 0; divCount--) {
      var rowNum = 0;
      newDiv = document.createElement('div');
      container.appendChild(newDiv);
      newDiv.className = `slot${divCount} slot`;
      newDiv.setAttribute("data-row", `${rowNum}`);
      if (divCount % 7 === 0 && divCount !== 42) {
        rowNum++;
      }
    }
  }



  container.addEventListener('click', function(e) {
    var clicked = e.target
    if (clicked.classList.contains('slot') ) {
      clicked.style.backgroundColor = "red";
    }
  });




  gameBoard();
}, false);
