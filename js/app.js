/*
 * Create a list that holds all of your cards
 */
let cards = document.querySelectorAll('.card');

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


// Shuffling the cards
// shuffle work only with arrays not with NodeList. Therefore, an array
// was created to suffle the cards
let cardsArray = Array.from(cards);
cardsArray = shuffle(cardsArray);

//access the deck of cards
const deck = document.querySelector('.deck');
//set all cards to be closed and add them to the deck
for (let i = 0; i < cards.length; i++){
	const currentCard = cardsArray[i];
	currentCard.className = 'card';
	deck.appendChild(currentCard);
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

deck.addEventListener('click', clickCard);
function clickCard(event){
	if (event.target.nodeName.toLowerCase() == 'li') {
		displayCardSymbol(event);
		let numOfOpenCards = addToOpenCards(event);
		if (numOfOpenCards == 2){
			checkMatch();
		}
		countMoves();
	}
}

function displayCardSymbol(event){
	event.target.className += " open show";
}

let openCards = [];
function addToOpenCards(event) {
	openCards.push(event.target);
	if (openCards.length == 2) {
		return 2; //list full and do check
	} else {
		return 1; //list has one element
	}
}

function checkMatch(){
	if (openCards[0].querySelector('i').className == openCards[1].querySelector('i').className){
		lockOpen();
	} else { setTimeout(function removeCards(){
			openCards[0].className = "card";
			openCards[1].className = "card"
			openCards = [];}, 1000);
	}
}

function lockOpen(){
	openCards[0].className += " match";
	openCards[1].className += " match";
	openCards = [];
}


let moveCounter = 0;
const movesSpan = document.querySelector('.moves');
function countMoves(){
	moveCounter += 1;
	movesSpan.textContent = moveCounter;
}