/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as she whishes. Each result get added to her ROUND score
- BUT, if the player rolls a 1, all her ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that her ROUND score gets added to her GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

UPDATED RULES:
- A player loses entire score when two 6's are rolled in a row.
- Add an input field to allow players to select their own winning score.
*/

/*
NOTE:

- state variable: simply tells us the condition of a system
- example: is the game over?

*/

/////////////////////////////////////////////
// declare game variables
///////////////////////////////////////

var scores, roundScore, activePlayer, activeGame, previousRoll;

/////////////////////////////////////////////
// call the initiate game function!
///////////////////////////////////////

initGame();

/////////////////////////////////////////////
// events!
///////////////////////////////////////

// click event for rolling dice!
document.querySelector('.btn-roll').addEventListener('click', function(){
	// only allow action if the game is active (aka there is no winner yet)
	if (activeGame) {
		// random number between 1 and 6 (var dice only accessible by this function)
		var dice = Math.floor(Math.random() * 6) + 1;

		// display roll by setting the relevant dice image
		var diceDOM = document.querySelector('.dice')
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';

		// handle scoring and turn play:
		if (dice === 1 || (dice === 6 && previousRoll === 6)) {
			// switch to other player
			switchPlayers(); 
		} else {
			// add dice value to round score:
			roundScore += dice;
			previousRoll = dice;
			document.getElementById('current-' + activePlayer).textContent = roundScore;
		};
	}
});


// click event for holding the dice
document.querySelector('.btn-hold').addEventListener('click', function(){
	// only allow action if the game is active (aka there is no winner yet)
	if (activeGame) {
		// add the current score to the current active player's total score
		scores[activePlayer] += roundScore;
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

		// check for win before before switching players if there is no win
		if (scores[activePlayer] >= 100) {
			document.getElementById('name-' + activePlayer).textContent = 'Winner!';
			// activate winner class to style the 'Winner!' text
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			// remove red dot that signals current active player
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			hideDice();
			activeGame = false;
		} else {
			// switch to other player
			switchPlayers();
		};
	};
});

document.querySelector('.btn-new').addEventListener('click', initGame);

/////////////////////////////////////////////
// game functions (for DRY code)
///////////////////////////////////////


function initGame() {
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	activeGame = true;

	// hide the dice visual
	hideDice();

	// set all values to 0
	clearTotalScores();
	clearCurrentScores();

	// resets player names
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	// removes winner class
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');

	// removes active class
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');

	// sets player 1 as active
	document.querySelector('.player-0-panel').classList.add('active');
}


function hideDice() {
	// would be better to create a css class that does this, then toggle that class
	// not good practice to mess with styles like this in the js file
	document.querySelector('.dice').style.display = 'none';
};


function clearCurrentScores() {
		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';
};


function clearTotalScores() {
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
};


function switchPlayers() {
	// switch to other player
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	previousRoll = 0;

	// set the current score to 0
	clearCurrentScores();

	// switch active player visuals
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	// hide dice when turn changes
	hideDice();
};




/////////////////////////////
// notes!!
////////////////

// //  DOM manipulation!!

// document.querySelector('#current-' + activePlayer).textContent = dice;
// // document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em';

// var x = document.querySelector('#score-0').textContent;
// console.log(x);



// callback function
/*
function btn() {
	//does a thing
}

btn();

document.querySelector('.btn-roll').addEventListener('click', btn)
*/


// anonymous function - pass a function without a name as an argument for another function:
/*
document.querySelector('.btn-roll').addEventListener('click', function(){
	// do a bunch of things!
});
*/