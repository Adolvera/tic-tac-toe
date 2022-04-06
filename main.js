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

  // const renderBoard = () => {
  //   let counter = 1;

  //   gameBoard.gameArray.forEach((square) => {
  //     let squareContainer = document.querySelector(`#square-${counter.toString()}`);
  //     let squareDiv = document.createElement('div');
  //     squareDiv.classList.add('square');
  //     squareDiv.textContent = `${square}`;
  //     squareContainer.appendChild(squareDiv);
  //     counter++;
  //   })
  // }
  
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

  return {
    makeChoice,
    checkForm,
    renderPlayers
  }
})();

const runGame = (() => {
  let round = 0;

  const playerAssign = (playerOne, playerTwo) => {
    const first = Player(playerOne, "X");
    const second = Player(playerTwo, "O");
    displayController.renderPlayers(first, second);
  }

  const updateArray = (square, sign) => {
    const index = parseInt(square.slice(-1)) - 1;
    gameBoard.gameArray[index] = sign;
    checkWin(gameBoard.gameArray, sign);
  }

  const checkWin = (array, sign) => {
    if (sign === "X") round++;

    if (round < 3) return;

    console.log('haha')
  }

  return {
    playerAssign,
    updateArray
  }

})()
