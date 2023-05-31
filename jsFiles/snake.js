class Snake {
  constructor() {
    this.x = 231;
    this.y = 300;
    this.width = 20;
    this.height = 20;
    this.segments = [new SnakeSegment(this.x, this.y, this.width, this.height)];
  }

  drawSnake() {
    ctx.fillStyle = 'blue';
    for (let segment of this.segments) {
      ctx.fillRect(segment.x, segment.y, segment.width, segment.height);
    }
  }

  moveSnake() {
    ctx.clearRect(this.x, this.y, this.width, this.height);
    let head = this.segments[0];

    switch (currentDirection) {
      case 37: //left
        if (head.x > -1) {
          this.x -= 10;
        }
        break;
      case 39: //right
        if (head.x < 685) {
          this.x += 10;
        }
        break;
      case 38: //up
        if (head.y > -1) {
          this.y -= 10;
        }
        break;
      case 40: //down
        if (head.y < 481) {
          this.y += 10;
        }
        break;
    }

    // Move each segment of the snake
    for (let i = this.segments.length - 1; i > 0; i--) {
      this.segments[i].x = this.segments[i - 1].x;
      this.segments[i].y = this.segments[i - 1].y;
    }

    // Update the position of the head
    head.x = this.x;
    head.y = this.y;
  }
}

class SnakeSegment {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

let currentDirection = null;
let nextDirection = null;

function handleKeyDown(event) {
  const keyCode = event.keyCode;
  if (keyCode >= 37 && keyCode <= 40) {
    event.preventDefault();

    if (!currentDirection) {
      // Set the initial direction
      currentDirection = keyCode;
      moveSnake();
    } else {
      // Set the next direction
      nextDirection = keyCode;
    }
  }
}

function handleKeyUp(event) {
  const keyCode = event.keyCode;
  if (keyCode === currentDirection) {
    // Clear the next direction if the same arrow is released
    nextDirection = null;
  }
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

function moveSnake() {
  setTimeout(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    currentSnake.moveSnake();

    currentSnake.drawSnake();

    if (nextDirection && nextDirection !== currentDirection) {
      currentDirection = nextDirection;
      nextDirection = null;
    }

    requestAnimationFrame(moveSnake);
  }, 32); 
}

