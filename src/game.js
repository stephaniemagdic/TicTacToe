class Game {
  constructor() {
    this.players = [];
    this.currentPlayersTurnIndex = 0;
    this.totalTurnsTaken = 0;
    this.player1Positions = [];
    this.player2Positions = [];
  }

  addPlayer(player) {
    this.players.push(player);
  }

  setUp() {
    var player1DefaultToken = `🧗`;
    var player2DefaultToken = `🤺`;
    var player1 = new Player(1, player1DefaultToken , 0);
    var player2 = new Player(2, player2DefaultToken, 0);
    this.addPlayer(player1);
    this.addPlayer(player2);
    this.currentPlayersTurnIndex = 0;
  }

  addPlayerPosition(position){
    if (this.currentPlayersTurnIndex === 0) {
      this.player1Positions.push(position);
    } else if (this.currentPlayersTurnIndex === 1) {
      this.player2Positions.push(position);
    }
  }

  reset() {
    this.player1Positions = [];
    this.player2Positions = [];
    this.totalTurnsTaken = 0;
  }

  addTurn() {
    this.totalTurnsTaken += 1;
  }

  findBoardMatch(currentWinList, playerPositions) {
    var count = 0;
    var isMatch = false;
    for (var i = 0; i < playerPositions.length; i ++) {
      var position = playerPositions[i];
      var match = currentWinList.includes(position);
      if (match) {
        count += 1;
       }
    }
    if (count === 3) {
      isMatch = true;
    }
    return isMatch;
  }

  checkOutcome() {
    var player = this.players[this.currentPlayersTurnIndex];
    if (this.currentPlayersTurnIndex === 0) {
      var playerPositions = this.player1Positions;
    } else if (this.currentPlayersTurnIndex === 1) {
      var playerPositions = this.player2Positions;
    }
    if (playerPositions.length < 3) {
      return false;
    }
    if (playerPositions.length > 2) {
      for (var win in winningBoardSets) {
        var listToCheck = winningBoardSets[win];
        var isMatch = this.findBoardMatch(listToCheck, playerPositions);
        if (isMatch) {
          return "win";
        }
      }
      if (this.totalTurnsTaken === 9) {
        return "draw";
      }
    return false;
    }
  }

  //pass param... in main or in class?
  toggleTurn() {
    if (this.currentPlayersTurnIndex === 0) {
      this.currentPlayersTurnIndex = 1;
    } else if (this.currentPlayersTurnIndex === 1) {
      this.currentPlayersTurnIndex = 0;
    }
  }

}
