document.addEventListener('DOMContentLoaded', function() {
  function gameBoard() {
    container = document.querySelector('.container');
    for (divCount = 0; divCount < 42; divCount++) {
      newDiv = document.createElement('div');
      container.appendChild(newDiv);
      newDiv.classList = 'slot';
    }
  }

  gameBoard();
}, false);
