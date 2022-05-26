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

function initializeText() {
    const score = document.querySelector('.score > p');
    const welcomeText = document.querySelector('.round-outcome > p');
    const randomText = [
        'Dare you challenge me?',
        'Bring it on!',
        'How about a game of tic-tac-toe?',
        'I\'m not rigged, I swear!'
    ]

    score.innerHTML = '0 vs 0';
    welcomeText.innerHTML = randomText[getRandomInt(0, randomText.length)];
}

function initialize() {
    const btns = document.querySelectorAll('.btn');
    initializeText();

    btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const playerSelection = e.target.innerHTML;
            const outcome = playRound(playerSelection);
            const resultText = document.querySelector('.round-outcome > p');
            resultText.innerHTML = outcome;
        })
    })
}

function endGgame() {
    const btns = document.querySelectorAll('.btn');
    const gameOutCome = document.querySelector('.game-outcome > p');
    const roundOutCome = document.querySelector('.round-outcome > p');
    btns.forEach((btn) => {
        btn.disabled = true;
        setTimeout(() => {
            btn.disabled = false;
            gameOutCome.innerHTML = '';
            roundOutCome.innerHTML = '';
            initializeText();
        }, 3000);
    });
}

const updateScore = (function() {
    let playerScore = 0;
    let computerScore = 0;
    const gameOutCome = document.querySelector('.game-outcome > p');
    const score = document.querySelector('.score > p');

    return function(hasPlayerWon) {
        hasPlayerWon ? playerScore++ : computerScore++;
        if (playerScore >= 5) {
            gameOutCome.innerHTML = 'You won!';
            playerScore = 0;
            computerScore = 0;
            endGgame();
        } else if (computerScore >= 5) {
            gameOutCome.innerHTML = 'You lost!';
            playerScore = 0;
            computerScore = 0;
            endGgame();
        }
        score.innerHTML = `${playerScore} vs ${computerScore}`;
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

window.onload = initialize();

export {calculateOutcome}
