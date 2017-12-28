document.addEventListener('DOMContentLoaded', function() {
  var container = document.querySelector('.container');
  var currentPlayer = 1;

  function playChip(cell) {
    if (currentPlayer === 1) {
      cell.style.backgroundColor = "red";
      currentPlayer = 2;
    } else if (currentPlayer === 2) {
      cell.style.backgroundColor = "yellow";
      currentPlayer = 1;
    }
    cell.setAttribute("data-clicked", true);
  }

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
      newDiv.setAttribute("data-clicked", false);
    }
  }

  container.addEventListener('click', function(e) {
    var clicked = e.target
    var clickedColumn = clicked.getAttribute('data-column');
    var fullColumn = [].slice.call(document.querySelectorAll(`[data-column="${clickedColumn}"]`));;
    var allClicked = fullColumn.filter(cell => cell.getAttribute("data-clicked") === 'true');

    if (clicked.classList.contains('slot') && clicked.getAttribute('data-clicked') === 'false' && clicked.getAttribute('data-row') < 6) {
      for (var i = 0; i < fullColumn.length; i++) {
        cell = fullColumn[i];
        if (cell.getAttribute('data-clicked') === "false" && cell.getAttribute('data-row') === "0") {
          playChip(cell);
          break;
        } else if (cell.getAttribute('data-clicked') === "true") {
          fullColumn.filter(cell => cell.getAttribute("data-clicked") === 'true');
          newCellRow = parseInt(allClicked[0].getAttribute('data-row')) + 1;
          newCell = fullColumn.filter(cell => cell.getAttribute('data-row') === `${newCellRow}`)[0];
          playChip(newCell);
          break;
        }
      }
    }
  });

  gameBoard();
}, false);
