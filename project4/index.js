const gameboard = document.getElementById('gameboard');
const Context = gameboard.getContext('2d');
const scoretext = document.getElementById('scoreVal')
const width = gameboard.width;
const height = gameboard.height;

const unit = 25;
let foodx;
let foody;
let xvel = 25;
let yvel = 0;
let score = 0;
let active = true;
let started = false;

let snake = [
    { x: unit * 3, y: 0 },
    { x: unit * 2, y: 0 },
    { x: unit, y: 0 },
    { x: 0, y: 0 }
];
window.addEventListener('keydown', keypress);




startGame();






function startGame() {
    Context.fillStyle = '#000000';
    Context.fillRect(0, 0, width, height)
    createfood();
    displayfood();
    drawsnake();

}
function clearboard(params) {
    Context.fillStyle = 'black';
    Context.fillRect(0, 0, width, height);

}
function createfood(params) {
    foodx = Math.floor(Math.random() * width / unit) * unit;
    foody = Math.floor(Math.random() * width / unit) * unit;

}
function displayfood(params) {
    Context.fillStyle = 'red';
    Context.fillRect(foodx, foody, unit, unit)

}
function drawsnake(params) {
    Context.fillStyle = 'aqua';
    Context.strokestyle = 'black';
    snake.forEach((snakepart) => {
        Context.fillRect(snakepart.x, snakepart.y, unit, unit)
        Context.strokeRect(snakepart.x, snakepart.y, unit, unit)

    })
}
function movesnake(params) {
    const head = {
        x: snake[0].x + xvel,
        y: snake[0].y + yvel
    }
    snake.unshift(head)
    if (snake[0].x == foodx && snake[0].y == foody) {
        score += 1;
        scoretext.textContent = score;
        createfood();
    }

    else


        snake.pop()
}
function nextTick() {
    if (active ) {
        setTimeout(() => {
            clearboard();
            displayfood();
            movesnake();
            drawsnake();
            checkgameover();
            nextTick();

        }, 500);

    }
    else {
        clearboard();
        Context.font = "bold 50px serif";
        Context.fillStyle = "white";
        Context.textAlign = "center";
        Context.fillText("game over!!", width / 2, height / 2)
    }



}
function keypress(event) {
    if (!started) {
        started = true;
        nextTick();

    }

    const LEFT = 37
    const UP = 38
    const RIGHT = 39
    const DOWN = 40
    switch (true) {
        case (event.keyCode == LEFT && xvel != unit):
            xvel = -unit;
            yvel = 0;

            break;
        case (event.keyCode == RIGHT && xvel != -unit):
            xvel = unit;
            yvel = 0;

            break;
        case (event.keyCode == UP && yvel != unit):
            xvel = 0;
            yvel = -unit;

            break;
        case (event.keyCode == DOWN && yvel != -unit):
            xvel = 0;
            yvel = unit;

            break;

    }
}
function checkgameover() {
    switch (true) {
        case (snake[0].x < 0):
        case (snake[0].y < 0):
        case (snake[0].x >= width):
        case (snake[0].y >= height):
            active = false;

            break;
    }
    for (let i = 1; i < snake.length; i += 1) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            active = false;
        }
    }

}
