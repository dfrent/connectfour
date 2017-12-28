document.addEventListener('DOMContentLoaded', function() {
  function gameBoard() {
    container = document.querySelector('.container');
    for (divCount = 0; divCount < 42; divCount++) {
      newDiv = document.createElement('div');
      container.appendChild(newDiv);
      newDiv.className = `slot${divCount + 1} slot`;
    }
  }

  gameBoard();
}, false);
