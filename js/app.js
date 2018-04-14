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
let starsNum = 0;

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
		movesNum++;
		moves.innerHTML = movesNum - 1;
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
const modal = document.getElementById("simpleModal");
const modalBtn = document.getElementById("modalBtn");
const closeBtn = document.getElementById("closeBtn");
const modalContent = document.querySelector(".modal-content");
const rating = document.getElementById("rating");
const numberOfMoves = document.getElementById("numberOfMoves");

function allCardsMatch() {
	if (matchedCardsCounter === 8) {
		for (let i = 0; i < stars.length; i++){
			if (stars[i].className === "fa fa-star") {
				starsNum++;
			}
		}
		modal.addEventListener("click", openModal());
		if (modal.style.display === "block") {
			closeBtn.addEventListener("click", function() {
				modal.style.display = "none";
			});
			modalBtn.addEventListener("click", function() {
				restartGame();
			});
		}
	}

}

function openModal() {
	modal.style.display = "block";
	numberOfMoves.innerHTML = `You made ${movesNum} moves to complete the game.`;
	rating.innerHTML = `Your stars rating is ${starsNum} stars!`;
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
