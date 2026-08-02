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
//start game
function startGame(){
    console.log("the game is started");
}

//play again
function playAgain(){
    console.log("you can play again");
}

//make juice
function makeJuice(){
    console.log("Juice is made!");
}
/*----------- Event Listeners ----------*/


// Start button
startButton.addEventListener("click", startGame);

//play again button
playAgainButton.addEventListener("click", playAgain);

//make juice button or submit button
submitButton.addEventListener("click", makeJuice);

