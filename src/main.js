//---------------------GLOBAL VARIABLES--------------------------------------//
var leftAsideText = document.querySelector("#player1Wins");
var rightAsideText = document.querySelector("#player2Wins");
var leftAsideToken = document.querySelector("#player1Token");
var rightAsideToken = document.querySelector("#player2Token");
var trackerDisplay = document.querySelector("#turnTrackerWinnerDisplay");
var gameBoardSection = document.querySelector("#gameBoardSection");
var resetWinsButton = document.querySelector("#reset");
var player1WinSubtractButton = document.querySelector("#subtractWinPlayer1");
var player2WinSubtractButton = document.querySelector("#subtractWinPlayer2");
var player1WinAddButton = document.querySelector("#addWinPlayer1");
var player2WinAddButton = document.querySelector("#addWinPlayer2");
var leftEmojiSelect = document.querySelector("#selectLeft");
var rightEmojiSelect = document.querySelector("#selectRight");
var currentGame;

//---------------------EVENT LISTENERS---------------------------------------//
window.addEventListener("load", createGame);
gameBoardSection.addEventListener("click", function(e) {
  if (e.target.classList.contains("open-position") && !e.target.innerText) {
    takeTurn(e);
  }
});

player1WinSubtractButton.addEventListener("click", function() {
  updateWins(-1, 0);
  updatePage();
});

player2WinSubtractButton.addEventListener("click", function() {
  updateWins(-1, 1);
  updatePage();
});

player1WinAddButton.addEventListener("click", function() {
  updateWins(1, 0);
  updatePage();
});

player2WinAddButton.addEventListener("click", function() {
  updateWins(1, 1);
  updatePage();
});

resetWinsButton.addEventListener("click", clearWins);

leftEmojiSelect.addEventListener("change", function(e) {
  updatePlayer1Token(e);
});

rightEmojiSelect.addEventListener("change", function(e) {
  updatePlayer2Token(e);
});

//---------------------FUNCTIONS---------------------------------------------//
function createGame() {
  currentGame = new Game();
  var player1DefaultToken = `🧗`;
  var player2DefaultToken = `🤺`;
  currentGame.setUp(player1DefaultToken, player2DefaultToken);
  checkLocalStorage();
  updatePage();
}

function checkLocalStorage(){
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

function takeTurn(e) {
  var positionSelected = e.target.id;
  currentGame.addPlayerPosition(positionSelected);
  renderPage();
  currentGame.addTurn();
  var outcome = currentGame.checkOutcome();
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
  currentGame.updateTurn();
  renderText();
  renderPage();
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
  currentGame.players[playerIndex].adjustWins(amt);
  currentGame.players[playerIndex].saveWinsToStorage();
}

function clearWins() {
  for (var i = 0; i < currentGame.players.length; i++) {
    currentGame.players[i].resetWins();
    currentGame.players[i].saveWinsToStorage();
  }
  updatePage();
}

function updatePlayer1Token(e) {
  var chosenToken = e.target.value;
  currentGame.players[0].changeToken(chosenToken);
  updatePage();
}

function updatePlayer2Token(e) {
  var chosenToken = e.target.value;
  currentGame.players[1].changeToken(chosenToken);
  updatePage();
}
