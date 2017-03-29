document.addEventListener('DOMContentLoaded', startGame)

// Initial Variables
var size = 4
var totalMines = 3
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
    displayMessage("minesweeper<br><br>select level:")
    clearInterval(timer)
    time = 0;
    startTimer()
    selectLevel()
    document.addEventListener("click", checkForWin)
    document.addEventListener("contextmenu", checkForWin)
}

function resetGame (level, num) {
    totalMines = num
    size = level
    document.getElementsByClassName('board')[0].innerHTML = "";
    board.cells = []
    startGame()
}

function generateBoard(size) {
    for(var i=1; i<=size; i++) {
      for(var j=1; j<=size; j++) {
        var generateCell = {
          row: i,
          col: j,
          isMine: false,
          isMarked: false,
          hidden: true,
          surroundingMines: 0
        }
        board.cells.push(generateCell)
      }
    }
    var mineCount = 0
    while (mineCount < totalMines) {
      var randomNum = Math.floor(Math.random() *  (size*size))
      if (!board.cells[randomNum].isMine) {
      board.cells[randomNum].isMine = true
      mineCount++
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
    displayMessage("you win!<br><br>select level:")
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
