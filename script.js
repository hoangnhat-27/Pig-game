'use strict';

// Selecting element
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//declaring help btn variables
const helpIconEl = document.querySelector('.help-icon');
const overlayEl = document.querySelector('.overlay');
const helpModalEl = document.querySelector('.help');
const closeIconEl = document.querySelector('.close-btn');

let scores, currentScore, activePlayer;

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;


    diceEl.classList.add('hidden');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    btnRoll.classList.remove('hidden');
    btnHold.classList.remove('hidden');
}

const switchPlayer = function () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}
const openCloseHelpBtn = () => {
    helpModalEl.classList.toggle('hidden');
    overlayEl.classList.toggle('hidden');
}
//help btn
helpIconEl.addEventListener('click', openCloseHelpBtn)
closeIconEl.addEventListener('click', openCloseHelpBtn)
overlayEl.addEventListener('click', openCloseHelpBtn)

//Initializing game
init();

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
    let diceNumber = Math.floor(Math.random() * 6) + 1;
    diceEl.src = `./img/dice-${diceNumber}.png`;
    diceEl.classList.remove('hidden');
    if (diceNumber !== 1) {
        //add to the current score
        currentScore += diceNumber;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        //switch to the next player
        switchPlayer();
    }
});
btnHold.addEventListener('click', function () {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 100) {
        document.getElementById(`name--${activePlayer}`).textContent = 'Winner!';
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector('.player--0').classList.remove('player--active');
        document.querySelector('.player--1').classList.remove('player--active');
        document.querySelector('.dice').classList.add('hidden');
        document.querySelector('.btn--roll').classList.add('hidden');
        document.querySelector('.btn--hold').classList.add('hidden');
    } else {
        switchPlayer();
    }
});
btnNew.addEventListener('click', function () {
    init();
    document.querySelector('#name--0').textContent = 'Player 1';
    document.querySelector('#name--1').textContent = 'Player 2';
});