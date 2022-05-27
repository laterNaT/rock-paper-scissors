function toggleButtons(toDisable) {
    const btns = document.querySelectorAll('.btn');
    btns.forEach((btn) => {
        btn.disabled = toDisable;
    })
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

export {toggleButtons, getRandomInt, initializeText, generateEmoji}