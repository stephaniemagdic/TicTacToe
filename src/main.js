//---------------------GLOBAL VARIABLES--------------------------------------//
var leftAsideText = document.querySelector(".player1-wins");
var rightAsideText = document.querySelector(".player2-wins");
var leftAsideToken = document.querySelector(".player-1-token");
var rightAsideToken = document.querySelector(".player-2-token");
var trackerDisplay = document.querySelector(".turn-tracker-winner-display");
var gameBoardSection = document.querySelector(".game-board");
var resetWinsButton = document.querySelector(".reset-wins");
var subtractPlayer1WinButton = document.querySelector(".subtract-win-player1")
var subtractPlayer2WinButton = document.querySelector(".subtract-win-player2")
var addWinPlayer1Button = document.querySelector(".add-win-player1");
var addWinPlayer2Button = document.querySelector(".add-win-player2");
var currentGame;

//---------------------EVENT LISTENERS---------------------------------------//
window.addEventListener("load", createBoard);
// resetWinsButton.addEventListener("click", clearWins);
gameBoardSection.addEventListener("click", function(e) {
  if (e.target.classList.contains("open-position") && !e.target.innerText) {
      takeTurn(e);
  }
});

subtractPlayer1WinButton.addEventListener("click", function() {
  updateWins(-1, 0);
});

subtractPlayer2WinButton.addEventListener("click", function() {
  updateWins(-1, 1);
});

addWinPlayer1Button.addEventListener("click", function() {
  updateWins(1, 0);
});

addWinPlayer2Button.addEventListener("click", function() {
  updateWins(1, 1);
});

resetWinsButton.addEventListener("click", function() {
  updateWins(0, "both");
});

//---------------------FUNCTIONS---------------------------------------------//
function createBoard() {
  currentGame = new Game();
  currentGame.setUp();
  renderPage();
  updatePageText();
}

function renderPage() {
  gameBoardSection.innerHTML = "";
  gameBoardSection.innerHTML += `
  <table class="table">
    <tbody>
      <tr class="row-one">
        <td id="TL" class="open-position corner-left-style">
        </td>
        <td id="TC" class="open-position top-style">
        </td>
        <td id="TR" class="open-position corner-right-style">
        </td>
      </tr>
      <tr class="row-two">
        <td id="ML" class="open-position left-style">
        </td>
        <td id="MC" class="open-position middle-style">
        </td>
        <td id="MR" class="open-position right-style">
        </td>
      </tr>
      <tr class="row-three">
        <td id="BL" class="open-position corner-bottom-left-style">
        </td>
        <td id="BC" class="open-position bottom-style">
        </td>
        <td id="BR" class="open-position corner-bottom-right-style">
        </td>
      </tr>
    </tbody>
  </table>
  `;

  leftAsideToken.innerText = `⭐`;
  rightAsideToken.innerText = `❤️`;
  addTokens();
}

//combine updatePageText and displayWinOrDraw using parameters.
//call this updatePageText(text)
//can I pass parameter of of what inner HTML I want to show instead...
//then put update wins in its own function.. the leftAside, right aside lines.
function updatePageText() {
  var token = currentGame.players[currentGame.currentTurnIndexPosition].token;
  leftAsideText.innerHTML = `${currentGame.players[0].wins} wins`;
  rightAsideText.innerHTML = `${currentGame.players[1].wins} wins`;
  if (token === "star") {
    trackerDisplay.innerText = `It's ⭐'s turn`;
  } else if (token === "heart") {
    trackerDisplay.innerText = `It's ❤️'s turn`;
  }
}

function displayWinOrDraw(outcome) {
  var token = currentGame.players[currentGame.currentTurnIndexPosition].token;
  if (outcome === true) {
    if (token === "star") {
      trackerDisplay.innerText= `⭐  won!`;
    } else if (token === "heart") {
      trackerDisplay.innerText = `❤️ won!`
    };
  } else if (outcome === "draw") {
    trackerDisplay.innerText = `It's a draw!`
  }
}

function takeTurn(e) {
  var positionSelected = e.target.id;
  currentGame.players[currentGame.currentTurnIndexPosition].takenPositions.push(positionSelected);
  renderPage();

  //rather than have in checkOutcome Method.
  // will you have to change !outcome then below?
  // if (currentGame.players[currentGame.currentTurnIndexPosition].takenPositions.length >= 3) {
  // var outcome = currentGame.checkOutcome();
  // }
  var outcome = currentGame.checkOutcome();
  if (!outcome) {
    switchTurns(outcome);
  } else {
    showResult(outcome);
  }
}

function switchTurns(outcome) {
  currentGame.updateTurn();
  updatePageText();
  renderPage();
  if (outcome) {
    enableClick();
  }
}

function showResult(outcome) {
  if (outcome === "draw") {
    //updatePageText(text) instead.
    displayWinOrDraw(outcome);
    currentGame.reset();
    preventClick();
    setTimeout(function() {
      switchTurns(outcome)
    }, 2000);

  } else {
    displayWinOrDraw(outcome);
    currentGame.reset();
    preventClick();
    setTimeout(function() {
      switchTurns(outcome)
    }, 2000);
  }
}

function preventClick() {
  gameBoardSection.style.pointerEvents = "none";
}

function enableClick() {
  gameBoardSection.style.pointerEvents = "auto";
}

function addTokens() {
  var boardSpots = document.querySelectorAll('td');
  for (var i = 0; i < boardSpots.length; i ++) {
    if (currentGame.players[0].takenPositions.includes(boardSpots[i].id)) {
      boardSpots[i].innerText = `⭐`;
    } else if (currentGame.players[1].takenPositions.includes(boardSpots[i].id)) {
      boardSpots[i].innerText = `❤️`;
    }
  }
}

function updateWins(amt, playerIndex) {
  console.log(currentGame);
  currentGame.changeWins(amt, playerIndex);
  renderPage();
  updatePageText();
}
