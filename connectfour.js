document.addEventListener('DOMContentLoaded', function() {
  function gameBoard() {
    var container = document.querySelector('.container');
    for (var divCount = 42; divCount > 0; divCount--) {
      var rowNum = 0;
      newDiv = document.createElement('div');
      container.appendChild(newDiv);
      newDiv.className = `slot${divCount + 1} slot`;
      newDiv.setAttribute("data-");
    }
  }

  gameBoard();
}, false);
