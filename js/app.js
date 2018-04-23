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

let modalContent = document.querySelector(".modal-content");
let stars = document.querySelectorAll(".fa-star");
let starCounter;

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
	displayCardSymbol();
	console.log(iconShuffle);
}

window.onload = newGame();

// set up the event listener for a card. If a card is clicked:
function displayCardSymbol() {
	for (let i = 0; i < cards.length; i++) {
		// onetime(cards[i], "click");
		clickListener(cards[i]);
	}
}

 // * display the card's symbol (put this functionality in another function that you call from this one)

function clickListener(element) {
	if (element.className === "card") {
		element.addEventListener("click", function(e) {
			element.classList.add("open");
			if (element.className === "card open") {
				openCardAddToList(element);
			} 
		});
	}  
}
// function below removes event listener
// element.removeEventListener("click", arguments.callee);

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
    <button id="modalBtn" class="button">Play Again?</button>
 	`;
 	modalContent.appendChild(message);

	let playButton = document.getElementById("modalBtn");
 	closeModal(modal);
 	playAgain(playButton);
}

// close modal functionality
function closeModal(element) {
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
