document.addEventListener('DOMContentLoaded', startGame)

// Global Variables
var size = 4
var time = 0;
var board = {
  cells: []
}

function startGame () {
    generateBoard(size)
    for(var i = 0; i < board.cells.length; i++) {
      countSurroundingMines(board.cells[i])
    }
    lib.initBoard()
    displayMessage("minesweeper")
    clearInterval(timer)
    time = 0;
    startTimer()
    selectLevel()
    document.addEventListener("click", checkForWin)
    document.addEventListener("contextmenu", checkForWin)
}

function resetGame (level) {
    size = level
    document.getElementsByClassName('board')[0].innerHTML = "";
    board.cells = []
    startGame()
}

function generateBoard(size) {
    for(var i=1; i<=size; i++) {
      for(var j=1; j<=size; j++) {
        var randomNum = Math.random()
        var mineCount = 0
        var generateMine = false;
        if (randomNum > 0.8) {
          generateMine = true;
          mineCount++
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
    stopTimer()
    displayMessage("you win!")
}


// Timer code

function startTimer() {
    timer = setInterval(changeTime,1000)
}

function stopTimer() {
    clearInterval(timer)
}

function changeTime() {
    time++;
    document.getElementById('timer').innerHTML = time;
}


// Highlight the level button currently selected

function selectLevel() {
    var levelButtons = document.getElementsByClassName("gameinfo")[0].children
    document.getElementsByClassName("onLevel")[0].classList.remove("onLevel")
    switch (size) {
      case 3:
      levelButtons[0].classList.add("onLevel")
      break;
      case 4:
      levelButtons[1].classList.add("onLevel")
      break;
      case 5:
      levelButtons[2].classList.add("onLevel")
      break;
      case 6:
      levelButtons[3].classList.add("onLevel")
    }
}




function countSurroundingMines (cell) {
    var surrounding = lib.getSurroundingCells(cell.row, cell.col);
    var count = surrounding.filter(function(c) {return c.isMine === true}).length
    cell.surroundingMines = count;
}
