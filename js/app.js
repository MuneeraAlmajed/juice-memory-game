/*-------------- Constants -------------*/

// Ingredients available in the game
const ingredients = [
    "Orange",
    "Strawberry",
    "Apple",
    "Banana",
    "Blueberry",
    "Honey",
    "Lemon",
    "Milk",
    "Mango",
    "Watermelon",
    "Kiwi",
    "Ice"
];


/*---------- Variables (state) ---------*/

let correctIngredients = [];
let selectedIngredients = [];
let timeLeft = 5;


/*----- Cached Element References -----*/

const startButton = document.querySelector("#start-btn");
const ingContainer = document.querySelector("#ingredients");
const submitButton = document.querySelector("#submit-btn");
const playAgainButton = document.querySelector("#play-again-btn");
const instructions = document.querySelector("#instructions");
const message = document.querySelector("#message");
const timer = document.querySelector("#timer");


/*-------------- Functions -------------*/

/*----------- Event Listeners ----------*/


// Start button
startButton.addEventListener("click", startGame);


// Submit button
submitButton.addEventListener("click", submitAnswer);


// Play Again button
playAgainButton.addEventListener("click", playAgain);