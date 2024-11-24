let player = document.getElementById('player');
let obstacle = document.getElementById('obstacle');
let scoreElement = document.getElementById('score');
let score = 0;
let playerPosition = 135;
let playerSpeed = 15;
let isGameOver = false;

// Move player left or right
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft' && playerPosition > 0) {
        playerPosition -= playerSpeed;
        player.style.left = playerPosition + 'px';
    } else if (event.key === 'ArrowRight' && playerPosition < 270) {
        playerPosition += playerSpeed;
        player.style.left = playerPosition + 'px';
    }
});

// Game logic for obstacles
function moveObstacle() {
    let obstaclePosition = parseInt(window.getComputedStyle(obstacle).top);
    if (obstaclePosition >= 500) {
        obstacle.style.top = '-30px';
        obstacle.style.left = Math.floor(Math.random() * 270) + 'px';
        score++;
        scoreElement.textContent = score;
    } else {
        obstacle.style.top = obstaclePosition + 5 + 'px';
    }

    // Collision detection
    let obstacleBounds = obstacle.getBoundingClientRect();
    let playerBounds = player.getBoundingClientRect();

    if (
        obstacleBounds.top < playerBounds.bottom &&
        obstacleBounds.bottom > playerBounds.top &&
        obstacleBounds.left < playerBounds.right &&
        obstacleBounds.right > playerBounds.left
    ) {
        isGameOver = true;
        alert('Game Over! Your score was ' + score);
        score = 0;
        scoreElement.textContent = score;
    }
}

// Start the game loop
function gameLoop() {
    if (!isGameOver) {
        moveObstacle();
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();
