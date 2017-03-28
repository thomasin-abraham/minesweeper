document.addEventListener('DOMContentLoaded', startGame)


var board = {
  cells: []
}

function startGame () {
  var size = prompt("How many rows?")
  if (!isNaN(size) && size < 7) {
  generateBoard(size)
  for(var i = 0; i < board.cells.length; i++) {
    countSurroundingMines(board.cells[i])
  }
  lib.initBoard()
  document.addEventListener("click", checkForWin)
  document.addEventListener("contextmenu", checkForWin)
} else if (!isNaN(size) && size > 6) {
  alert("Board too big (needs to be 6 or under)")
  startGame()
} else {
  alert("Not a number (enter a number)")
  startGame()
}
}

function generateBoard(size) {
  for(var i=1; i<=size; i++) {
    for(var j=1; j<=size; j++) {
    var randomNum = Math.random()
    var generateMine = false;
    if (randomNum > 0.8) {
      generateMine = true;
    }
    var generateCell = {
      row: i,
      col: j,
      isMine: generateMine,
      isMarked: false,
      hidden: true,
      surroundingMines: 0
    }
    board.cells.push(generateCell)
  }
  }
}


function checkForWin () {
for(i = 0; i < board.cells.length; i++) {
if (board.cells[i].isMine && board.cells[i].isMarked) {
} else if (!board.cells[i].isMine && !board.cells[i].hidden) {
} else {
  return
}
}
displayMessage(winMessage)
}


function countSurroundingMines (cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  var count = 0;
  for(var i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine === true) {
      count++;
    }
  }
  cell.surroundingMines = count;
}
