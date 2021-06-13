//---------------------GLOBAL VARIABLES--------------------------------------//
var leftAsideText = document.querySelector(".player1-wins");
var rightAsideText = document.querySelector(".player2-wins");
var leftAsideToken = document.querySelector(".player-1-token");
var rightAsideToken = document.querySelector(".player-2-token");
var h1 = document.querySelector(".turn-tracker-winner-display");
var gameBoardSection = document.querySelector(".game-board")

var currentGame;

//---------------------EVENT LISTENERS---------------------------------------//
window.addEventListener("load", createBoard);
gameBoardSection.addEventListener("click", function(e) {
  if (e.target.classList.contains("open-position") && !e.target.innerText) {
      takeTurn(e);
  }
});

//---------------------FUNCTIONS---------------------------------------------//
function createBoard() {
  currentGame = new Game();
  currentGame.setUp();
  createHTML();
  updatePageText();
}

function createHTML() {
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

function updatePageText() {
  leftAsideText.innerHTML = `${currentGame.players[0].wins} wins`;
  rightAsideText.innerHTML = `${currentGame.players[1].wins} wins`;
  if (currentGame.players[currentGame.currentTurnIndexPosition].token === "star") {
    h1.innerText= `It's ⭐'s turn`;
  } else if (currentGame.players[currentGame.currentTurnIndexPosition].token === "heart") {
    h1.innerText = `It's ❤️'s turn`
  }
}

function takeTurn(e) {
  currentGame.players[currentGame.currentTurnIndexPosition].takenPositions.push(e.target.id);
  createHTML();
  var outcome = currentGame.checkOutcome();
  pause(outcome);
}

function pause(outcome) {
  console.log(outcome);
  if (outcome === true)  {
    if (currentGame.players[currentGame.currentTurnIndexPosition].token === "star") {
      h1.innerText= `⭐  won!`;
    } else if (currentGame.players[currentGame.currentTurnIndexPosition].token === "heart") {
      h1.innerText = `❤️ won!`
    };
    currentGame.reset();
    gameBoardSection.style.pointerEvents = "none";
    setTimeout(updateAfterWin, 3000);

  } else if (outcome === false) {
    currentGame.updateTurn();
    updatePageText();
    createHTML();

  } else if (outcome === "draw") {
    h1.innerText = `It's a draw!`
    currentGame.reset();
    gameBoardSection.style.pointerEvents = "none";
    setTimeout(updateAfterWin, 3000);
  }
}

function updateAfterWin() {
  currentGame.updateTurn();
  updatePageText();
  createHTML();
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
