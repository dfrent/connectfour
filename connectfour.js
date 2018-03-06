var currentPlayer = 1;

// Sets the chip background colour
function chipColour(cell) {
  switch (currentPlayer) {
    case 1:
    return "red";
      break;
    case 2:
      return "yellow";
      break;
  }
};

// Creates a new chip, sets the class, player data, and colour, then makes the cell "clicked"
function createChip(cell) {
  newCell = document.createElement('div')
  newCell.classList = 'chip'
  cell.setAttribute("data-player", `${currentPlayer}`);
  newCell.style.backgroundColor = chipColour();
  cell.appendChild(newCell);
  cell.setAttribute("data-clicked", true);
};

// Alternates between players
function nextTurn() {
  switch (currentPlayer) {
    case 1:
      currentPlayer = 2;
      break;
    case 2:
      currentPlayer = 1;
      break;
  }
};

// Controls the playing of a chip
function playChip(cell) {
  createChip(cell);
  nextTurn();
}

// Controls the creation of the game board
function gameBoard() {
  // Selects the board container
  var container = document.querySelector('.container');

  // Number of row index numbers (6 total)
  var rowNum = 5;

  // 42 individual cells are created and given class "slot"
  for (var slotCount = 42; slotCount > 0; slotCount--) {
    newSlot = document.createElement('div');
    container.appendChild(newSlot);
    newSlot.className = `slot${slotCount} slot`;
    if (slotCount % 7 === 0 && slotCount !== 42) {
      rowNum--;
    }

    // Assigns each cell an appropriate row, column, and "false" clicked status
    newSlot.setAttribute("data-row", `${rowNum}`);
    newSlot.setAttribute("data-column", `${(slotCount - 1) % 7}`);
    newSlot.setAttribute("data-clicked", false);
  }
}

// Function to detect a win with 4 in a row
function rowWin() {
  for (var row = 0; row < 6; row++) {
    var streak = 1;
    var previousPlayer;
    previousPlayer = null;
    var currentRow = document.querySelectorAll(`[data-row='${row}']`);
    for (var cell = 0; cell < currentRow.length; cell++) {
      var currentPlayer = currentRow[cell].getAttribute(`data-player`)
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

// Function to detect a win with 4 in a column
function columnWin() {
  for (var column = 0; column < 7; column++) {
    var streak = 1;
    var previousPlayer;
    var previousPlayer = null;
    var currentColumn = document.querySelectorAll(`[data-column='${column}']`);
    for (var cell = 0; cell < currentColumn.length; cell++) {
      var currentPlayer = currentColumn[cell].getAttribute(`data-player`)
      if (currentPlayer === previousPlayer && currentPlayer !== null) {
        streak++;
      }
      else {
        streak = 1;
      }
      previousPlayer = currentPlayer;
      if ( streak === 4 ) {
        return true;
      }
    };
  };
};

// Function to detect a win with 4 in a diagonal

function diagonalWin(x, y) {
  console.log(x, y);
  var xLimit = (6, 5);
  var yLimit = (0, 0);

  do {
    var streak = 1;
    var previousPlayer;
    var previousPlayer = null;
    // var currentPlayer = (x, y);
      if (currentPlayer === previousPlayer && currentPlayer !== null ) {
        x - 1 && y - 1 || x + 1 && y + 1
        streak++
      } else if (currentPlayer === previousPlayer && currentPlayer !== null) {
        x + 1 && y - 1 || x - 1 && y + 1
        streak++
      }else {
        streak = 1;
      }
        // previousPlayer = currentPlayer;
        // if ( streak === 4 ) {
        //   return true;
  } while (x <= xLimit && y >= yLimit);

};



// Function that runs all 3 win checks and sends a message if one returns true
function winChecker(x, y) {
  if (rowWin() || columnWin() || diagonalWin(x, y)) {
    alert(`Player ${currentPlayer} Wins!`);
    document.location.reload();
  }
};

// Event listener for post-load game functions
document.addEventListener('DOMContentLoaded', function() {
  var container = document.querySelector('.container');

  // Listens for and activates click events
  container.addEventListener('click', function(e) {
    var clicked = e.target
    var clickedColumn = clicked.getAttribute('data-column');
    var fullColumn = [].slice.call(document.querySelectorAll(`[data-column="${clickedColumn}"]`));;
    var allClicked = fullColumn.filter(cell => cell.getAttribute("data-clicked") === 'true');

    // Only adds a chip if the spot hasn't been clicked, is a slot classed item, and is at row 5 or below (on the board)
    if (clicked.classList.contains('slot') && clicked.getAttribute('data-clicked') === 'false' && clicked.getAttribute('data-row') < 6) {

      // Ensures that the chip goes to the bottom of the column
      for (var i = 0; i < fullColumn.length; i++) {
        cell = fullColumn[i];
        // In case of an empty column
        if (cell.getAttribute('data-clicked') === "false" && cell.getAttribute('data-row') === "0") {
          playChip(cell);
          winChecker(clickedColumn, 0);
          break;

        // In case of a non-empty column
        } else if (cell.getAttribute('data-clicked') === "true") {
          fullColumn.filter(cell => cell.getAttribute("data-clicked") === 'true');
          let newCellRow = parseInt(allClicked[0].getAttribute('data-row')) + 1;
          let newCell = fullColumn.filter(cell => cell.getAttribute('data-row') === `${newCellRow}`)[0];
          playChip(newCell);
          winChecker(clickedColumn, newCellRow);
          break;
        }
      }
    }
  });

  gameBoard();
}, false);
