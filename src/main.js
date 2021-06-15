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

resetWinsButton.addEventListener("click", clearWins);

leftEmojiSelect.addEventListener("change", function(e) {
  updatePlayer1Token(e);
});

rightEmojiSelect.addEventListener("change", function(e) {
  updatePlayer2Token(e);
});

//---------------------FUNCTIONS---------------------------------------------//
function createBoard() {
  currentGame = new Game();
  // var player1DefaultToken = leftEmojiSelect.selectedOptions[0].value;
  var player1DefaultToken = `🧗`;
  var player2DefaultToken = `🤺`;
  // var player2DefaultToken = leftEmojiSelect.selectedOptions[1].value;
  currentGame.setUp(player1DefaultToken, player2DefaultToken);
  checkLocalStorage();
  renderPage();
  updatePageText();
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
        <td id="TL" class="open-position corner-left-style">
        </td>
        <td id="TC" class="open-position top-style">
        </td>
        <td id="TR" class="open-position corner-right-style">
        </td>
      </tr>
      <tr class="row-two">
        <td id="ML" class="open-position left-style left-side-spot">
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
  addTokens(token1, token2);
}

function updatePlayer1Token(e) {
  var emoji = e.target.value;
  currentGame.players[0].token = emoji;
  renderPage();
  updatePageText();
}

function updatePlayer2Token(e) {
  var emoji = e.target.value;
  currentGame.players[1].token = emoji;
  renderPage();
  updatePageText();
}

function updatePageText(outcome) {
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

function takeTurn(e) {
  var positionSelected = e.target.id;
  currentGame.addPlayerPosition(positionSelected);
  renderPage();
  currentGame.addTurn();
//check if three turns taken?
  var outcome = currentGame.checkOutcome();
  if (outcome === "win") {
    addWin();
  }
  if (!outcome) {
    switchTurns(outcome);
  } else {
    showResult(outcome);
  }
}

function addWin() {
  var player = currentGame.players[currentGame.currentPlayersTurnIndex];
  player.adjustWins(1);
  player.saveWinsToStorage();
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
    updatePageText(outcome);
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

function addTokens(player1Token, player2Token) {
  var boardPositions = document.querySelectorAll('td');
  for (var i = 0; i < boardPositions.length; i ++) {
    if (currentGame.player1Positions.includes(boardPositions[i].id)) {
      boardPositions[i].innerHTML = `<p role="img" aria-label="player1-token">${player1Token}</p>`;
      // boardPositions[i].innerText = `${player1Token}`;
    } else if (currentGame.player2Positions.includes(boardPositions[i].id)) {
      boardPositions[i].innerHTML = `<p role="img" aria-label="player2-token">${player2Token}</p>`;
      // boardPositions[i].innerText = `${player2Token}`;
    }
  }
}

function updateWins(amt, playerIndex) {
  currentGame.players[playerIndex].adjustWins(amt);
  currentGame.players[playerIndex].saveWinsToStorage();
  renderPage();
  updatePageText();
}

function clearWins() {
  for (var i = 0; i < currentGame.players.length; i++) {
    currentGame.players[i].resetWins();
    currentGame.players[i].saveWinsToStorage();
  }
  renderPage();
  updatePageText();
}
