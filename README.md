
# [Virtual Tic-Tac-Toe Adventure](https://stephaniemagdic.github.io/TicTacToe/)

### [Week 6 Project Spec](https://frontend.turing.edu/projects/module-1/tic-tac-toe-solo.html)

#### Week 5 (Mod1) at Turing School of Software and Design


Virtual Tic-Tac-Toe brings the well-known pen-and-paper game to your device, so you can play tic-tac-toe with friends and family if there is no paper to reach for! 
 * Tokens can be dynamically added to the tic-tac-toe board and checked for a winning array match or a draw. 
 * User data is updated on the page when the data model is modifed after a win, a draw, a player takes a turn, or a button is clicked.
 * This application uses localStorage to persist player wins. 
 * It has many reusable functions that take arguments, making the JavsaScript dynamic and clean.
 * Event delegation handles events on a higher level in the DOM to listen for dynamic elements.
 * The game can be played entirely in the console without the user interface, distinguishing the data model from the DOM and using the data model as it's source of truth. The browser uses the instance of currentGame to hold all its data. The main.js file itterates through DOM elements, pulling from the data held in our data model to update what is displayed on the page.


### Built-By:

[Stephanie Magdic](https://github.com/stephaniemagdic)


### Project Manager

[Heather Faerber](https://github.com/hfaerber)



### Technologies Used 

* HTML5
* CSS
* JavaScript (ECMAScript 2009)


### Architecture

* src directory
  * data.js: 
    * holds all WinningBoardSets (arrays with list of ids that equate to a win)
  * game.js file: 
    * holds game data, including the current player instances and player positions on the board
    * holds methods to check win and draw conditions and to keep track of and update turns
  * player.js file: 
    * holds all information about the player, including the player's id, token, and wins
    * holds methods to change a player's token and to update, reset, and save wins to local storage
  * main.js file: 
    * handles all of the logic to use our classes/data model to manipulate the DOM
* index.html
* styles.css
* README.md


## Instructions for running and viewing

You can access the game by `cloning this repository` and opening the `index.html` file in your browser! You also have the option to play entirely in your console using only the methods on each class (`Player` and `Game`).

* **Choose a token:**  
  * Use the `drop down` to choose a token from a list of 7 possible player tokens. Depending on which side you choose, you will have different activity-themed tokens to choose from.
  * If you do not select a token, your will recieve a default player token (which will be the first option in the list).
  * If you choose, you may select a new token in the middle of the game, and your player tokens on the game board will reflect your new token choice. 

![Select a token gif](https://i.ibb.co/NSqRWLR/recording.gif)

* **Add a win:**  
  * Use the `Add a win buttons` to add a win to the player's total wins. 
  * You might have taken another player's turn or your opponent maybe refreshed the page in frustration. No Worries. Use this button to add a win to your total win count at any time.


* **Subtract a win:** 
  * Use the `Subtract a win buttons` to subtract a win from the player's total wins.
  * If there was an error made and someone placed a token out of turn on the last move - don't sweat! Use this button to subtract a win from your total wins at any time.


* **Reset all wins:**  
  * Use the `Reset Wins button` to reset both players wins and start fresh.
  * You might find yourself coming back to the game on your next roadtrip to find that the data from the previous session's games are stored. Simply use the reset wins button to clear all wins rather than finagling with the add and subtract win buttons. 
 
 
![Add a win gif](https://i.ibb.co/2grbSFb/add-subract-and-reset-wins.gif)
  

* **Place a token:**  
  * Pay attention to the `h1` page text that lists whose turn it is. 
  * When it is your turn, `click` an open tic-tac-toe spot to place your token. 
  * Be aware - you may not steal your opponent's spot. Once placed, their token is immovable. 
  * To continue the game, choose an available spot and see your token appear.

* **Win a game:**  
  * To win a game be the first player to place 3 tokens in a row either diagonally, vertically or horizontally!
  * When you win a game, your wins will be updated and you wil be notified of your win at the top of the page! 
  

* **Draw:**  
  * When all spaces are taken up with player tokens, it will be a draw - no winners!
  * Your gameboard will be reset and a new game will be ready to play for a win! 

![Win or Draw Gif](https://i.ibb.co/rvF4fCD/win-and-draw.gif)


### Project Challenges 
 * One challenge I faced was when I noticed Monday night that my Game class was technically using a method on its class to update a property in the Player class by using the instances it was holding in it's players array property. This violated the single responsibility principle. I am grateful I ran into this, as it helped me further grasp this concept of SRP. It reminded me that classes should only hold static information about the class or properties the class itself is updating. I also learned to keep this question in mind: `Does the class need to know about the information (in order to update use/manipulate it)?` If so, it might need to be a property on that class. Because of this I made sure methods were updating their class properties only and then updated my main.js file to call those methods accordingly.
 
### Project Wins
 * I planned out each piece of functionality this project needed and thought through all of the logic of this game before even touching any code. I spent about 3 days to really have a well-thought-out plan. This saved me from too much frustration or confusion and the process felt smoooth and enjoyable.
 * My Game and Player class are fully functional on their own. The Data model is held in the instance of the currentGame and is the only thing needed to run the app. The user interface uses the classes as its data model to update the DOM/what the user sees.
 * I refactored often and created short functions that each only handle one responsibility and can be reused.
 * I had a lot of fun with this project and learned a lot about the process of planning and excecuting an idea to create clean code, and I solidified concepts I learned in class and through mythical creatures repetitions about class to class interaction and SRP.

