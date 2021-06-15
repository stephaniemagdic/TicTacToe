class Player {
  constructor(id, token, wins) {
    this.id = id;
    this.token = token;
    this.wins = wins;
    // this.takenPositions = [];
  }

  saveWinsToStorage() {
    var playerWins = JSON.stringify(this.wins);
    localStorage.setItem(`${this.id}`, playerWins);
  }

  retrieveWinsFromStorage() {
    var parsedWins = JSON.parse(localStorage.getItem(`${this.id}`));
    if(!parsedWins) {
      this.wins = 0;
    } else {
      this.wins = parsedWins;
    }
  }
}
