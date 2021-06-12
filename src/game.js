class Game {
  constructor() {
    this.players = [];
    this.currentTurnIndexPosition: 0;
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
      //if (localStorage), call retrieveWins on currentPlayers array---add to this method or Main.js?
  }

  addPlayerPosition(position){
    this.players[currentTurnIndexPosition].takenPositions.push(position);
  }


  reset() {
    for (var i = 0; i < this.players.length; i ++) {
      this.players[i].takenPositions = [];
    }
    this.totalTurnsTaken = 0;
    //could add extra logic... if you are the winner, you start. ie update currentTurnIndexPosition
    //with winner.
  }

    //should this go somewhere else?
    findMatch (currentWinList) {
    var match = false;
    var count = 0;
    var playersPositions = thisTurnIndexPosition].takenPositions;
    for (var i = 0; i < playersPositions.length; i ++) {
      for (var j = 0; j < array.length; j ++) {
        if (`${playersPositions[i]}` === `${currentWinList[j]}`) {
          count += 1;
        }
          }
    }
      if (count === 3) {
        match = true;
        return match;
      }
    }


  checkOutcome() {
      if (players[currentTurnIndexPosition].takenPositions > 2 && players[currentTurnIndexPosition].takenPositions < 8) {
        for (var possibleWin in winningBoardSets){
          var isMatch = this.findMatch(winningBoardSets[possibleWin]);
          if(!isMatch) {return true};
        }
          return false;
        } else if (this.totalTurnsTaken + 1 === 9) {
          return "draw";
        } else {
          return false;
        }

  }

  updateTurn() {
    if (this.currentTurnIndexPosition === 0) {
      this.currentTurn === 1;
    } else if (this.currentTurnIndexPosition === 1) {
      this.currentTurn === 0;
    }

    this.totalTurnsTaken += 1;
  }

  //make sure you call checkOutcome before updateTurn.

}
