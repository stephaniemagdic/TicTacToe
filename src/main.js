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
  currentGame.setUpGame();
  createHTML();
  updatePageText();
}

function createHTML() {
  gameBoardSection.innerHTML = "";
  gameBoardSection.innerHTML += `
  <table>
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
  `
}

function updatePageText() {
  rightAsideText.innerHTML = `${currentGame.players[0].wins} wins`;
  leftAsideText.innerHTML = `${currentGame.players[1].wins} wins`;

  var img;
  var alt;

  if (currentGame.players[currentTurnIndexPosition].token === "star") {
    img = ;
    alt = ;
  } else if (currentGame.players[currentTurnIndexPosition].token === "heart") {
    img = ;
    alt = ;
  }

  h1.innerHTML = `It's <img url=${img} alt=${alt}>'s turn`;


}
