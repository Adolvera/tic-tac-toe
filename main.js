const Player = (name, sign) => {
  return { name, sign };
}

const gameBoard = (() => {
  const gameArray = [];
  const boardDiv = document.querySelector('.game-board');
  const formButton = document.querySelector('.form button[type="button"]');
  const playerOneInput = document.querySelector('#player-one');
  const playerTwoInput = document.querySelector("#player-two");
  const formContainer = document.querySelector(".form-container");

  return {
    gameArray,
    boardDiv,
    formButton,
    formContainer,
    playerOneInput,
    playerTwoInput
  }
})();

const displayController = (() => {
  let turn = 1;

  const renderBoard = () => {
    let counter = 1;

    gameBoard.gameArray.forEach((square) => {
      let squareContainer = document.querySelector(`#square-${counter.toString()}`);
      let squareDiv = document.createElement('div');
      squareDiv.classList.add('square');
      squareDiv.textContent = `${square}`;
      squareContainer.appendChild(squareDiv);
      counter++;
    })
  }
  
  const makeChoice = (e) => {
    if (e.target.textContent != "") {
      return;
    }
    if (turn) {
      e.target.textContent = jerry.sign;
      turn = 0;
    } else {
      e.target.textContent = ben.sign;
      turn = 1;
    }
  }

  const checkForm = () => {
    const playerOne = gameBoard.playerOneInput.value;
    const playerTwo = gameBoard.playerTwoInput.value;

    if (playerOne === "" || playerTwo === "") {
      return
    } else {
      gameBoard.formContainer.classList.add('hidden');
      startGame(playerOne, playerTwo);
    }
  }

  const startGame = (one, two) => {
    // const playerOne = Player(`${one}`, 'X');
    // const playerTwo = Player(`${two}`, 'O');
  }

  return {
    renderBoard,
    makeChoice,
    checkForm
  }
})();

const jerry = Player("Jerry", "X");
const ben = Player("Ben", "O");
displayController.renderBoard();

gameBoard.boardDiv.addEventListener('click', (e) => displayController.makeChoice(e))
gameBoard.formButton.addEventListener('click', (e) => displayController.checkForm())
