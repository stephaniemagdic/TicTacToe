//get rid of me and find why not communicating from data.js
var winningBoardSets = {
  win1: ["TL", "TC", "TR"],
  win2: ["ML", "MC", "MR"],
  win3: ["BL", "BC", "BR"],
  win4: ["TL", "ML", "BL"],
  win5: ["TC", "MC", "BC"],
  win6: ["TR", "MR", "BR"],
  win7: ["TL", "MC", "BR"],
  win8: ["TR", "MC", "BL"]
}
/// get rid of above. See note.

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

    this.totalTurnsTaken += 1;

    if (this.players[this.currentTurnIndexPosition].takenPositions.length < 3) {
      return false;
    }
    if (this.players[this.currentTurnIndexPosition].takenPositions.length > 2) {
      for (let win in winningBoardSets) {
        let isMatch;
        isMatch = this.findMatch(winningBoardSets[win]);
        if(isMatch) {
            this.players[this.currentTurnIndexPosition].wins += 1;
            //check that this works.
            this.players[this.currentTurnIndexPosition].saveWinsToStorage();
            return true;
        }
      }
    } else if (this.totalTurnsTaken === 9) {
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
    // this.totalTurnsTaken += 1;
  }
}

  //make sure you call checkOutcome before updateTurn.

  //call updateTurn within checkOutcome function?
