var currentPlayer = 1;

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
}

// Sets the chip background colour
function chipColour() {
  switch (currentPlayer) {
    case 1:
      newCell.style.backgroundColor = "red";
      break;
    case 2:
      newCell.style.backgroundColor = "yellow";
      break;
  }
}

// Controls the playing of a chip
function playChip(cell) {

  // Creates a chip div, assigns a class, appends it to the particular cell, and assigns a player ID to it
  newCell = document.createElement('div')
  newCell.classList = 'chip'
  cell.appendChild(newCell);
  cell.setAttribute("data-player", `${currentPlayer}`);

  chipColour();
  
  // Sets the housing square cell to "clicked"
  cell.setAttribute("data-clicked", true);
}

// Controls the creation of the game board
function gameBoard() {

  // Selects the board container
  var container = document.querySelector('.container');

  // Number of row index numbers (6 total)
  var rowNum = 5;

  // 42 individual cells are created and given class "slot"
  for (var divCount = 42; divCount > 0; divCount--) {
    newDiv = document.createElement('div');
    container.appendChild(newDiv);
    newDiv.className = `slot${divCount} slot`;
    if (divCount % 7 === 0 && divCount !== 42) {
      rowNum--;
    }

    // Assigns each cell an appropriate row, column, and "false" clicked status
    newDiv.setAttribute("data-row", `${rowNum}`);
    newDiv.setAttribute("data-column", `${(divCount - 1) % 7}`);
    newDiv.setAttribute("data-clicked", false);
  }
}

// Function to detect a win with 4 in a row
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

// Function to detect a win with 4 in a column
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

// Function to detect a win with 4 in a diagonal
function diagonalWin() {

};

// Function that runs all 3 win checks and sends a message if one returns true
function winChecker() {
  if (rowWin() || columnWin() || diagonalWin()) {
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
          nextTurn();
          break;

        // In case of a non-empty column
        } else if (cell.getAttribute('data-clicked') === "true") {
          fullColumn.filter(cell => cell.getAttribute("data-clicked") === 'true');
          newCellRow = parseInt(allClicked[0].getAttribute('data-row')) + 1;
          newCell = fullColumn.filter(cell => cell.getAttribute('data-row') === `${newCellRow}`)[0];
          playChip(newCell);
          nextTurn();
          break;
        }
      }
    }
  });

  gameBoard();
}, false);
