function toggleButtons(toDisable) {
  const btns = document.querySelectorAll('.btn');
  btns.forEach((btn) => {
    btn.disabled = toDisable;
  });
}

function generateEmoji(name) {
  const btn = document.createElement('button');
  const span = document.createElement('span');
  btn.classList.add('btn2');
  btn.appendChild(span);
  switch (name) {
    case 'rock':
      span.innerHTML = '✊';
      break;
    case 'paper':
      span.innerHTML = '✋';
      break;
    case 'scissors':
      span.innerHTML = '✌️';
      break;
    default:
      return btn;
  }
  return btn;
}

/*
Returns random integer between min (inclusive) and max (exclusive);
*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function initializeText() {
  const score = document.querySelector('.score > p');
  // const welcomeText = document.querySelector('.computer-selection > p');
  // const randomText = [
  //   'Dare you challenge me?',
  //   'Bring it on!',
  //   'How about a game of rock paper scissors?',
  //   'I\'m not rigged, I swear!',
  // ];

  score.innerHTML = '0 vs 0';
  // welcomeText.innerHTML = randomText[getRandomInt(0, randomText.length)];
}

export {
  toggleButtons,
  getRandomInt,
  initializeText,
  generateEmoji,
};
