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

let playerChoice;
let random;
let fiveIngredients =[];
let correctIngredients = [];
let selectedIngredients = [];
let matchResult; //win or lose
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

    fiveIngredients = [];
    selectedIngredients = [];

    //clear screen
    ingContainer.innerHTML = "";
    message.textContent = "";

    //create 5 random ingredients
    getRandomIng();

    //show ingredients for 5 seconds
    setTimeout(() => {

        //hide them
        ingContainer.innerHTML = "";

        console.log("ingredients are hidden!");

        //display all the ingredients for the player
        for(const allIngredients of ingredients){
            const ingButton = document.createElement("button");

            ingButton.textContent = allIngredients;
            ingButton.id = allIngredients;

            ingButton.addEventListener("click",getPlayerChoice);

            ingContainer.appendChild(ingButton);
        }
        console.log("Choose your ingredients!");
    },5000);
}

//play again
function playAgain(){
    console.log("you can play again");

//clear the arrays
selectedIngredients.innerHTML = [];
fiveIngredients = [];
ingContainer.innerHTML = "";
message.textContent = "";
timer.textContent = "";


}

//make juice
function makeJuice(){
    console.log("Juice is made!");

    console.log("correct answer: ",fiveIngredients);
    console.log("player answer: ",selectedIngredients);

    const isCorrect = fiveIngredients.length === selectedIngredients.length && fiveIngredients.every(ingredient => selectedIngredients.includes(ingredient));

    if(isCorrect){
        message.textContent = "You win!";
    }else{
        message.textContent = "You lose!";
    }
}

//player choice
const getPlayerChoice = (event) => {
    playerChoice = event.target.id;  

    //store player selection
    selectedIngredients.push(playerChoice);

    console.log("player selected: ", playerChoice);
    console.log("All selected ingredient: ",selectedIngredients);
};

//computer random ingredients
const getRandomIng = () =>{

//to choose 5 ingredients from the array randomly
    for(i = 0; i<5;i++){
    const randomIndex = Math.floor(Math.random() * ingredients.length);
    const randomIng = ingredients[randomIndex];
    console.log("ingredinets: " +randomIng);

    // check if ingredients is already selected
    if(!fiveIngredients.includes(randomIng)){
        fiveIngredients.push(randomIng);
    }else{
        //if duplicate try again
        i--;
    }
}
//display the correct ingredients
    for (const ing of fiveIngredients){
        const ingButton = document.createElement("button");

        ingButton.textContent = ing;
        ingButton.id = ing;

        //store player choice when clicked
        ingButton.addEventListener("click",getPlayerChoice);

        
    ingContainer.appendChild(ingButton);
    }
    console.log("correct answer: ", fiveIngredients);
}



/*----------- Event Listeners ----------*/

// Start button
startButton.addEventListener("click", startGame);

//play again button
playAgainButton.addEventListener("click", playAgain);

//make juice button or submit button
submitButton.addEventListener("click", makeJuice);




