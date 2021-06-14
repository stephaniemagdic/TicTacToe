//---------------------GLOBAL VARIABLES--------------------------------------//
var leftAsideText = document.querySelector(".player1-wins");
var rightAsideText = document.querySelector(".player2-wins");
var leftAsideToken = document.querySelector(".player-1-token");
var rightAsideToken = document.querySelector(".player-2-token");
var trackerDisplay = document.querySelector(".turn-tracker-winner-display");
var gameBoardSection = document.querySelector(".game-board");
var resetWinsButton = document.querySelector(".reset-wins");
var player1WinSubtractButton = document.querySelector(".subtract-win-player1");
var player2WinSubtractButton = document.querySelector(".subtract-win-player2");
var player1WinAddButton = document.querySelector(".add-win-player1");
var player2WinAddButton = document.querySelector(".add-win-player2");
var leftEmojiSelect = document.querySelector("#selectLeft");
var rightEmojiSelect = document.querySelector("#selectRight");
var currentGame;

//---------------------EVENT LISTENERS---------------------------------------//
window.addEventListener("load", createBoard);
gameBoardSection.addEventListener("click", function(e) {
  if (e.target.classList.contains("open-position") && !e.target.innerText) {
      takeTurn(e);
  }
});

player1WinSubtractButton.addEventListener("click", function() {
  updateWins(-1, 0);
});

player2WinSubtractButton.addEventListener("click", function() {
  updateWins(-1, 1);
});

player1WinAddButton.addEventListener("click", function() {
  updateWins(1, 0);
});

player2WinAddButton.addEventListener("click", function() {
  updateWins(1, 1);
});

resetWinsButton.addEventListener("click", function() {
  updateWins(0, "both");
});

leftEmojiSelect.addEventListener("change", function(e) {
  updatePlayer1(e);
});

rightEmojiSelect.addEventListener("change", function(e) {
  updatePlayer2(e);
});

//---------------------FUNCTIONS---------------------------------------------//
function createBoard() {
  currentGame = new Game();
  var player1DefaultToken = `🧗`;
  var player2DefaultToken = `🤺`;
  currentGame.setUp(player1DefaultToken, player2DefaultToken);
  renderPage();
  updatePageText();
}

function renderPage() {
  var token1 = currentGame.players[0].token;
  var token2 = currentGame.players[1].token;

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

  leftAsideToken.innerText = `${token1}`;
  rightAsideToken.innerText = `${token2}`;
  addTokens();
}

function updatePlayer1(e) {
  var emoji = e.target.value;
  currentGame.players[0].token = emoji;
  renderPage();
  updatePageText();
}

function updatePlayer2(e) {
  var emoji = e.target.value;
  currentGame.players[1].token = emoji;
  renderPage();
  updatePageText();
}

function updatePageText(outcome) {
  var token = currentGame.players[currentGame.currentTurnIndexPosition].token;
  leftAsideText.innerHTML = `${currentGame.players[0].wins} wins`;
  rightAsideText.innerHTML = `${currentGame.players[1].wins} wins`;
  if (!outcome) {
    trackerDisplay.innerText = `It's ${token}'s turn`;
    //I think I need true down here...//better way to write this.
  } else if (outcome === "win") {
  // } else if (outcome === true) {
    trackerDisplay.innerText= `${token}  won!`;
  } else if (outcome === "draw") {
    trackerDisplay.innerText = `It's a draw!`;
  }
}

function takeTurn(e) {
  var positionSelected = e.target.id;
  var currentPlayerPositions = currentGame.players[currentGame.currentTurnIndexPosition].takenPositions;
  currentPlayerPositions.push(positionSelected);
  renderPage();
  currentGame.addTurn();
//   if (currentPlayerPositions.length >= 3) {
//   var outcome = currentGame.checkOutcome();
//   showResult(outcome)
// } else {switchTurns(false);}
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
    updatePageText(outcome)
    currentGame.reset();
    preventClick();
    setTimeout(function() {
      switchTurns(outcome)
    }, 2000);
}

function preventClick() {
  gameBoardSection.style.pointerEvents = "none";
}

function enableClick() {
  gameBoardSection.style.pointerEvents = "auto";
}

function addTokens() {
  var token1 = currentGame.players[0].token;
  var token2 = currentGame.players[1].token;
  var boardSpots = document.querySelectorAll('td');
  for (var i = 0; i < boardSpots.length; i ++) {
    if (currentGame.players[0].takenPositions.includes(boardSpots[i].id)) {
      boardSpots[i].innerText = `${token1}`;
    } else if (currentGame.players[1].takenPositions.includes(boardSpots[i].id)) {
      boardSpots[i].innerText = `${token2}`;
    }
  }
}

function updateWins(amt, playerIndex) {
  currentGame.changeWins(amt, playerIndex);
  renderPage();
  updatePageText();
}
