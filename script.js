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

/*
Returns random integer between min (inclusive) and max (exclusive);
*/
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function initializeListeners() {
    const btns = document.querySelectorAll('.btn');
    btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const playerSelection = e.target.innerHTML;
            const outcome = playRound(playerSelection);
            const resultText = document.querySelector('.round-outcome > p');
            resultText.innerHTML = outcome;
        })
    })
}

const updateScore = (function() {
    let playerScore = 0;
    let computerScore = 0;
    const gameOutcome = document.querySelector('.game-outcome > p');

    return function(hasPlayerWon) {
        hasPlayerWon ? playerScore++ : computerScore++;
        gameOutcome.innerHTML = `${playerScore} vs ${computerScore}`;
        console.log(gameOutcome);
    }
})();

function playRound(playerSelection) {
    const computerSelection = computerPlay();
    const outcome = calculateOutcome(playerSelection.toLowerCase(), computerSelection);
    if (outcome !== 'draw') {
        outcome === 'win' ? updateScore(true) : updateScore(false);
    }
    return `You ${outcome}, ${playerSelection.toLowerCase()} vs ${computerSelection}.`;
}

window.onload = initializeListeners();

export {calculateOutcome}
