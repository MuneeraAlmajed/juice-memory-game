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
    Apple: "red",
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
let timeLeft = 5;


/*----- Cached Element References -----*/

const startButton = document.querySelector("#start-btn");
const ingContainer = document.querySelector("#ingredients");
const submitButton = document.querySelector("#submit-btn");
const playAgainButton = document.querySelector("#play-again-btn");
const instructions = document.querySelector("#instructions");
const message = document.querySelector("#message");
const timer = document.querySelector("#timer");
const juice = document.querySelector("#juice");
const ingredientsInCup = document.querySelector("#ingredients-in-cup");
const ingredientsArea = document.querySelector(".ingredients-area");
const juiceArea = document.querySelector(".juice-area");
const gameHeader = document.querySelector(".game-header");
const secDes = document.querySelector(".section-description");
const secHead = document.querySelector(".section-header");




/*-------------- Functions -------------*/
    playAgainButton.style.display= "none";
    submitButton.style.display="none";
    secDes.textContent = "";
   

//start game
function startGame(){
    console.log("the game is started");

    fiveIngredients = [];
    selectedIngredients = [];

    playAgainButton.style.display = "none";
    submitButton.style.display = "inline-block";
    secHead.style.display = " inline-block";


    //clear screen
    ingContainer.innerHTML = "";
    message.textContent = "";
    
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

            ingButton.addEventListener("click",handleMove);

            ingContainer.appendChild(ingButton);
        }
        console.log("Choose your ingredients!");

    },5000);

   


}

//play again
function playAgain(){
    console.log("you can play again");

    // Clear previous game
    selectedIngredients = [];
    fiveIngredients = [];

    ingContainer.innerHTML = "";
    message.textContent = "";
    timeLeft = 5;
    ingredientsInCup.innerHTML = "";
    juice.style.height = "0%";

    // Show everything again
    startButton.style.display = "inline-block";
    ingredientsArea.style.display = "block";
    timer.style.display = "none";
    juiceArea.style.display = "block";
    playAgainButton.style.display = "none";
    submitButton.style.display = "none;"
}

//make juice
function makeJuice(){
    console.log("Juice is made!");


    const isCorrect =
        fiveIngredients.length === selectedIngredients.length &&
        fiveIngredients.every((ingredient, index) =>
           ingredient === selectedIngredients[index]
        );

    // Show win or lose message
    if(isCorrect){
        message.innerHTML = `
            🍓 Perfect Blend! You're a Juice Genius!
            <br><br>
            Your Selected Ingredients:
            <br>
            ${selectedIngredients.join(", ")}
            <br><br>
            Correct Ingredients:
            <br>
            ${fiveIngredients.join(", ")}
        `;
    }else{
        message.innerHTML = `
            🥴 Uh-Oh… Who Let You Cook?!
            <br><br>
            Your Selected Ingredients:
            <br>
            ${selectedIngredients.join(", ")}
            <br><br>
            Correct Ingredients:
            <br>
            ${fiveIngredients.join(", ")}
        `;
    }

    // Hide everything except the glass and result
    startButton.style.display = "none";
    ingredientsArea.style.display = "none";
    submitButton.style.display = "none";
    timer.style.display = "none";

    // Keep the glass visible
    juiceArea.style.display = "block";

    // Show result
    message.style.display = "block";

    //show pplay agin button
    playAgainButton.style.display = "inline-block";


    console.log("Result screen displayed!");
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
        ingButton.addEventListener("click",handleMove);

        
    ingContainer.appendChild(ingButton);
    }
    
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
//render
function render(){
    addIngredient(playerChoice);
}


/*----------- Event Listeners ----------*/

// Start button
startButton.addEventListener("click", startGame);

//play again button
playAgainButton.addEventListener("click", playAgain);

//make juice button or submit button
submitButton.addEventListener("click", makeJuice);

//render
const handleMove = (event) => {

    playerChoice = event.target.id;
    selectedIngredients.push(playerChoice);

    event.target.classList.add("selected");

    console.log("player selected: ", playerChoice);
    console.log("All selected ingredient: ", selectedIngredients);

    
    render();
};

