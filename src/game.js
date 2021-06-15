class Game {
  constructor() {
    this.players = [];
    // this.currentTurnIndexPosition = 0;
    this.currentTurnIndexPosition = 0;
    this.totalTurnsTaken = 0;
    this.player1Positions = [];
    this.player2Positions = [];
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
    if (this.currentTurnIndexPosition === 0) {
      this.player1Positions.push(position);
    } else if (this.currentTurnIndexPosition === 1)
      this.player2Positions.push(position);
      // this.players[this.currentTurnIndexPosition].takenPositions.push(position);
    }

  reset() {
    this.player1Positions = [];
    this.player2Positions = [];
    // for (var i = 0; i < this.players.length; i ++) {
    //   this.players[i].takenPositions = [];
    // }
    this.totalTurnsTaken = 0;
  }

  addTurn() {
    this.totalTurnsTaken += 1;
  }

  findMatch(currentWinList) {
    var count = 0;
    var scenarioMatch = false;
    if (this.currentTurnIndexPosition === 0) {
      var playerPositions = this.player1Positions;
    } else if (this.currentTurnIndexPosition === 1) {
      var playerPositions = this.player2Positions;
    }

    // var playersPositions = this.players[this.currentTurnIndexPosition].takenPositions;
    for (var i = 0; i < playerPositions.length; i ++) {
      var position = playerPositions[i];
      var match = currentWinList.includes(position);
      if (match) {
            count += 1;
       }
    }
    if (count === 3) {
      scenarioMatch = true;
    }
    return scenarioMatch;
   }

  checkOutcome() {
    if (this.currentTurnIndexPosition === 0) {
      var playerPositions = this.player1Positions;
      var currentPlayer = this.players[0];
    } else if (this.currentTurnIndexPosition === 1) {
      var playerPositions = this.player2Positions;
      var currentPlayer = this.players[1];
    }
    // var currentPlayer = this.players[this.currentTurnIndexPosition];
    //move this to dom function.
    if (playerPositions.length < 3) {
      return false;
    }
    if (playerPositions.length > 2) {
      for (var win in winningBoardSets) {
        var listToCheck = winningBoardSets[win];
        var isMatch = this.findMatch(listToCheck);
        if (isMatch) {
            currentPlayer.wins += 1;
            currentPlayer.saveWinsToStorage();
            return "win";
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

  adjustWins(amt, playerIndex) {
    if (playerIndex === 0 || playerIndex === 1) {
      var player = this.players[playerIndex];
      if (player.wins > 0 || amt > 0) {
        player.wins += amt;
        player.saveWinsToStorage();
      }
    } else if (playerIndex === "both") {
      for (var i = 0; i < this.players.length; i++) {
        this.players[i].wins = 0;
        this.players[i].saveWinsToStorage();
      }
    }
  }

}
