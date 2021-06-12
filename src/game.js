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
  var playersPositions = this.players[currentTurnIndexPosition].takenPositions;
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
      if (this.players[this.currentTurnIndexPosition].takenPositions < 5) {
        return false;
      }
      if (this.players[this.currentTurnIndexPosition].takenPositions > 5) {
        for (var possibleWin in winningBoardSets) {
          var isMatch = this.findMatch(winningBoardSets[possibleWin]);
          if(isMatch) {
            return true
          } else if (isMatch && this.totalTurnsTaken + 1 === 9) {
            return "draw";
          } else if (!isMatch) {
            return false;
          }
        }
    }
  }

  updateTurn() {
    console.log("I am here")
    if (this.currentTurnIndexPosition === 0) {
      console.log("I am here at index pos of 0")
      this.currentTurnIndexPosition = 1;
    } else if (this.currentTurnIndexPosition === 1) {
      (console.log("I am here at index of 1"))
      this.currentTurnIndexPosition = 0;
    }
    this.totalTurnsTaken += 1;
  }

  //make sure you call checkOutcome before updateTurn.

}
