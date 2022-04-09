//Player Factory
const Player = (name, sign) => {
  return { name, sign };
}

//module for element selectors and event listeners
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

//Controls the display of the game
const displayController = (() => {
  let turn = 1;
  let games = 0;

  //Creation of winner/tie container
  const divContainer = document.createElement('div');
  const div = document.createElement('div');
  const para = document.createElement('p');
  const replayButton = document.createElement('button');
  const newGameButton = document.createElement('button');
  const buttonContainer = document.createElement('div');
  replayButton.textContent = "Play Again";
  newGameButton.textContent = "New Players";

  divContainer.id = "outcome-container"
  div.id = "outcome"
  
  divContainer.appendChild(div);
  div.appendChild(para);
  buttonContainer.appendChild(replayButton);
  buttonContainer.appendChild(newGameButton);
  div.appendChild(buttonContainer);

  //Event listeners for new game buttons
  replayButton.addEventListener('click', () => {
    resetBoard();
    divContainer.classList.add("hidden");
  });

  newGameButton.addEventListener('click', () => newGame());

  //Resets board to empty
  const resetBoard = () => {
    gameBoard.gameArray = [];

    for (let i = 1; i <= 9; i++) {
      const square = document.querySelector(`#square-${i}`);
      square.textContent = "";
    }
  }
  
  //Shows sign of player where clicked
  const makeChoice = (e) => {
    if (e.target.textContent != "") return;

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

  //Checks form for desired input and starts player assignment
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


  //Renders player card above board
  const renderPlayers = (playerOne, playerTwo) => {

    if (games > 0) {
      const tempDiv = document.querySelector('.temp');
      tempDiv.remove();
    }
    
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
    div.classList.add('temp')
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
    games++;
    
  }

  //Decides winner/tie and pulls up end game container
  const callWinner = (sign, win) => {
    if (!win) {
      para.textContent = "There was a tie!";
      divContainer.classList.remove('hidden');
      gameBoard.formContainer.after(divContainer);
      turn = 1;
      return;
    };

    if (sign === "X") para.textContent = `${gameBoard.playerOneInput.value} Wins!`;
    if (sign === "O") para.textContent = `${gameBoard.playerTwoInput.value} Wins!`;

    divContainer.classList.remove('hidden');
    gameBoard.formContainer.after(divContainer);
    turn = 1;
  }

  //Clears board and returns form for new players
  const newGame = () => {
    resetBoard();
    divContainer.classList.add('hidden');
    gameBoard.playerTwoInput.value = "";
    gameBoard.playerOneInput.value = "";
    gameBoard.formContainer.classList.remove('hidden');
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

  //Creates players and calls for render of player card
  const playerAssign = (playerOne, playerTwo) => {
    const nameOne = playerOne.toUpperCase();
    const nameTwo = playerTwo.toUpperCase();
    const first = Player(nameOne, "X");
    const second = Player(nameTwo, "O");
    displayController.renderPlayers(first, second);
  }

  //Updates gameboard array and calls for win check
  const updateArray = (square, sign) => {
    const index = parseInt(square.slice(-1)) - 1;
    gameBoard.gameArray[index] = sign;

    if (sign === "X") round++;
    if (round < 3) return;
    checkWin(sign);
  }

  //Checks for all cases of victory
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

      if (i === 7) checkTie(sign);
    }
  }

  //Checks if opponents tied and calls for end game container as well
  const checkTie = (sign) => {
    let tie = true;
    for (let i = 0; i <= 8; i++) {
      let square = gameBoard.gameArray[i];
      if (square === undefined) tie = false;
    }

    if (tie) displayController.callWinner(sign, false);
  }

  return {
    playerAssign,
    updateArray
  }

})()
