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
  const header = document.querySelector('#header');

  boardDiv.addEventListener('click', (e) => displayController.makeChoice(e))
  formButton.addEventListener('click', (e) => displayController.checkForm())

  return {
    gameArray,
    formContainer,
    playerOneInput,
    playerTwoInput,
    header
  }
})();

const displayController = (() => {
  let turn = 1;

  const resetBoard = () => {

  }
  
  const makeChoice = (e) => {
    if (e.target.textContent != "") {
      return;
    }
    if (turn) {
      e.target.textContent = "X";
      runGame.updateArray(e.target.id, "X");
      turn = 0;
    } else {
      e.target.textContent = 'O';
      runGame.updateArray(e.target.id, "O")
      turn = 1;
    }
  }

  const checkForm = () => {
    const playerOne = gameBoard.playerOneInput.value;
    const playerTwo = gameBoard.playerTwoInput.value;

    if (playerOne === "" || playerTwo === "") {
      let div = document.createElement('div');
      let p = document.createElement('p');
      p.textContent = "Please enter names for both fields!";
      div.appendChild(p);
      gameBoard.playerTwoInput.after(div);
      return
    } else {
      gameBoard.formContainer.classList.add('hidden');
      runGame.playerAssign(playerOne, playerTwo);
    }
  }

  const renderPlayers = (playerOne, playerTwo) => {
    //Element creation for vs title card
    const div = document.createElement("div");
    const playerOneDiv = document.createElement("div");
    const playerTwoDiv = document.createElement('div');
    const pPlayerOne = document.createElement('p');
    const pPlayerTwo = document.createElement('p');
    const signPlayerOne = document.createElement('p');
    const signPlayerTwo = document.createElement('p');
    const versus = document.createElement('p');

    //Text based on created players
    pPlayerOne.textContent = `${playerOne.name}`;
    pPlayerTwo.textContent = `${playerTwo.name}`;
    signPlayerOne.textContent = `${playerOne.sign}`;
    signPlayerTwo.textContent = `${playerTwo.sign}`;
    versus.textContent = "VS.";

    div.classList.add('flex');
    playerOneDiv.classList.add("players");
    playerTwoDiv.classList.add("players");
    versus.classList.add("b-text");
    signPlayerOne.classList.add("b-text");
    signPlayerTwo.classList.add("b-text");

    playerOneDiv.appendChild(pPlayerOne);
    playerOneDiv.appendChild(signPlayerOne);
    playerTwoDiv.appendChild(pPlayerTwo);
    playerTwoDiv.appendChild(signPlayerTwo);

    div.appendChild(playerOneDiv);
    div.appendChild(versus);
    div.appendChild(playerTwoDiv);
    gameBoard.header.after(div);
  }

  const callWinner = (sign, win) => {
    if (!win) resetBoard();

    console.log(gameBoard.playerTwoInput.value)
  }

  return {
    makeChoice,
    checkForm,
    renderPlayers,
    callWinner
  }
})();

const runGame = (() => {
  let round = 0;

  const playerAssign = (playerOne, playerTwo) => {
    const nameOne = playerOne.toUpperCase();
    const nameTwo = playerTwo.toUpperCase();
    const first = Player(nameOne, "X");
    const second = Player(nameTwo, "O");
    displayController.renderPlayers(first, second);
  }

  const updateArray = (square, sign) => {
    const index = parseInt(square.slice(-1)) - 1;
    gameBoard.gameArray[index] = sign;

    if (sign === "X") round++;
    if (round < 3) return;
    checkWin(sign);
  }

  const checkWin = (sign) => {
    //All possible win conditions
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    //Loops through to validate if a player has won
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      let a = gameBoard.gameArray[winCondition[0]];
      let b = gameBoard.gameArray[winCondition[1]];
      let c = gameBoard.gameArray[winCondition[2]];

      if (a === undefined || b === undefined || c === undefined) continue;

      if ((a === b) && (a === c)) {
        displayController.callWinner(sign, true);
        break;
      }

      displayController.callWinner(sign, false);
    }
  }

  return {
    playerAssign,
    updateArray
  }

})()
