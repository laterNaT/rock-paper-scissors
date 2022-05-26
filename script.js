function computerPlay() {
    const plays = ["rock", "paper", "scissors"];
    let randomChoice = getRandomInt(0, 3);
    return plays[randomChoice];
}

function calculateOutcome(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return "draw";
    } else if (playerSelection === "rock") {
        if (computerSelection === "paper") {
            return "lose";
        }
        return "win";
    } else if (playerSelection === "paper") {
        if (computerSelection === "scissors") {
            return "lose";
        }
        return "win";
    } else if (playerSelection === "scissors") {
        if (computerSelection === "rock") {
            return "lose";
        }
        return "win";
    }
}

function playRound(playerSelection, computerSelection) {
    const outcome = calculateOutcome(playerSelection.toLowerCase(), computerSelection);
    return `You ${outcome}, ${playerSelection.toLowerCase()} vs ${computerSelection}.`;
}

function game() {
    for (let i = 0; i < 5; i++) {
        let playerInput = prompt("Rock, paper, or scissors?");
        let computerSelection = computerPlay();
        console.log(playRound(playerInput, computerSelection));
    }
}

/*
Returns random integer between min (inclusive) and max (exclusive);
*/
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}