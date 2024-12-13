// const cvs = document.createElement("canvas");
// cvs.width = window.innerWidth;
// cvs.height = window.innerHeight;
// document.getElementById('container').appendChild(cvs);
// const ctx = cvs.getContext("2d");
// let number_of_dices_of_player = 0;
// let number_of_dices_of_computer = 0;
// const maxDices = 3;
// let playerDices = [];
// let computerDices = [];
// let goal_number = 0;
// let isInteractable = false; // The player cannot interact

// class Dice {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.width = 100;
//         this.height = 100;
//         this.fillColor = "white";
//         this.value = this.roll();
//     }
//     roll() {
//         return Math.floor(Math.random() * 6) + 1;
//     }
//     draw(ctx) {
//         ctx.clearRect(this.x, this.y, this.width, this.height);
//         ctx.strokeRect(this.x, this.y, this.width, this.height);
//         ctx.fillStyle = this.fillColor;
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//         ctx.font = "1.5rem Arial";  // Changed to rem for flexibility
//         ctx.textAlign = "center";
//         ctx.textBaseline = "middle";
//         ctx.fillStyle = "black"; // Màu chữ
//         ctx.fillText(
//             this.value,
//             this.x + this.width / 2,
//             this.y + this.height / 2
//         );
//     }
// }

// class Button {
//     constructor(x, y, radius, label, onClick) {
//         this.x = x;
//         this.y = y;
//         this.radius = radius;
//         this.label = label;
//         this.onClick = onClick;
//         this.initEventListeners();
//     }
//     draw(ctx) {
//         ctx.beginPath();
//         ctx.fillStyle = "rgba(0, 255, 0, 0.7)";
//         ctx.strokeStyle = "black";
//         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
//         ctx.fill();
//         ctx.stroke();
//         ctx.font = "1rem Arial"; // Changed to rem for flexibility
//         ctx.textAlign = "center";
//         ctx.textBaseline = "middle";
//         ctx.fillStyle = "black";
//         ctx.fillText(this.label, this.x, this.y);
//     }
//     initEventListeners() {
//         window.addEventListener("mousedown", (e) => {
//             const dx = this.x - e.clientX;
//             const dy = this.y - e.clientY;
//             const isClicked = Math.sqrt(dx * dx + dy * dy) < this.radius;
//             if (isClicked && isInteractable) this.onClick();
//         });
//     }
// }

// function rollAllDices(dices) {
//     dices.forEach((dice) => {
//         dice.value = dice.roll();
//         dice.draw(ctx);
//     });
// }

// function compare(computer_value, player_value, goal_number) {
//     const computerDiff = Math.abs(computer_value - goal_number);
//     const playerDiff = Math.abs(player_value - goal_number);
//     if (computerDiff < playerDiff) return "Computer Won!";
//     if (computerDiff === playerDiff) return "Draw!";
//     return "You Won!";
// }

// function render(showButtons = false) {
//     ctx.clearRect(0, 0, cvs.width, cvs.height);

//     // Display game rules
//     let rule_bottom = 50;
//     ctx.font = "2rem Arial";  // Changed to rem for flexibility
//     ctx.textAlign = "center";
//     ctx.fillText(`If your result is closer to the goal than computer's, you win!`, cvs.width / 2, rule_bottom);

//     // Display target number (goal_number)
//     ctx.font = "2rem Arial";  // Changed to rem for flexibility
//     ctx.textAlign = "center";
//     ctx.fillText(`Goal: ${goal_number}`, cvs.width / 2, rule_bottom + 50);

//     // Draw buttons if showButtons is true
//     if (showButtons) {
//         // Display instructions
//         ctx.font = "2rem Arial";  // Changed to rem for flexibility
//         ctx.textAlign = "center";
//         ctx.fillText(`Select number of dices you want to use:`, cvs.width / 2, cvs.height - 200);
//         for (let i = 1; i <= maxDices; i++) {
//             new Button(
//                 (cvs.width / (maxDices + 1)) * i,
//                 cvs.height - 100,
//                 50,
//                 `${i} Dice(s)`,
//                 () => {
//                     if (isInteractable = false) return; // Only handle if interactable is enabled
//                     number_of_dices_of_player = i;
//                     isInteractable = false; // Disable interaction after player selects
//                     render(false); // Hide buttons and instruction for better visual experience
//                     startPlayerGame();
//                 }
//             ).draw(ctx);
//         }
//         // Enable `isInteractable` state after buttons are drawn
//         isInteractable = true;
//     }
// }

// function startGame() {
//     // Set a random value for goal_number
//     goal_number = Math.floor(Math.random() * 18) + 1;

//     // Display goal_number initially
//     render(false);

//     // After 1 second, display the buttons
//     setTimeout(() => {
//         render(true);
//     }, 1000);

//     // Determine the number of dices for the computer
//     number_of_dices_of_computer = goal_number < 8 ? 1 : goal_number < 14 ? 2 : 3;

//     // Create computer's dices
//     computerDices = Array.from({ length: number_of_dices_of_computer }, (_, i) =>
//         new Dice(50 + i * 120, cvs.height / 2 - 150)
//     );
// }

// function startPlayerGame() {
//     // Create player's dices based on their selection
//     playerDices = [];
//     for (let i = 0; i < number_of_dices_of_player; i++) {
//         // Create a new Dice object for each dice and push it into the playerDices array
//         playerDices.push(new Dice(50 + i * 120, cvs.height / 2));
//     }

//     // Roll dices
//     rollAllDices(playerDices);
//     rollAllDices(computerDices);

//     // Calculate the total score for the player
//     let playerSum = 0;
//     playerDices.forEach((dice) => {
//         playerSum += dice.value; // Add each dice's value to playerSum
//     });

//     // Calculate the total score for the computer
//     let computerSum = 0;
//     computerDices.forEach((dice) => {
//         computerSum += dice.value; // Add each dice's value to computerSum
//     });

//     // Display the result
//     const result = compare(computerSum, playerSum, goal_number);

//     // Display player's result
//     ctx.fillStyle = "black";
//     ctx.fillText(`You : ${playerSum}`, 500, cvs.height / 2 + 50);

//     // Display computer's result
//     ctx.fillStyle = "black";
//     ctx.fillText(`Computer : ${computerSum}`, 500, cvs.height / 2 - 100);

//     // Display the new result
//     ctx.fillStyle = "black";
//     ctx.fillText(result, cvs.width / 2, cvs.height / 2);

//     // Reset the game after 3 seconds
//     setTimeout(() => {
//         startGame();
//     }, 3000);
// }

// startGame();

const cvs = document.createElement("canvas");
cvs.width = window.innerWidth;
cvs.height = window.innerHeight;
document.body.appendChild(cvs);
const ctx = cvs.getContext("2d");

let number_of_dices_of_player = 0;
let number_of_dices_of_computer = 0;
const maxDices = 3;
let playerDices = [];
let computerDices = [];
let goal_number = 0;
let isInteractable = false; // The player cannot interact

class Dice {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.fillColor = "white";
        this.value = this.roll();
    }

    roll() {
        return Math.floor(Math.random() * 6) + 1;
    }

    draw(ctx) {
        ctx.clearRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.font = "1.5rem Arial";  
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "black"; 
        ctx.fillText(
            this.value,
            this.x + this.width / 2,
            this.y + this.height / 2
        );
    }
}

class Button {
    constructor(x, y, radius, label, onClick) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.label = label;
        this.onClick = onClick;
        this.initEventListeners();
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "rgb(0, 255, 0)";
        ctx.strokeStyle = "black";
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.font = "1rem Arial"; 
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "black";
        ctx.fillText(this.label, this.x, this.y);
    }

    initEventListeners() {
        window.addEventListener("mousedown", (e) => {
            const dx = this.x - e.clientX;
            const dy = this.y - e.clientY;
            const isClicked = Math.sqrt(dx * dx + dy * dy) < this.radius;
            if (isClicked && isInteractable) this.onClick();
        });
    }
}

function rollAllDices(dices) {
    dices.forEach((dice) => {
        dice.value = dice.roll();
        dice.draw(ctx);
    });
}

function compare(computer_value, player_value, goal_number) {
    const computerDiff = Math.abs(computer_value - goal_number);
    const playerDiff = Math.abs(player_value - goal_number);
    if (computerDiff < playerDiff) return "Computer Won!";
    if (computerDiff === playerDiff) return "Draw!";
    return "You Won!";
}

function render(showButtons = false) {
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    // Display game rules
    let ruleDiv = document.createElement('div');
    ruleDiv.classList.add('game-rule');
    ruleDiv.textContent = 'If your result is closer to the goal than computer\'s, you win!';
    document.body.appendChild(ruleDiv);

    // Display goal number
    let goalDiv = document.createElement('div');
    goalDiv.classList.add('goal-number');
    goalDiv.textContent = `Goal: ${goal_number}`;
    document.body.appendChild(goalDiv);

    // Xóa dòng chữ hướng dẫn nếu nó đã tồn tại trước đó
    let buttonTextDiv = document.querySelector('.button-instruction');
    if (buttonTextDiv) {
        buttonTextDiv.remove(); // Xóa dòng chữ hướng dẫn
    }

    // Draw buttons if showButtons is true
    if (showButtons) {
        buttonTextDiv = document.createElement('div');
        buttonTextDiv.classList.add('button-instruction');
        buttonTextDiv.textContent = `Select number of dices you want to use:`;
        document.body.appendChild(buttonTextDiv);
        
        for (let i = 1; i <= maxDices; i++) {
            new Button(
                (cvs.width / (maxDices + 1)) * i,
                cvs.height - 100,
                50,
                `${i} Dice(s)`,
                () => {
                    if (isInteractable === false) return; 
                    number_of_dices_of_player = i;
                    isInteractable = false; 
                    render(false);  // Vẽ lại mà không có nút và dòng chữ
                    startPlayerGame();
                }
            ).draw(ctx);
        }

        isInteractable = true; 
    }
}


function startGame() {
    goal_number = Math.floor(Math.random() * 18) + 1;
    render(false);

    setTimeout(() => {
        render(true);
    }, 1000);

    number_of_dices_of_computer = goal_number < 8 ? 1 : goal_number < 14 ? 2 : 3;

    computerDices = Array.from({ length: number_of_dices_of_computer }, (_, i) =>
        new Dice(50 + i * 120, cvs.height / 2 - 150)
    );
}

function startPlayerGame() {
    playerDices = [];
    for (let i = 0; i < number_of_dices_of_player; i++) {
        playerDices.push(new Dice(50 + i * 120, cvs.height / 2));
    }

    rollAllDices(playerDices);
    rollAllDices(computerDices);

    let playerSum = 0;
    playerDices.forEach((dice) => {
        playerSum += dice.value;
    });

    let computerSum = 0;
    computerDices.forEach((dice) => {
        computerSum += dice.value;
    });

    const result = compare(computerSum, playerSum, goal_number);

    // Tạo divs cho "You" và "Computer" ở vị trí tương ứng với xúc xắc
    let playerDiv = document.createElement('div');
    playerDiv.classList.add('game-result');
    playerDiv.innerHTML = `You: ${playerSum}`;
    playerDiv.style.left = '500px';
    playerDiv.style.top = `${cvs.height / 2 + 50}px`;
    document.body.appendChild(playerDiv);

    let computerDiv = document.createElement('div');
    computerDiv.classList.add('game-result');
    computerDiv.innerHTML = `Computer: ${computerSum}`;
    computerDiv.style.left = '500px';
    computerDiv.style.top = `${cvs.height / 2 - 100}px`;
    document.body.appendChild(computerDiv);

    // Tạo div cho kết quả, căn giữa màn hình
    let resultDiv = document.createElement('div');
    resultDiv.classList.add('game-result');
    resultDiv.innerHTML = result;
    resultDiv.style.left = `${cvs.width / 2 - resultDiv.offsetWidth / 2}px`;
    resultDiv.style.top = `${cvs.height / 2}px`;
    document.body.appendChild(resultDiv);

    // Xóa kết quả sau 3 giây và bắt đầu lại game
    setTimeout(() => {
        startGame();
        playerDiv.remove();
        computerDiv.remove();
        resultDiv.remove();
    }, 3000);
}


startGame();
