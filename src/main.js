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

//---------------------FUNCTIONS---------------------------------------------//
function createBoard() {
  currentGame = new Game();
  currentGame.setUp();
  createHTML();
  updatePageText();
  //update players wins if on load there were wins in storage.
  //do this here or in setUp method?
  if (localStorage.length) {
    retrieveWins();
  }
}

//check that this works.
function retrieveWins() {
  for (var i = 0; i < currentGame.players.length; i++) {
    currentGame.players[i].retrieveWinsFromStorage();
  }
}

function createHTML() {
  gameBoardSection.innerHTML = "";
  gameBoardSection.innerHTML += `
  <table class="table">
    <tbody>
      <tr class="row-one">
        <td id="TL" class="open-position">
        </td>
        <td id="TC" class="open-position">
        </td>
        <td id="TR" class="open-position">
        </td>
      </tr>
      <tr class="row-two">
        <td id="ML" class="open-position">
        </td>
        <td id="MC" class="open-position">
        </td>
        <td id="MR" class="open-position">
        </td>
      </tr>
      <tr class="row-three">
        <td id="BL" class="open-position">
        </td>
        <td id="BC" class="open-position">
        </td>
        <td id="BR" class="open-position">
        </td>
      </tr>
    </tbody>
  </table>
  `;

  leftAsideToken.innerText = `⭐`;
  rightAsideToken.innerText = `❤️`;
}

function updatePageText() {
  rightAsideText.innerHTML = `${currentGame.players[0].wins} wins`;
  leftAsideText.innerHTML = `${currentGame.players[1].wins} wins`;
  if (currentGame.players[currentGame.currentTurnIndexPosition].token === "star") {
    h1.innerText= `It's ⭐'s turn`;
  } else if (currentGame.players[currentGame.currentTurnIndexPosition].token === "heart") {
    h1.innerText = `It's ❤️'s turn`
  }
}
