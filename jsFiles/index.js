let currentGame;
let currentSnake;

let foodFrequency = 0; // support the logic for generating obstacles

let background = new Image();
background.src = "./images/background snake.jpg";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
  document.onkeydown = (e) => {
    let whereToGo = e.keyCode;
    currentSnake.moveSnake(whereToGo);
}
};

function startGame() {

  currentGame = new Game();
  ctx.drawImage(background, 0, 0,myCanvas.width,myCanvas.height); // draw background image

  //Instantiate a new snake
  currentSnake = new Snake();
  currentSnake.drawSnake();
       updateCanvas();// keeping track of the updates as the game unfolds

}

function updateCanvas() {
  ctx.clearRect(0, 0, 500, 700); // clear canvas
  ctx.drawImage(background, 0, 0, myCanvas.width, myCanvas.height); // redraw the background

 currentSnake.drawSnake(); // redraw the snake at its current position

 //Logic for colliding with the walls

if ( currentSnake.x < 0 || currentSnake.x > 681
    || currentSnake.y < 0|| currentSnake.y > 480   ){
        myCanvas.style.display = 'none'
        info.style.display = 'none'
        gameOver.style.display = '' 
 }


  requestAnimationFrame(updateCanvas);
}



/*   if (obstaclesFrequency % 60 === 1) {
      //Draw an obstacle
      let randomObstacleX = 0;
      let randomObstacleY = Math.floor(Math.random() * 410);
	@@ -111,6 +132,22 @@ if ( currentSnake.x < 0 || currentSnake.x > 681
      currentGame.obstacles.push(newObstacle);
  }

  for(let i = 0; i<currentGame.obstacles.length; i++) {
      currentGame.obstacles[i].x += 3; 
      currentGame.obstacles[i].drawObstacle();
	@@ -131,14 +168,76 @@ if ( currentSnake.x < 0 || currentSnake.x > 681
      } 
    }

    

function detectCollision(obstacle) {
  return ((currentSnake.x < obstacle.x + obstacle.width) &&         // check left side of element 
  (currentSnake.x + obstacle.width > obstacle.x) &&           // check right side
  (currentSnake.y < obstacle.y + obstacle.height) &&         // check top side
  (currentSnake.y + currentSnake.height > obstacle.y));           // check bottom side

    requestAnimationFrame(updateCanvas);
}
} */