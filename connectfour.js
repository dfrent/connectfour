function playChip(cell) {
  newCell = document.createElement('div')
  newCell.classList = 'chip'
  cell.appendChild(newCell);
  cell.setAttribute("data-player", `${currentPlayer}`);
  if (currentPlayer === 1) {
    newCell.style.backgroundColor = "red";
    winChecker();
    currentPlayer = 2;
  } else if (currentPlayer === 2) {
    newCell.style.backgroundColor = "yellow";
    winChecker();
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

function rowWin() {
  for (var r = 0; r < 6; r++) {
    var streak = 1;
    var previousPlayer;
    var currentRow = document.querySelectorAll(`[data-row='${r}']`);
    for (var c = 0; c < 7; c++) {
      var currentPlayer = currentRow[c].getAttribute(`data-player`)
      if (currentPlayer === previousPlayer && currentPlayer !== null) {
        streak++;
      } else {
        streak = 1;
      }
      previousPlayer = currentPlayer;
      if ( streak === 4 ) {
        return true;
      }
    };
  };
};

function columnWin() {
  for (var r = 0; r < 7; r++) {
    var streak = 1;
    var previousPlayer;
    var currentColumn = document.querySelectorAll(`[data-column='${r}']`);
    for (var c = 0; c < 6; c++) {
      var currentPlayer = currentColumn[c].getAttribute(`data-player`)
      if (currentPlayer === previousPlayer && currentPlayer !== null) {
        streak++;
      } else {
        streak = 1;
      }
      previousPlayer = currentPlayer;
      if ( streak === 4 ) {
        return true;
      }
    };
  };
};

function diagonalWin() {

};

function winChecker() {
  if (rowWin() || columnWin() || diagonalWin()) {
    alert(`Player ${currentPlayer} Wins!`);
    document.location.reload();
  }
};

document.addEventListener('DOMContentLoaded', function() {
  var container = document.querySelector('.container');
  window.currentPlayer = 1;

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
