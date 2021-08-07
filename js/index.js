// Game Constants &Variable
let inputDirection = { x: 0, y: 0 };

// Music for games
const foodSound = new Audio("../music/food.mp3");
const gameOverSound = new Audio("../music/gameover.mp3");
const moveSound = new Audio("../music/move.mp3");
const musicSound = new Audio("../music/music.mp3");

let lastPaintTime = 0;
let speed = 5;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let score = 0;
// Game Functions
function main(currentTime) {
  window.requestAnimationFrame(main);
  //   console.log(currentTime);
  if ((currentTime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = currentTime;
  gameEngine();
}
function isCollide(snake) {
  //  if bump to urself

  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      alert("here");
      return true;
    }
  }
  //   if bummp into wall
  if (snake[0].x > 18 || snake[0].x < 0 || snake[0].y > 18 || snake[0].y < 0) {
    return true;
  }

  // all is well
  return false;
}
function gameEngine() {
  // Part 1: Update Snake

  // if the snake collides
  if (isCollide(snakeArr)) {
    // gameOverSound.play();
    // musicSound.pause();
    inputDirection = { x: 0, y: 0 };
    alert("Game Over!!");
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
    // musicSound.play();
  }

  //   If food is eaten, increment score and regenerate food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    // foodSound.play();
    snakeArr.unshift({
      x: snakeArr[0].x + inputDirection.x,
      y: snakeArr[0].y + inputDirection.y,
    });
    // random number between 2 and 18
    food = {
      x: Math.round(2 + (18 - 2) * Math.random()),
      y: Math.round(2 + (18 - 2) * Math.random()),
    };
  }

  //   Moving snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDirection.x;
  snakeArr[0].y += inputDirection.y;

  // Part 2a: Display Snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) snakeElement.classList.add("head");
    else snakeElement.classList.add("snake");
    board.appendChild(snakeElement);
  });

  // Part 2b: Display food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// game loop
// main logic starts here
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDirection = { x: 0, y: 1 }; //Start the game
  // moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      //   console.log("ArrowUp");
      inputDirection.x = 0;
      inputDirection.y = -1;
      break;
    case "ArrowDown":
      //   console.log("ArrowDown");
      inputDirection.x = 0;
      inputDirection.y = 1;
      break;

    case "ArrowLeft":
      //   console.log("ArrowLeft");
      inputDirection.x = -1;
      inputDirection.y = 0;
      break;
    case "ArrowRight":
      //   console.log("ArrowRight");
      inputDirection.x = 1;
      inputDirection.y = 0;
      break;

    default:
      break;
  }
});
