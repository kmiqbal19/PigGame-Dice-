'use strict';
//----Grab the elements----
//---Buttons---
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
//---Other Elements---
//total score
const totalScore0El = document.getElementById('score--0');
const totalScore1El = document.getElementById('score--1');
//current score
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
//players
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
//Dice Image
const diceImage = document.querySelector('.dice');

//----Starting Settings-----
totalScore0El.textContent = 0;
totalScore1El.textContent = 0;
diceImage.classList.add('hidden');

//----Apply click events for button----
//-----Roll Dice------
let playing = true;
let totalScoreforActivePlayer = [0, 0];
let score = 0;
let activePlayer = 0;
//Function for switching player
const switchPlayer = function () {
  //Set the score to zero
  score = 0;
  //Set the current score of active player to zero
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //Switch the player by ternary operator
  activePlayer = activePlayer === 0 ? 1 : 0;
  //Switch Visual
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
//Rolling dice functionality:

btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generate the random dice number
    let diceRoll = Math.trunc(Math.random() * 6 + 1);
    // Add the number with score
    score += diceRoll;
    //Change the image according to dice number(Display Dice)
    diceImage.classList.remove('hidden');
    diceImage.src = `dice-${diceRoll}.png`;
    //Check for Rolled!
    if (diceRoll !== 1) {
      document.getElementById(`current--${activePlayer}`).textContent = score;
    } else {
      switchPlayer();
    }
  }
});

//-----Hold Button-----

btnHold.addEventListener('click', function () {
  //Add current score to active players score
  if (playing) {
    totalScoreforActivePlayer[activePlayer] += score;
    //Add to display
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScoreforActivePlayer[activePlayer];
    //Check if score >= 100
    if (totalScoreforActivePlayer[activePlayer] >= 40) {
      //Finish the game
      //Do it by defining state variable(boolean)
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceImage.classList.add('hidden');
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

//----New Game Button-----
btnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  playing = true;
  totalScore0El.textContent = 0;

  totalScore1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  playing = true;
  totalScoreforActivePlayer = [0, 0];
  score = 0;
  activePlayer = 0;
});
