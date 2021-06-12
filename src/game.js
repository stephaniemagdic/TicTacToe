class Game {
  constructor() {
    this.players = [];
    this.currentTurnIndexPosition = 0;
    this.totalTurnsTaken = 0;
  }

  //is this function below necessary? //not for local storage purpose
  //but for SRP purpose
  addPlayer(player) {
    this.players.push(player);
  }

  setUp() {
    var player1 = new Player(1, "star", 0);
		var player2 = new Player(2, "heart", 0);
    this.addPlayer(player1);
    this.addPlayer(player2);
    this.currentTurnIndexPosition = 0;

    //check that this works.
    if (localStorage.length) {
      //local storage holds wins in it's id, 1 or 2.
      for (var i = 0; i < this.players.length; i++){
        this.players[i].retrieveWinsFromStorage();
      }
    }


    //should I update totalTurns here to 0 as well?
      //if (localStorage), call retrieveWins on currentPlayers array---add to this method or Main.js?
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

  //break possibly into two functions (one function with helper function)
  checkOutcome() {
    //if currentplayers positions less than 3 in length
    if (this.totalTurnsTaken < 5) {
      return false;
    }
    if (this.totalTurnsTaken > 5) {
      for (var possibleWin in winningBoardSets) {
        var isMatch = this.findMatch(winningBoardSets[possibleWin]);
        if(isMatch) {
            this.players[this.currentTurnIndexPosition].wins += 1;
            //check that this works.
            this.players[this.currentTurnIndexPosition].saveWinsToStorage();
            return true;
        }
      }
    } else if (this.totalTurnsTaken + 1 === 9) {
      return "draw";
    }
    return false;
  }

  updateTurn() {
    if (this.currentTurnIndexPosition === 0) {
      this.currentTurnIndexPosition = 1;
    } else if (this.currentTurnIndexPosition === 1) {
      this.currentTurnIndexPosition = 0;
    }
    this.totalTurnsTaken += 1;
  }
}

  //make sure you call checkOutcome before updateTurn.

  //call updateTurn within checkOutcome function?
