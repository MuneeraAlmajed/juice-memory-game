/*-------------- Constants -------------*/
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
    "Ice",
    "water"
];

const ingredientColors = {
    Orange: "#ed8a43",
    Strawberry: "#e04433",
    Apple: "#CCE2CB",
    Banana: "#FFFFB5",
    Blueberry: "#50358f",
    Honey: "gold",
    Lemon: "#f5f500",
    Milk: "#fcf0f0",
    Mango: "#FFC8A2",
    Watermelon: "#f79d93",
    Kiwi: "#97C1A9",
    Ice: "lightblue",
    water: "#ABDEE6"
};


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
const playerAnswer = document.querySelector("#player-answer");
const correctAnswer = document.querySelector("#correct-answer");
const juice = document.querySelector("#juice");
const ingredientsInCup = document.querySelector("#ingredients-in-cup");


/*-------------- Functions -------------*/

//start game
function startGame(){
    console.log("the game is started");

    fiveIngredients = [];
    selectedIngredients = [];

    //clear screen
    ingContainer.innerHTML = "";
    message.textContent = "";
    playerAnswer.textContent = "";
    correctAnswer.textContent = "";
    
    //reset timer
    timeLeft = 5;
    timer.textContent = `Time Left: ${timeLeft}`;

    //clear cup
    ingredientsInCup.innerHTML="";
    juice.style.height = "0%";


    //create 5 random ingredients
    getRandomIng();

    //countdown
    const countdown = setInterval(function() {
        timeLeft--;
        timer.textContent = `Time Left: ${timeLeft}`;

        if(timeLeft === 0){
            clearInterval(countdown);
            ingContainer.innerHTML = "";
            message.textContent = "Choose your ingredients!";
        }
    }, 1000)

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

//clear 
selectedIngredients = [];
fiveIngredients = [];
ingContainer.innerHTML = "";
message.textContent = "";
timeLeft= 5;
timer.textContent = "";
ingredientsInCup.innerHTML = "";
juice.style.height = "0%";

}

//make juice
function makeJuice(){
    console.log("Juice is made!");

    console.log("correct answer: ",fiveIngredients);
    console.log("player answer: ",selectedIngredients);

    const isCorrect = fiveIngredients.length === selectedIngredients.length && fiveIngredients.every(ingredient => selectedIngredients.includes(ingredient));

    if(isCorrect){
        message.innerHTML = `
        You win!
        <br>
        Your ingredients: ${selectedIngredients.join(", ")}<br>
        Correct ingredients: ${fiveIngredients.join(", ")}
        `;
    }else{
        message.innerHTML = `
        You lose!
        <br>
        Your ingredients: ${selectedIngredients.join(", ")}<br>
        Correct ingredients: ${fiveIngredients.join(", ")}
        `;
    }
    timer.textContent = "";
    ingContainer.innerHTML="";

}

//player choice
const getPlayerChoice = (event) => {
    playerChoice = event.target.id;  

    //store player selection
    selectedIngredients.push(playerChoice);

    //Add ingredient to cup
    addIngredient(playerChoice);
    
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

//cup
function addIngredient(ingredient) {
    const ingredientElement = document.createElement("div");

    ingredientElement.classList.add("ingredient-in-cup");

    //ingredientElement.textContent = ingredient;
    ingredientElement.style.color = "black";
    ingredientElement.style.backgroundColor = ingredientColors[ingredient];
    ingredientsInCup.appendChild(ingredientElement);
    // Increase juice level
    const percentage = selectedIngredients.length * 15;

    juice.style.height = `${percentage}%`;

    juice.style.backgroundColor = ingredientColors[ingredient];

    //mix colors
    const colors = selectedIngredients.map(
        ingredient => ingredientColors[ingredient]
    );

    //mix all color
    juice.style.background = `linear-gradient(
    to top,
    ${colors.join(", ")}
    )`;

}


/*----------- Event Listeners ----------*/

// Start button
startButton.addEventListener("click", startGame);

//play again button
playAgainButton.addEventListener("click", playAgain);

//make juice button or submit button
submitButton.addEventListener("click", makeJuice);




