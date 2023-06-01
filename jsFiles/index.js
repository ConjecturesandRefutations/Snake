let currentGame;
let currentSnake;

let isGameRunning = false;

let foodFrequency = 0; // support the logic for generating obstacles

let background = new Image();
background.src = "./images/background snake.jpg";

//Opening Area and Start Button

const toggleButton = document.getElementById('start-button')
const toggleOpening = document.getElementById('opening-section')
toggleOpening.style.display = ''

//Game Area
const myCanvas = document.getElementById('canvas');
const ctx = myCanvas.getContext('2d');

myCanvas.style.display = 'none'

//Score Area
const info = document.getElementById('info')
info.style.display = 'none'

//Game-Over Area

const gameOver = document.getElementById('game-over')
gameOver.style.display = 'none' 

//Start Button

window.onload = () => {
    toggleButton.onclick = () => {
      if (toggleOpening.style.display === ''){
        toggleOpening.style.display = 'none';
    }
    if (myCanvas.style.display = 'none'){
        myCanvas.style.display = ''
    }

    info.style.display = ''

    startGame();
  };

};

let restartButton = document.getElementsByClassName('try-again-button');
for (let i = 0; i < restartButton.length; i++) {
  restartButton[i].addEventListener('click', () => {
    gameOver.style.display = 'none';
    toggleOpening.style.display = 'none';
    myCanvas.style.display = '';
    info.style.display='';
    currentGame.score=0;
    document.querySelector('.score').innerText = currentGame.score
    startGame();
  });
}


let mainMenuButton = document.getElementsByClassName('main-menu-button')
for (let i = 0 ; i < mainMenuButton.length; i++) {
  mainMenuButton[i].addEventListener('click',  ()=>{
    gameOver.style.display = 'none';
    toggleOpening.style.display = ''
    location.reload() 
  })  
}


function startGame() {

  if (isGameRunning) {
    return;
  }
  
  isGameRunning = true;

  currentGame = new Game();
  ctx.drawImage(background, 0, 0,myCanvas.width,myCanvas.height); // draw background image
  //Instantiate a new snake
  currentSnake = new Snake();
  currentDirection = null;
  currentSnake.drawSnake();
  let randomFoodX = Math.floor(Math.random() * 680);
  let randomFoodY = Math.floor(Math.random() * 480);
  let randomFoodWidth = 20;
  let randomFoodHeight = 20;
  let newFood = new Food(
      randomFoodX, 
      randomFoodY, 
      randomFoodWidth, 
      randomFoodHeight);
  currentGame.food.push(newFood);
       updateCanvas();// keeping track of the updates as the game unfolds

}

function updateCanvas() {
  ctx.clearRect(0, 0, 500, 700); // clear canvas
  ctx.drawImage(background, 0, 0, myCanvas.width, myCanvas.height); // redraw the background

 currentSnake.drawSnake(); // redraw the snake at its current position
 foodFrequency++;

 //Logic for colliding with the walls

if ( currentSnake.x < 0 || currentSnake.x > 681
    || currentSnake.y < 0|| currentSnake.y > 480   ){
        endGame()
 }
 
 function detectCollision(food) {
  return (
    currentSnake.x < food.x + food.width && // check left side of element 
    currentSnake.x + currentSnake.width > food.x && // check right side
    currentSnake.y < food.y + food.height && // check top side
    currentSnake.y + currentSnake.height > food.y // check bottom side
  );
}

for (let i = 0; i < currentGame.food.length; i++) {
  currentGame.food[i].drawFood();

  if (detectCollision(currentGame.food[i])) {
    // Generate a new piece of food
    let randomFoodX = Math.floor(Math.random() * 680);
    let randomFoodY = Math.floor(Math.random() * 480);
    let randomFoodWidth = 20;
    let randomFoodHeight = 20;
    let newFood = new Food(randomFoodX, randomFoodY, randomFoodWidth, randomFoodHeight);

    currentGame.food.splice(i, 1);
    currentGame.food.push(newFood);

    // Increase the score and update the display
    currentGame.score++;
    document.querySelector('.score').innerText = currentGame.score;

    // Make the snake grow by adding a new segment
    let lastSegment = currentSnake.segments[currentSnake.segments.length - 1];
    let newSegment = new SnakeSegment(lastSegment.x, lastSegment.y, currentSnake.width, currentSnake.height);
    currentSnake.segments.push(newSegment);
  }
  if (!isGameRunning) {
    endGame();
    return; // Exit the updateCanvas() function
  }
}

function endGame(){
myCanvas.style.display = 'none'
info.style.display = 'none'
gameOver.style.display = '' 
document.querySelector('.finalScore').innerText = currentGame.score
isGameRunning = false;
}


requestAnimationFrame(updateCanvas);
}




