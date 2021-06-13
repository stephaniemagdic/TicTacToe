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
  currentGame.players[currentGame.currentTurnIndexPosition].takenPositions.push(e.target.id);
  var outcome = currentGame.checkOutcome();
  pause(outcome);
  //are these three in the right order.
  currentGame.updateTurn();
  updatePageText();
  createHTML();

}

//disable the click on timeout...
function pause(outcome) {
  if (outcome === true)  {
    if (currentGame.players[currentGame.currentTurnIndexPosition].token === "star") {
      h1.innerText= `⭐  won!`;
    } else if (currentGame.players[currentGame.currentTurnIndexPosition].token === "heart") {
      h1.innerText = `❤️ won!`
    };

    setTimeout (function() {
      currentGame.reset()
    }, 3000);

  } else if (outcome === false) {
    return;

  } else if (outcome === "draw") {
    h1.innerText = `It's a draw!`
    setTimeout (function() {
      currentGame.reset()
    }, 3000);
  }

  // updatePageText();
  // createHTML();
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
