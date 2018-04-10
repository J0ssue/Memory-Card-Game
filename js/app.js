/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 */

let cardList = [];//added elements clicked.
let matchedCardsCounter = 0;//counts pairs.

//Variables used for moves counter functionality.
let movesNum = 0;
const moves = document.querySelector(".moves");

//var used for star rating function.
const stars = document.querySelectorAll(".fa.fa-star");
//Cards reference
let cards = document.querySelectorAll(".card");

//var used for restart function 
const restart = document.querySelector(".restart");

restart.addEventListener("click", function() {
	restartGame();
});


//Game Logic
//Listens for clicks on cards
function clickedCard() {
	for (let i = 0; i < cards.length; i++) {
		cards[i].addEventListener("click", function(e){
			cards[i].className = "card open show";
			cardList.push(e.target);
			matchCards();
		});
	}
}
clickedCard();

//flips cards back if no-match found
function matchCards() {
	if (cardList.length === 2 && cardList[0].childNodes[1].className !== cardList[1].childNodes[1].className) {
		setTimeout(function() {
			cardList[0].classList.remove("open");
			cardList[0].classList.remove("show");
			cardList[1].classList.remove("open");
			cardList[1].classList.remove("show");
			cardList = [];
		}, 350);
		movesCounter();//counts moves when no-match
	} else if (cardList.length === 2 && cardList[0].childNodes[1].className === cardList[1].childNodes[1].className) {
		matchedCardsCounter += 1;
		allCardsMatch();
		cardList = [];
		movesCounter();//counts moves when match
	}
}

//Counts number of moves function.
function movesCounter() {
		movesNum += 1;
		moves.innerHTML = movesNum;
		starRating();
}

//Star Rating function.
function starRating() {
	if (movesNum > 8) {
		stars[0].classList.remove("fa-star");
	}
	if (movesNum > 16) {
		stars[1].classList.remove("fa-star");
	}
	if (movesNum > 20) {
		stars[2].classList.remove("fa-star");
	}
}

//finish game 
function allCardsMatch() {
	if (matchedCardsCounter === 8) {
		//div container reference
		const container = document.querySelector(".gameEnd");

		//create game end elements
		let gameEnd = document.createElement("div");
		let gameEndAnouncement = document.createElement("h5");
		let button = document.createElement("button");
		let numberOfMoves = document.createElement("p");

		//style
		gameEnd.id = "game-end";
		gameEndAnouncement.textContent = "You Won!";
		gameEndAnouncement.style.fontSize = "30px";
		numberOfMoves.textContent = `You made ${movesNum} moves`;
		button.style.padding = "10px";
		button.style.borderRadius = "5px";
		button.style.border = "none";
		button.style.color = "#333";
		button.style.backgroundColor = "aqua";
		button.textContent = "Play Again";

		//append elements to div
		gameEnd.appendChild(gameEndAnouncement);
		gameEnd.appendChild(numberOfMoves);
		gameEnd.appendChild(button);
		container.appendChild(gameEnd);

		button.addEventListener("click", function() {
			restartGame();
		})
	}	
}

//Restart button functionality
function restartGame() {
	location.reload();
}
 /*
 *  - display the card's symbol (put this functionality in another function that you call from this one)

 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
