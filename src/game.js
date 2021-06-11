class Game {
  constructor() {
    this.currentPlayers = [];
    this.currentTurnPlayerIndex: 0;
    this.totalTurnsTaken = 0;
  }

  //is this function below necessary? //not for local storage purpose
  //but for SRP purpose
  addPlayer(player) {
    this.currentPlayers.push(player);
  }

  setUpGame() {
    var player1 = new Player(1, "star", 0);
		var player2 = new Player(2, "heart", 0);
    this.addPlayer(player1);
    this.addPlayer(player2);
    this.currentTurn = 0;
    //add to method or Main.js?
      //if (localStorage), call retrieveWins on currentPlayers array.
  }

  addPlayerPosition(position){
    this.currentPlayers[currentTurnPlayerIndex].takenPositions.push(position);
  }

  updateTurn() {

  }
}
