//---------------------GLOBAL VARIABLES--------------------------------------//
var leftAsideText = document.getElementById("player1Wins");
var rightAsideText = document.getElementById("player2Wins");
var leftAsideToken = document.getElementById("player1Token");
var rightAsideToken = document.getElementById("player2Token");
var trackerDisplay = document.getElementById("turnTrackerWinnerDisplay");
var gameBoardSection = document.getElementById("gameBoardSection");
var resetWinsButton = document.getElementById("reset");
var player1WinSubtractButton = document.getElementById("subtractWinPlayer1");
var player2WinSubtractButton = document.getElementById("subtractWinPlayer2");
var player1WinAddButton = document.getElementById("addWinPlayer1");
var player2WinAddButton = document.getElementById("addWinPlayer2");
var leftEmojiSelect = document.getElementById("selectLeft");
var rightEmojiSelect = document.getElementById("selectRight");
var currentGame;

//---------------------EVENT LISTENERS---------------------------------------//
window.addEventListener("load", createGame);
gameBoardSection.addEventListener("click", function(e) {
  if (e.target.classList.contains("open-position") && !e.target.innerText) {
    handleTurn(e);
  }
});

player1WinSubtractButton.addEventListener("click", function() {
  updateWins(-1, 0);
  renderText();
});

player2WinSubtractButton.addEventListener("click", function() {
  updateWins(-1, 1);
  renderText();
});

player1WinAddButton.addEventListener("click", function() {
  updateWins(1, 0);
  renderText();
});

player2WinAddButton.addEventListener("click", function() {
  updateWins(1, 1);
  renderText();
});

resetWinsButton.addEventListener("click", function() {
  updateWins(0, "both");
  renderText();
});

leftEmojiSelect.addEventListener("change", function(e) {
  updatePlayerToken(e, "player1");
});

rightEmojiSelect.addEventListener("change", function(e) {
  updatePlayerToken(e, "player2");
});

//---------------------FUNCTIONS---------------------------------------------//
function createGame() {
  currentGame = new Game();
  currentGame.setUp();
  getWinsFromStorage();
  updatePage();
}

function getWinsFromStorage(){
  if (localStorage.length) {
    for (var i = 0; i < currentGame.players.length; i++){
      currentGame.players[i].retrieveWinsFromStorage();
    }
  }
}

function renderPage() {
  var token1 = currentGame.players[0].token;
  var token2 = currentGame.players[1].token;
  gameBoardSection.innerHTML = "";
  gameBoardSection.innerHTML += `
  <table class="table">
    <tbody>
      <tr class="row-one">
        <td class="open-position corner-left-style" id="TL">
        </td>
        <td class="open-position top-style" id="TC">
        </td>
        <td class="open-position corner-right-style" id="TR">
        </td>
      </tr>
      <tr class="row-two">
        <td class="open-position left-style left-side-spot" id="ML">
        </td>
        <td class="open-position middle-style" id="MC">
        </td>
        <td class="open-position right-style" id="MR">
        </td>
      </tr>
      <tr class="row-three">
        <td class="open-position corner-bottom-left-style" id="BL">
        </td>
        <td class="open-position bottom-style" id="BC">
        </td>
        <td class="open-position corner-bottom-right-style" id="BR">
        </td>
      </tr>
    </tbody>
  </table>
  `;

  leftAsideToken.innerHTML = `
    <p role="img" aria-label="player1-token">${token1}</p>
  `;
  rightAsideToken.innerHTML = `
    <p role="img" aria-label="player1-token">${token2}</p>
  `;

  addTokens(token1, token2);
}

function renderText(outcome) {
  var token = currentGame.players[currentGame.currentPlayersTurnIndex].token;
  leftAsideText.innerHTML = `${currentGame.players[0].wins} wins`;
  rightAsideText.innerHTML = `${currentGame.players[1].wins} wins`;
  if (!outcome) {
    trackerDisplay.innerHTML = `
      <p>It's <span role="img" aria-label="current player token">${token}</span>'s turn</p>
    `;
  } else if (outcome === "win") {
    trackerDisplay.innerHTML = `
      <p><span role="img" aria-label="current player token">${token}</span> won!</p>
    `;
  } else if (outcome === "draw") {
    trackerDisplay.innerHTML = `<p>It's a draw!</p>`;
  }
}

function updatePage() {
  renderPage();
  renderText();
}

function handleTurn(e) {
  var positionSelected = e.target.id;
  currentGame.addPlayerPosition(positionSelected);
  renderPage();
  currentGame.addTurn();
  var outcome = currentGame.checkForWinOrDraw();
  if (outcome === "win") {
    var playerIndex = currentGame.currentPlayersTurnIndex;
    updateWins(1, playerIndex);
  }
  if (!outcome) {
    switchTurns(outcome);
  } else {
    executeOutcomeConditions(outcome);
  }
}

function switchTurns(outcome) {
  currentGame.toggleTurn();
  updatePage()
  if (outcome) {
    enableClick();
  }
}

function executeOutcomeConditions(outcome) {
    renderText(outcome);
    currentGame.reset();
    disableClick();
    setTimeout(function() {
      switchTurns(outcome)
    }, 2000);
}

function disableClick() {
  gameBoardSection.style.pointerEvents = "none";
}

function enableClick() {
  gameBoardSection.style.pointerEvents = "auto";
}

function addTokens(player1Token, player2Token) {
  var boardPositions = document.querySelectorAll('td');
  for (var i = 0; i < boardPositions.length; i ++) {
    if (currentGame.player1Positions.includes(boardPositions[i].id)) {
      boardPositions[i].innerHTML = `
        <p role="img" aria-label="player1-token">${player1Token}</p>
      `;
    } else if (currentGame.player2Positions.includes(boardPositions[i].id)) {
      boardPositions[i].innerHTML = `
        <p role="img" aria-label="player2-token">${player2Token}</p>
      `;
    }
  }
}

function updateWins(amt, playerIndex) {
  if (amt === -1 || amt === 1) {
  currentGame.players[playerIndex].adjustWins(amt);
  currentGame.players[playerIndex].saveWinsToStorage();
  } else if (amt === 0) {
    for (var i = 0; i < currentGame.players.length; i ++) {
      currentGame.players[i].adjustWins(amt);
      currentGame.players[i].saveWinsToStorage();
    }
  }
}

function updatePlayerToken(e, player) {
  var chosenToken = e.target.value;
  if (player === "player1") {
    currentGame.players[0].changeToken(chosenToken);
  }
  else if (player === "player2") {
    currentGame.players[1].changeToken(chosenToken);
  }
  updatePage();
}
