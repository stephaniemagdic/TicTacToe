class Player {
  constructor(id, token, wins) {
    this.id = id;
    this.token = token;
    this.wins = wins;
  }

  saveWinsToStorage() {
    var playerWins = JSON.stringify(this.wins);
    localStorage.setItem(`${this.id}`, playerWins);
  }

  retrieveWinsFromStorage() {
    var parsedWins = JSON.parse(localStorage.getItem(`${this.id}`));
    if (!parsedWins) {
      this.wins = 0;
    } else {
      this.wins = parsedWins;
    }
  }

  adjustWins(amt) {
    if (this.wins > 0 || amt > 0) {
      this.wins += amt;
    } else if (amt = 0) {
      this.wins = 0;
    }
  }

  changeToken(token) {
    this.token = token;
  }

}
