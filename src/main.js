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

  console.log(e);
  console.log(event.target.innerHTML);
  console.log(e.target.id);

  currentGame.players[currentGame.currentTurnIndexPosition].takenPositions.push(e.target.id);
  console.log(currentGame.players[currentGame.currentTurnIndexPosition].takenPositions)

  currentGame.checkOutcome();
  updatePageText();


//Iterate through/filter DOM elements using for loops
//loop through array and populate the tictac toe board with tokens!
//loop through player 1's array and append if at each matching TD
  //grab each TD and append child.
//loop through player 2's array and append at each matching TD
  createHTML();

  //update the page Last.
  //first add to array.
}

function addTokens() {
  var boardSpots = document.querySelectorAll('td');
  for (var i = 0; i < boardSpots.length; i ++) {
    // console.log(boardSpots[i].id);
    if (currentGame.players[0].takenPositions.includes(boardSpots[i].id)) {
      boardSpots[i].innerText = `⭐`;
    } else if (currentGame.players[1].takenPositions.includes(boardSpots[i].id)) {
      boardSpots[i].innerText = `❤️`;
    } 
  }
}
