// Create and set up the canvas
const cvs = document.createElement("canvas");
cvs.width = window.innerWidth;
cvs.height = window.innerHeight;
document.getElementById('container').appendChild(cvs);
const ctx = cvs.getContext("2d");

// Game configuration
const maxCards = 10;
const cardValues = Array.from({ length: maxCards }, (_, i) => i + 1);
const cardsOnField = [];
let pointToWin = 1; // Points required to win
let goalNumber = 0;
let playerScore = 0;
let computerScore = 0;
let isInteractable = false;
let isStarted = false;
let gameOver = false; // Add a game over state
let countdown = 3; // Countdown timer before interaction
<<<<<<< HEAD
let computerReactionTime = 1000; // Reaction time for the computer in milliseconds
=======
let computerReactionTime = 1300; // Reaction time for the computer in milliseconds
>>>>>>> eee6f507aa10f27f820fb0b7ebe83eea32056658

// Card layout dimensions
const cardWidth = 100;
const cardHeight = 150;
const cardSpacing = 50;
const numCardsPerRow = 5;

// Card class to represent each card on the field
class Card {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.width = cardWidth;
        this.height = cardHeight;
        this.value = value;
        this.color = "white";
        this.isHovered = false; // Check if the card is hovered over
    }

    // Draw the card on the canvas
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = this.isHovered ? "orange" : "black";
        ctx.lineWidth = this.isHovered ? 10 : 1;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Draw the card value
        ctx.font = "1.5rem Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.value, this.x + this.width / 2, this.y + this.height / 2);
    }

    // Check if a point (x, y) is inside the card
    isPointInside(x, y) {
        return (
            x >= this.x &&
            x <= this.x + this.width &&
            y >= this.y &&
            y <= this.y + this.height
        );
    }
}

// Start button class for the initial screen
class StartButton {
    constructor() {
        this.x = cvs.width / 2;
        this.y = cvs.height * 0.75 + 100;
        this.radius = 50;
        this.color = "white";
    }

    // Draw the start button
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.stroke();
<<<<<<< HEAD
        ctx.font = "2rem Baloo";
=======
        ctx.font = "2rem Arial";
>>>>>>> eee6f507aa10f27f820fb0b7ebe83eea32056658
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Start", this.x, this.y);
    }

    // Check if the button is clicked
    isClicked(x, y) {
        const dx = x - this.x;
        const dy = y - this.y;
        return Math.sqrt(dx * dx + dy * dy) <= this.radius;
    }
}

// Initialize start button
const startButton = new StartButton();

// Load the Standby image
const standbyImage = new Image();
standbyImage.src = "Standby.jpg";

// Render Standby.jpg
function renderStandbyImage() {
    const imgWidth = 300;
    const imgHeight = 400;
    const imgX = cvs.width / 2 - imgWidth / 2;
    const imgY = cvs.height / 2 - imgHeight / 2; // Above the start button
    ctx.drawImage(standbyImage, imgX, imgY, imgWidth, imgHeight);
}

// Render the game elements
function render() {
    if (gameOver) return; // Prevent further rendering during game over
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    if (!isStarted) {
<<<<<<< HEAD
        ctx.font = "2rem Baloo";
=======
        ctx.font = "2rem Arial";
>>>>>>> eee6f507aa10f27f820fb0b7ebe83eea32056658
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.fillText(
            `Pick the card with the same value as the goal number. Reach ${pointToWin} points first to win!`,
            cvs.width / 2,
            cvs.height / 4 - 100
        );
        renderStandbyImage();
        startButton.draw();
    } else {
        if (countdown > 0) {
            ctx.font = "3rem Arial";
            ctx.fillText(countdown, cvs.width / 2, cvs.height / 2);
        } else {
            ctx.font = "4rem Arial";
<<<<<<< HEAD
            ctx.fillText(`Goal: ${goalNumber}`, cvs.width / 2, cvs.height / 4 - 50);
            ctx.font = "2rem Baloo";
            ctx.fillText(
                `Player: ${playerScore} - Computer: ${computerScore}`,
                cvs.width / 2,
                cvs.height / 4 - 100
=======
            ctx.fillText(`Goal: ${goalNumber}`, cvs.width / 2, 150);
            ctx.font = "2rem Arial";
            ctx.fillText(
                `Player: ${playerScore} - Computer: ${computerScore}`,
                cvs.width / 2,
                50
>>>>>>> eee6f507aa10f27f820fb0b7ebe83eea32056658
            );
            cardsOnField.forEach((card) => card.draw());
        }
    }
}

// Start the next round
function startNextTurn() {
    goalNumber = Math.floor(Math.random() * maxCards) + 1;
    cardsOnField.length = 0; // Clear current cards
    shuffleArray(cardValues);
    cardValues.forEach((value, index) => {
        const row = Math.floor(index / numCardsPerRow);
        const col = index % numCardsPerRow;
        const totalRowWidth = numCardsPerRow * cardWidth + (numCardsPerRow - 1) * cardSpacing;
        const canvasCenterX = cvs.width / 2;
        const startX = canvasCenterX - totalRowWidth / 2;
        const totalRowsHeight = 2 * cardHeight + cardSpacing;
        const canvasCenterY = cvs.height / 2;
        const startY = canvasCenterY - totalRowsHeight / 2;
        const x = startX + col * (cardWidth + cardSpacing);
        const y = startY + row * (cardHeight + cardSpacing);
        cardsOnField.push(new Card(x, y, value));
    });
    isInteractable = false;
    countdown = 3;
    const countdownInterval = setInterval(() => {
        if (countdown === 0) {
            clearInterval(countdownInterval);
            render();
            isInteractable = true;
            setTimeout(() => {
                if (isInteractable) {
                    handleComputerPick();
                }
            }, computerReactionTime);
        } else {
            countdown--;
            render();
        }
    }, 1000);
}

// Handle player's card selection
function handlePlayerPick(value) {
    if (value === goalNumber) {
        playerScore++;
        cardsOnField.find(card => card.value === value).color = "green";
        isInteractable = false;
        checkGameOver();
    }
}

// Handle computer's card selection
function handleComputerPick() {
    const targetCard = cardsOnField.find(card => card.value === goalNumber);
    if (targetCard) {
        targetCard.color = "red";
        computerScore++;
    }
    isInteractable = false;
    checkGameOver();
}

<<<<<<< HEAD
// Load the win and lose sound files
const winSound = new Audio("Player_win.mp3");
const loseSound = new Audio("Player_lose.mp3");

=======
>>>>>>> eee6f507aa10f27f820fb0b7ebe83eea32056658
// Check if the game is over and handle end conditions
function checkGameOver() {
    render();
    if (playerScore === pointToWin || computerScore === pointToWin) {
        gameOver = true; // Set game over state
        setTimeout(() => {
            ctx.clearRect(0, 0, cvs.width, cvs.height);
            // Display the result message
<<<<<<< HEAD
            ctx.font = "4rem Baloo";
            ctx.textAlign = "center";
            ctx.fillStyle = "black";
            const isPlayerWin = playerScore === pointToWin;
=======
            ctx.font = "3rem Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "black";
>>>>>>> eee6f507aa10f27f820fb0b7ebe83eea32056658
            const message = playerScore === pointToWin ? "You Win!" : "You Lose!";
            ctx.fillText(message, cvs.width / 2, cvs.height / 4 - 100);
            
            // Load and display the corresponding image
            const img = new Image();
            img.src = playerScore === pointToWin
                ? "Player_win.jpg"
                : "Player_lose.jpg";
            
            img.onload = () => {
                const imgX = cvs.width / 2 - 150; // Center the image
                const imgY = cvs.height / 2 - 200; // Place image below the text
                ctx.drawImage(img, imgX, imgY, 300, 400);
            };
<<<<<<< HEAD

            // Play the corresponding sound
            if (isPlayerWin) {
                winSound.currentTime = 0; // Reset sound to start
                winSound.play();
            } else {
                loseSound.currentTime = 0;
                loseSound.play();
            }

        }, 500);
        setTimeout(resetGame, 4000); // Reset game after 3 seconds
=======
        }, 1000);
        setTimeout(resetGame, 3000); // Reset game after 3 seconds
>>>>>>> eee6f507aa10f27f820fb0b7ebe83eea32056658
    } else {
        computerReactionTime = Math.max(500, computerReactionTime - 200);
        setTimeout(startNextTurn, 1000);
    }
}

// Reset the game to the initial state
function resetGame() {
    playerScore = 0;
    computerScore = 0;
<<<<<<< HEAD
    computerReactionTime = 1000;
=======
    computerReactionTime = 1300;
>>>>>>> eee6f507aa10f27f820fb0b7ebe83eea32056658
    isStarted = false;
    gameOver = false; // Reset game over state
    render();
}

// Shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Event listener for mouse clicks
document.addEventListener("mousedown", (e) => {
    if (gameOver) return; // Ignore clicks if game is over
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    if (!isStarted) {
        if (startButton.isClicked(mouseX, mouseY)) {
            isStarted = true;
            startNextTurn();
        }
    } else if (isInteractable && countdown === 0) {
        const selectedCard = cardsOnField.find(card => card.isPointInside(mouseX, mouseY));
        if (selectedCard) handlePlayerPick(selectedCard.value);
    }
});

// Update hover state based on mouse movement
document.addEventListener("mousemove", (e) => {
    if (gameOver) return; // Ignore mouse move if game is over
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    cardsOnField.forEach(card => {
        if (isInteractable) card.isHovered = card.isPointInside(mouseX, mouseY);
    });
    render();
});

// Initial render
render();