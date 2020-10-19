// Player factory function
const Player = (name, marker) => {
  const getName = () => name;
  const getMark = () => marker;
  return { getName, getMark }
}

// GameBoard module
const gameBoard = ( () => {
  let board = ["", "", "",
               "", "", "",
               "", "", ""];

  const getBoard = () => board;

  const updateBoard = (index, mark) => board[index] = mark;

  const checkWin = () => {
    if (board[0] === board[1] && board[1] === board[2] && board[2] !== "") {
      return true;
    }
    else if (board[3] === board[4] && board[4] === board[5] && board[4] !== "") {
      return true;
    }
    else if (board[6] === board[7] && board[7] === board[8] && board[6] !== "") {
      return true;
    }
    else if (board[0] === board[3] && board[3] === board[6] && board[6] !== "") {
      return true;
    }
    else if (board[1] === board[4] && board[4] === board[7] && board[4] !== "") {
      return true;
    }
    else if (board[2] === board[5] && board[5] === board[8] && board[2] !== "") {
      return true;
    }
    else if (board[0] === board[4] && board[4] === board[8] && board[4] !== "") {
      return true;
    }
    else if (board[2] === board[4] && board[4] === board[6] && board[2] !== "") {
      return true;
    }
    else {
      return false;
    }
  }

  const checkTie = () => {
    if (board.includes("")) {
      return false;
    }
    else {
      return true;
    }
  }

  return {
    getBoard,
    updateBoard,
    checkWin,
    checkTie,
  }
})();

// GameBoard controller module
const gameController = ( () => {
  let turn = 1;

  let playerOne = Player("Player One", "X");
  let playerTwo = Player("Player Two", "O");

  const startGame = () => {
    restart();
    playerOne = Player(document.getElementById("player-one-input-name").value, document.getElementById("player-one-input-mark").value);
    playerTwo = Player(document.getElementById("player-two-input-name").value, document.getElementById("player-two-input-mark").value);
    startBtn.textContent = `${playerOne.getName()}'s Turn!`;
  }

  const startBtn = document.getElementById('start-btn');
  startBtn.addEventListener("click", startGame);

  const restart = () => {
    for (let i = 0; i < 9; i++) {
      gameBoard.updateBoard(i, "");
    }
    turn = 1;
    populateBoard();
    setMessage();
    boardArr.forEach( square => square.addEventListener("click", placeMarker));
  }

  const restartBtn = document.getElementById("restart-btn");
  restartBtn.addEventListener("click", restart);

  const placeMarker = (e) => {
    let board = gameBoard.getBoard();
    let marker = playerOne.getMark();
    if (turn % 2 === 0) {
      marker = playerTwo.getMark();
    }
    else {
      marker = playerOne.getMark();
    }
    if (board[e.target.dataset.place] !== "") {
      return;
    }
    e.target.textContent = marker;
    gameBoard.updateBoard(e.target.dataset.place, marker);
    populateBoard();
    turn++;
    setMessage();
    handleWin();
  }

  const boardSquares = document.getElementsByClassName("square");
  const boardArr = Array.from(boardSquares);
  boardArr.forEach( square => square.addEventListener("click", placeMarker));

  const setMessage = () => {
    if (turn % 2 === 0) {
      startBtn.textContent = `${playerTwo.getName()}'s Turn!`;
      if (gameBoard.checkWin() === true) {
        startBtn.textContent = `${playerOne.getName()} Wins!`;
      }
    }
    else {
      startBtn.textContent = `${playerOne.getName()}'s Turn!`;
      if (gameBoard.checkWin() === true) {
        startBtn.textContent = `${playerTwo.getName()} Wins!`;
      }
    }
    if (gameBoard.checkTie() === true) {
      startBtn.textContent = "Tie!";
    }
  }

  const populateBoard = () => {
    boardArr.forEach( square => {
      square.textContent = gameBoard.getBoard()[square.dataset.place];
    })
  }

  const handleWin = () => {
    if (gameBoard.checkWin() === true) {
      boardArr.forEach( square => square.removeEventListener("click", placeMarker));
    }
  }
})();