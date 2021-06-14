class Game {
  constructor() {
    this.players = [];
    this.currentTurnIndexPosition = 0;
    this.totalTurnsTaken = 0;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  setUp(player1Token, player2Token) {
    this.players = [];
    var player1 = new Player(1, player1Token, 0);
    var player2 = new Player(2, player2Token, 0);
    this.addPlayer(player1);
    this.addPlayer(player2);
    this.currentTurnIndexPosition = 0;
    if (localStorage.length) {
      for (var i = 0; i < this.players.length; i++){
        this.players[i].retrieveWinsFromStorage();
      }
    }
  }

  addPlayerPosition(position){
    this.players[this.currentTurnIndexPosition].takenPositions.push(position);
  }

  reset() {
    for (var i = 0; i < this.players.length; i ++) {
      this.players[i].takenPositions = [];
    }
    this.totalTurnsTaken = 0;
  }

//is this method necessary?
  addTurn() {
    this.totalTurnsTaken += 1;
  }

  checkMatch(indexValue, winScenario) {
    var match = false;
    for (var j = 0; j < winScenario.length; j++) {
      if (indexValue === `${winScenario[j]}`) {
      match = true;
      }
    } return match;
  }

  //should this go somewhere else?
  findMatch(currentWinList) {
    var count = 0;
    var scenarioMatch = false;
    var playersPositions = this.players[this.currentTurnIndexPosition].takenPositions;
    for (var i = 0; i < playersPositions.length; i ++) {
      var position = playersPositions[i];
      var match = this.checkMatch(position, currentWinList);
      if (match === true) {
            count += 1;
       }
    }
    if (count === 3) {
      scenarioMatch = true;
    }
    return scenarioMatch;
   }

  //any simpler way to do this?
  checkOutcome() {
    //put this before you check outcome in the DOM
    this.addTurn();
    var currentPlayer = this.players[this.currentTurnIndexPosition];
    //move this to dom function.
    if (currentPlayer.takenPositions.length < 3) {
      return false;
    }
    if (currentPlayer.takenPositions.length > 2) {
      for (var win in winningBoardSets) {
        var isMatch;
        var listToCheck = winningBoardSets[win];
        isMatch = this.findMatch(listToCheck);
        if (isMatch) {
            currentPlayer.wins += 1;
            currentPlayer.saveWinsToStorage();
            return true;
        }
      }
        if (this.totalTurnsTaken === 9) {
          return "draw";
        }
    return false;
      }
    }

  updateTurn() {
    if (this.currentTurnIndexPosition === 0) {
      this.currentTurnIndexPosition = 1;
    } else if (this.currentTurnIndexPosition === 1) {
      this.currentTurnIndexPosition = 0;
    }
  }

  changeWins(amt, playerIndex) {
    if (playerIndex === 0 || playerIndex === 1) {
      var playerToUpdate = this.players[playerIndex];
      if (playerToUpdate.wins > 0 || amt > 0) {
        playerToUpdate.wins += amt;
        playerToUpdate.saveWinsToStorage();
      }
    } else if (playerIndex === "both") {
      for (var i = 0; i < this.players.length; i++) {
        console.log("this.players", this.players[i]);
        this.players[i].wins = 0;
        this.players[i].saveWinsToStorage();
      }
    }
  }

}
