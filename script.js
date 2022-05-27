import {
  getRandomInt,
  generateEmoji,
  initializeText,
  toggleButtons,
} from './helpers.js';

function computerPlay() {
  const roundOutComeText = document.querySelector('.round-outcome-text > p');
  const thinkMessage = 'Hmm... let\'s see...';
  const plays = ['rock', 'paper', 'scissors'];
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
    return 'draw';
  }

  if (playerSelection === 'rock') {
    if (computerSelection === 'paper') {
      return 'lose';
    }
    return 'win';
  }

  if (playerSelection === 'paper') {
    if (computerSelection === 'scissors') {
      return 'lose';
    }
    return 'win';
  }

  if (playerSelection === 'scissors') {
    if (computerSelection === 'rock') {
      return 'lose';
    }
    return 'win';
  }
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
      roundOutcome.appendChild(generateEmoji(outcome.computerSelection));
      roundOutComeText.innerHTML = `You ${outcome.outcome}.`;
      toggleButtons(false);
    });
  });
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
    initializeText();
  }, 3000);
}

const updateScore = (function () {
  let playerScore = 0;
  let computerScore = 0;
  const gameOutCome = document.querySelector('.game-outcome > p');
  const score = document.querySelector('.score > p');

  return function(hasPlayerWon) {
    hasPlayerWon ? playerScore += 1 : computerScore += 1;
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
  };
})();

async function playRound(playerSelection) {
  const computerSelection = await computerPlay();
  const outcome = calculateOutcome(playerSelection.toLowerCase(), computerSelection);
  if (outcome !== 'draw') {
    outcome === 'win' ? updateScore(true) : updateScore(false);
  }
  return { outcome, playerSelection, computerSelection };
}

window.onload = initialize();

export { calculateOutcome };
