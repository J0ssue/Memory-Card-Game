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

let cardList = [];//added elements clicked

let matchedCardsCounter = 0;//counts pairs

let moves = document.querySelector(".moves");
let movesNum = 0;

//Game Logic
//Listens for clicks on cards
function clickedCard() {
	let cards = document.querySelectorAll(".card");

	for (let i = 0; i < cards.length; i++) {
		cards[i].addEventListener("click", function(e){
			cards[i].className = "card open show";
			cardList.push(e.target);
			matchCards();
		});
	}
}

//removes elements from cardList if className doesn't match
function matchCards() {
	if (cardList.length === 2 && cardList[0].childNodes[1].className !== cardList[1].childNodes[1].className) {
		setTimeout(function() {
			cardList[0].classList.remove("open");
			cardList[0].classList.remove("show");
			cardList[1].classList.remove("open");
			cardList[1].classList.remove("show");
			cardList = [];
		}, 350);

		movesCounter();

	} else if (cardList.length === 2 && cardList[0].childNodes[1].className === cardList[1].childNodes[1].className) {
		matchedCardsCounter += 1;
		cardList = [];

		movesCounter();
	}
}
clickedCard();


//Counts number of moves
function movesCounter() {
		movesNum += 1;
		moves.innerHTML = movesNum;
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
