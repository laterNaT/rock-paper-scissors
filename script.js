function computerPlay() {
    const roundOutComeText = document.querySelector('.round-outcome-text > p');
    const thinkMessage = 'Hmm... let\'s see...';
    const plays = ["rock", "paper", "scissors"];
    const randomChoice = getRandomInt(0, 3);
    roundOutComeText.innerHTML = thinkMessage;
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(plays[randomChoice]);
        }, getRandomInt(500, 3000));
    });
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
    const roundOutComeText = document.querySelector('.round-outcome-text > p');
    const randomText = [
        'Dare you challenge me?',
        'Bring it on!',
        'How about a game of rock paper scissors?',
        'I\'m not rigged, I swear!'
    ]

    score.innerHTML = '0 vs 0';
    welcomeText.innerHTML = randomText[getRandomInt(0, randomText.length)];
    roundOutComeText.innerHTML = ' ';
}

function generateEmoji(name) {
    const btn = document.createElement('button');
    const span = document.createElement('span');
    btn.classList.add('btn2');
    btn.appendChild(span);
    switch (name) {
        case 'rock':
            span.innerHTML = '✊';
            return btn;
        case 'paper':
            span.innerHTML = '✋';
            return btn;
        case 'scissors':
            span.innerHTML = '✌️';
            return btn;
        default:
            return;
    }
}

function toggleButtons(toDisable) {
    const btns = document.querySelectorAll('.btn');
    btns.forEach((btn) => {
        btn.disabled = toDisable;
    })
}

function initialize() {
    const btns = document.querySelectorAll('.btn');
    const roundOutcome = document.querySelector('.round-outcome');
    const roundOutComeText = document.querySelector('.round-outcome-text > p');

    initializeText();

    btns.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
            if (!e.target.id) {
                return;
            }
            const exists = e.target.classList.toggle('wiggle');
            if (exists) {
                setTimeout(() => {
                    e.target.classList.toggle('wiggle');
                }, 2000);
            }
            const playerSelection = e.target.id;
            toggleButtons(true);
            const outcome = await playRound(playerSelection);
            roundOutcome.replaceChildren();
            roundOutcome.appendChild(generateEmoji(outcome['computerSelection']));
            roundOutComeText.innerHTML = 'You ' + outcome['outcome'] + '.';
            toggleButtons(false);
        })
    })
}

function endGame() {
    const btns = document.querySelectorAll('.btn');
    const gameOutCome = document.querySelector('.game-outcome > p');
    const roundOutCome = document.querySelector('.round-outcome');
    const roundOutComeText = document.querySelector('.round-outcome-text > p');

    btns.forEach((btn) => {
        btn.disabled = true;
        setTimeout(() => {
            btn.disabled = false;
        }, 3000);
    });

    setTimeout(() => {
        roundOutComeText.innerHTML = '';
        roundOutCome.replaceChildren();
        gameOutCome.innerHTML = '';
        roundOutCome.innerHTML = '';
        initializeText()
    }, 3000);
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
            toggleButtons(true);
            setTimeout(() => {
                playerScore = 0;
                computerScore = 0;
                toggleButtons(false);
                endGame();
            }, 2000);
        } else if (computerScore >= 5) {
            gameOutCome.innerHTML = 'You lost';
            toggleButtons(true);
            setTimeout(() => {
                playerScore = 0;
                computerScore = 0;
                toggleButtons(false);
                endGame();
            }, 2000);
        }
        score.innerHTML = `${playerScore} vs ${computerScore}`;
    }
})();

async function playRound(playerSelection) {
    const computerSelection = await computerPlay();
    console.log(`computerSelection: ${computerSelection}`);
    const outcome = calculateOutcome(playerSelection.toLowerCase(), computerSelection);
    if (outcome !== 'draw') {
        outcome === 'win' ? updateScore(true) : updateScore(false);
    }
    return {outcome, playerSelection, computerSelection};
}

window.onload = initialize();

export {calculateOutcome}
