class Game {
  constructor() {
    this.players = [];
    this.currentTurnIndexPosition = 0;
    this.totalTurnsTaken = 0;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  setUp() {
    var player1 = new Player(1, "star", 0);
		var player2 = new Player(2, "heart", 0);
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
    //could add extra logic... if you are the winner, you start. ie update currentTurnIndexPosition with winner.
  }

//is this method necessary?
  addTurn() {
    this.totalTurnsTaken += 1;
  }

  //should this go somewhere else?
  findMatch (currentWinList) {
    var match = false;
    var count = 0;
    var playersPositions = this.players[this.currentTurnIndexPosition].takenPositions;
    for (var i = 0; i < playersPositions.length; i ++) {
      for (var j = 0; j < currentWinList.length; j ++) {
        if (`${playersPositions[i]}` === `${currentWinList[j]}`) {
          count += 1;
        }
      }
    }
    if (count === 3) {
      match = true;
      return match;
    } else {
      return match;
    }
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
        isMatch = this.findMatch(winningBoardSets[win]);
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

  resetWins() {
    for (var i = 0; i < this.players.length; i ++) {
      this.players[i].wins = 0;
      this.players[i].saveWinsToStorage();
    }
  }
}
