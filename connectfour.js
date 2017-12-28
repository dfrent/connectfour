document.addEventListener('DOMContentLoaded', function() {
  var container = document.querySelector('.container');

  function gameBoard() {
    var container = document.querySelector('.container');
    var rowNum = 5;
    for (var divCount = 42; divCount > 0; divCount--) {
      newDiv = document.createElement('div');
      container.appendChild(newDiv);
      newDiv.className = `slot${divCount} slot`;
      if (divCount % 7 === 0 && divCount !== 42) {
        rowNum--;
      }
      newDiv.setAttribute("data-row", `${rowNum}`);
      newDiv.setAttribute("data-column", `${(divCount - 1) % 7}`);
    }
  }

  container.addEventListener('click', function(e) {
    var clicked = e.target
    var clickedColumn = clicked.getAttribute('data-column');
    var fullColumn = document.querySelectorAll(`[data-column="${clickedColumn}"]`)

    fullColumn.forEach(function(cell) {
      cell.style.backgroundColor = 'red';
    } )
    // if (clicked.classList.contains('slot') ) {
    //   clicked.style.backgroundColor = "red";
    // }
  });




  gameBoard();
}, false);
