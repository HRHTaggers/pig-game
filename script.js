'use strict';

let score0Element = document.getElementById('score--0');
let score1Element = document.getElementById('score--1');
let current0Element = document.getElementById('current--0');
let current1Element = document.getElementById('current--1');

let diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const background0Element = document.querySelector('.player--0');
const background1Element = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;

//STARTING CONDITIONS
const init = function () {
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    diceElement.classList.add('hidden');

    scores = [0, 0];

    currentScore = 0;
    activePlayer = 0;
    playing = true;

    document
      .querySelector(`.player--0`)
      .classList.remove("player--winner");
    document
      .querySelector(`.player--1`)
      .classList.remove("player--winner");
    document
      .querySelector(`.player--0`)
      .classList.add("player--active");
    document.
      querySelector(`.player--1`)
      .classList.remove("player--active");
}
//STARTING FUNCTION
init();

const switchPlayer = function () {
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    background0Element.classList.toggle("player--active");
    background1Element.classList.toggle("player--active");
}

//ROLLING THE DICE
btnRoll.addEventListener('click', function () {
    if (playing) {
        let dice = Math.trunc((Math.random() * 6) + 1);
        diceElement.classList.remove('hidden');
        diceElement.src = `/img/dice-${dice}.png`;
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            } else {
                switchPlayer();
            }
        }
    }
);

//HOLD THE SCORE
btnHold.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] > 20) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceElement.classList.add('hidden');
            } else {
                switchPlayer();
            }
        }
    }
);

//RESET GAME
btnNew.addEventListener('click', init);