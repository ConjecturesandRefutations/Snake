class Snake {
  constructor() {
    this.x = 231;
    this.y = 300;
    this.width = 20;
    this.height = 20;
    this.segments = [new SnakeSegment(this.x, this.y, this.width, this.height)];
  }

  drawSnake() {
    ctx.fillStyle = 'darkGreen';
    for (let segment of this.segments) {
      ctx.fillRect(segment.x, segment.y, segment.width, segment.height);
    }
  }

  moveSnake() {

    ctx.clearRect(this.x, this.y, this.width, this.height);
    let head = this.segments[0];
    let dx = 0;
    let dy = 0;

    switch (currentDirection) {
      case 37: //left
        if (head.x > -1) {
          dx = -10;
        }
        break;
      case 39: //right
        if (head.x < 685) {
          dx = 10;
        }
        break;
      case 38: //up
        if (head.y > -1) {
          dy = -10;
        }
        break;
      case 40: //down
        if (head.y < 481) {
          dy = 10;
        }
        break;
    }

    // Update the position of each segment
    for (let i = this.segments.length - 1; i > 0; i--) {
      this.segments[i].x = this.segments[i - 1].x;
      this.segments[i].y = this.segments[i - 1].y;
    }

    // Update the position of the head
    head.x += dx;
    head.y += dy;
    this.x = head.x;
    this.y = head.y;

    // Draw the snake
    this.drawSnake();
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

    if (!currentSnake.segments.length) {
      // Game over, stop the movement
      return;
    }

    const oppositeDirections = {
      37: 39, // left <-> right
      38: 40, // up <-> down
      39: 37, // right <-> left
      40: 38  // down <-> up
    };

    if (nextDirection && nextDirection !== currentDirection && nextDirection !== oppositeDirections[currentDirection]) {
      currentDirection = nextDirection;
      nextDirection = null;
    }

    currentSnake.moveSnake();

    if (isGameRunning) {
    requestAnimationFrame(moveSnake);
  }}, 50);
}
