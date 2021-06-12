winningBoardSets = {
  win1: ["TL", "TC", "TR"],
  win2: ["ML", "MC", "MR"],
  win3: ["BL", "BC", "BR"],
  win4: ["TL", "ML", "BL"],
  win5: ["TC", "MC", "BC"],
  win6: ["TR", "MR", "BR"],
  win7: ["TL", "MC", "BR"],
  win8: ["TR", "MC", "BL"]
}

function findMatch(currentWinList) {
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
