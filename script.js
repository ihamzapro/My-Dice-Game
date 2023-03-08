const player0E1 = document.querySelector(".player--0");
const player1E1 = document.querySelector(".player--1");
const score0E1 = document.querySelector("#score--0");
const score1E1 = document.getElementById("score--1");
const current0E1 = document.getElementById("current--0");
const current1E1 = document.getElementById("current--1");
const diceE1 = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//starting conditions

let score, currentScore, activePlayer, playing;

const init = function () {
  diceE1.classList.add("hidden");
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0E1.textContent = 0;
  score1E1.textContent = 0;
  current0E1.textContent = 0;
  current1E1.textContent = 0;
  player0E1.classList.remove("player--winner");
  player1E1.classList.remove("player--winner");
  player0E1.classList.add("player--active");
  player1E1.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0E1.classList.toggle("player--active");
  player1E1.classList.toggle("player--active");
};
//Rolling dice functionality

btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Display dice

    diceE1.classList.remove("hidden");
    diceE1.src = `dice-${dice}.png`;

    // Check for rolled 1: if true, switch to next player

    if (dice !== 1) {
      currentScore += dice;
      // current0E1.textContent = currentScore; //Change later
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    score[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    //Check if player's score is  >=100
    if (score[activePlayer] >= 20) {
      //Finish the game
      playing = false;
      diceE1.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

//Reload the game

btnNew.addEventListener("click", init);
