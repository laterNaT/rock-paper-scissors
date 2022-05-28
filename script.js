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
    }, getRandomInt(500, 1000));
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
  const computerSelection = document.querySelector('.computer-selection');
  const roundOutComeText = document.querySelector('.round-outcome-text > p');
  const startGameBtn = document.querySelector('.play-btn');
  startGameBtn.addEventListener('click', (e) => {
    e.target.style.visibility = 'hidden';
    btns.forEach((btn) => {
      btn.style.visibility = 'initial';
    });
  }, { once: true });

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
      computerSelection.replaceChildren();
      computerSelection.appendChild(generateEmoji(outcome.computerSelection));
      roundOutComeText.innerHTML = `You ${outcome.outcome}.`;
      toggleButtons(false);
    });
  });
}

function restartGame() {
  const btns = document.querySelectorAll('.btn');
  const score = document.querySelector('.score > p');
  const computerSelection = document.querySelector('.computer-selection');
  const roundOutComeText = document.querySelector('.round-outcome-text > p');

  roundOutComeText.style.visibility = 'initial';
  roundOutComeText.innerHTML = '';
  btns.forEach((btn) => {
    btn.style.visibility = 'initial';
  });
  score.innerHTML = '0 vs 0';
  computerSelection.replaceChildren();
}

function endGame() {
  const gameOutCome = document.querySelector('.game-outcome > p');
  const roundOutComeText = document.querySelector('.round-outcome-text > p');
  const btns = document.querySelectorAll('.btn');
  const startGameBtn = document.querySelector('.play-btn');

  // Text is set in button click callback so
  // hide the text and restore visibility in restartGame
  roundOutComeText.style.visibility = 'hidden';

  btns.forEach((btn) => {
    btn.style.visibility = 'hidden';
  });

  startGameBtn.addEventListener('click', (e) => {
    gameOutCome.innerHTML = '';
    e.target.style.visibility = 'hidden';
    restartGame();
  }, { once: true });
}

const updateScore = (function initUpdateScore() {
  let playerScore = 0;
  let computerScore = 0;
  const gameOutCome = document.querySelector('.game-outcome > p');
  const score = document.querySelector('.score > p');
  const startGameBtn = document.querySelector('.play-btn');

  return (hasPlayerWon) => {
    if (hasPlayerWon) {
      playerScore += 1;
    } else {
      computerScore += 1;
    }
    score.innerHTML = `${playerScore} vs ${computerScore}`;
    if (playerScore >= 5) {
      gameOutCome.innerHTML = 'You won!';
      playerScore = 0;
      computerScore = 0;
      startGameBtn.innerHTML = 'Play again?';
      startGameBtn.style.visibility = 'initial';
      endGame();
    } else if (computerScore >= 5) {
      gameOutCome.innerHTML = 'You lost';
      playerScore = 0;
      computerScore = 0;
      startGameBtn.innerHTML = 'Play again?';
      startGameBtn.style.visibility = 'initial';
      endGame();
    }
  };
}());

async function playRound(playerSelection) {
  const computerSelection = await computerPlay();
  const outcome = calculateOutcome(playerSelection.toLowerCase(), computerSelection);

  if (outcome === 'win') {
    updateScore(true);
  } else if (outcome === 'lose') {
    updateScore(false);
  }

  return { outcome, playerSelection, computerSelection };
}

window.onload = initialize();

export { calculateOutcome };
