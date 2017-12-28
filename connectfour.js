document.addEventListener('DOMContentLoaded', function() {
  function gameBoard() {
    var container = document.querySelector('.container');
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

  gameBoard();
}, false);
