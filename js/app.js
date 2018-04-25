// * Create a list that holds all of your cards
var icons = [
"fa-diamond",
"fa-paper-plane-o",
"fa-anchor",
"fa-bolt",
"fa-cube",
"fa-leaf",
"fa-bicycle",
"fa-bomb",
"fa-diamond",
"fa-paper-plane-o",
"fa-anchor",
"fa-bolt",
"fa-cube",
"fa-leaf",
"fa-bicycle",
"fa-bomb"
];

// REFERENCES 
// Cards Reference
let cards = document.querySelectorAll(".card");
let openCardList = [];// Open cards holder
let movesCounter = 0;// counts moves
let moves;// moves DOM reference
let restart;// restart button reference
let matchedPairs = 0;//

// Modal references
let modalContent = document.querySelector(".modal-content");
let stars = document.querySelectorAll(".fa-star");
let starCounter;

// Timer variables
var myTimeInterval;
var sec;
// Restart button functionality
function restartGameButton() {
	restart = document.querySelector(".restart");
	restart.addEventListener("click", function() {
		location.reload();
	});
}
restartGameButton();

// * Display the cards on the page
// -shuffle the list of cards using the provided "shuffle" method below
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

// - loop through each card and create its HTML
function newGame() {
	let iconShuffle = shuffle(icons);	
	for (let i = 0; i < iconShuffle.length; i++) {
// - add each card's HTML to the page
		cards[i].innerHTML = `<i class="fa ${icons[i]}"></i>`;
	}
	makeUnmatchedCardsClickable();
	console.log(iconShuffle);
}

window.onload = newGame();

// Timer 
function timerStart() {
	console.log(openCardList.length);
	console.log(movesCounter);
	if (openCardList.length === 1 && movesCounter === 0) {
		 sec = 0;
		function pad ( val ) { return val > 9 ? val : "0" + val; }
		 myTimeInterval =	setInterval( function(){
			document.getElementById("seconds").innerHTML=pad(++sec%60);
			document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
		}, 1000);
	}
}

// Stop timer when all cards match
function stopTime() {
	if (matchedPairs === 8) {
		clearInterval(myTimeInterval);
	}
}
		

// set up the event listener for a card. If a card is clicked:
function makeUnmatchedCardsClickable() {
	for (let i = 0; i < cards.length; i++) {
		if (cards[i].className === "card") {
			cards[i].addEventListener("click", handleCardClick);
		}
	}
}

// * display the card's symbol
function handleCardClick(event) {
	event.target.classList.add("open");
	if (event.target.className === "card open") {
		// is it the first opened card? 
		// yes > remove click event from this card only
		if (openCardList.length === 0) {
			event.target.removeEventListener("click", handleCardClick);
		}
		// is it the second opened card?
		// yes > remove click event from all cards
		if (openCardList.length === 1) {
			for (let i = 0; i < cards.length; i++) {
				cards[i].removeEventListener("click", handleCardClick);
			}
		}
		openCardAddToList(event.target);
		timerStart();
	}
}

// * - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
function openCardAddToList(element) {
	openCardList.push(element);
	checkForMatchingCards();
}

// * - if the list already has another card, check to see if the two cards match
function checkForMatchingCards() {
 	// * + if the cards do not "match", remove the cards from the list and hide the card's symbol 
	if (openCardList.length === 2 && openCardList[0].innerHTML !== openCardList[1].innerHTML) {
		setTimeout(function() {
			openCardList[0].classList.remove("open");
			openCardList[1].classList.remove("open");
			openCardList = [];
			makeUnmatchedCardsClickable();
			// bring back the click listener for all cards that don't have a match class
		}, 350);
		movesCounter++;
		starRating();
		incrementMovesCounter();
 	// * + if the cards do "match", lock the cards in the open position 
	} else if (openCardList.length === 2 && openCardList[0].innerHTML === openCardList[1].innerHTML) {
		openCardList[0].className = "card match";	
		openCardList[1].className = "card match";	
		matchedPairs++;
		movesCounter++;
		openCardList = [];
		starRating();
		incrementMovesCounter();
		// bring back the click listener for all cards that don't have a match class
			makeUnmatchedCardsClickable();
 		stopTime();
		endOfGame();
	}
}

// * + increment the move counter and display it on the page
function incrementMovesCounter() {
	moves = document.querySelector(".moves");
	moves.textContent = `${movesCounter}`;
}

// removes stars after certain amount of moves
function starRating() {
	if (movesCounter > 8) {
		stars[0].classList.remove("fa-star");
		stars[0].classList.add("fa-star-o");
		starCounter = 2;
	}
	if (movesCounter > 15) {
		stars[1].classList.remove("fa-star");
		stars[1].classList.add("fa-star-o");
		starCounter = 1;
	}
	if (movesCounter > 20) {
		stars[2].classList.remove("fa-star");
		stars[2].classList.add("fa-star-o");
		starCounter = 0;
	}
}

// end game functionality
function endOfGame() {
	if (matchedPairs === 8) {
		openModal();
	}
}

 // * + if all cards have matched, display a message with the final score 
function openModal() {
	let modal = document.querySelector(".modal");
 	let message = document.createElement("div");

 	modal.style.display = "block";
  message.innerHTML = `
 		<p>Congratulations! YOU WON!</p>
 		<p>!!Moves made ${movesCounter}!! !!Your star rating is ${starCounter}!!</p>
 		<p>Your time is ${sec} seconds</p>
    <button id="modalBtn" class="button">Play Again?</button>
 	`;
 	modalContent.appendChild(message);

	let playButton = document.getElementById("modalBtn");
 	closeModalButton(modal);
 	playAgain(playButton);
}

// close modal functionality
function closeModalButton(element) {
	let closeButton = document.getElementById("closeBtn");
	closeButton.addEventListener("click", function() {
		element.style.display = "none";
	});
}

// play again button functionality
function playAgain(button) {
	button.addEventListener("click", function() {
		location.reload();
	});
}



