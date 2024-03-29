//Selectors
let alphabetArray = [];
const startBtn = document.querySelector('.start-practice');
const gameSection = document.querySelector('.game-section');
const img = document.querySelector('.question');
const gameForm = document.querySelector('.game-form');
const userInput = document.querySelector('.user-input');
const endGameEl = document.querySelector('.end-game');
const feedback = document.querySelector('.feedback');
const totalPoints = document.querySelector('.total-points');
const restartBtn = document.querySelector('.restart');
let correct = 0,
  wrong = 0;

//Start Game, create alphabet and randomize
function startGame() {
  endGameEl.classList.add('hidden');
  gameSection.classList.remove('hidden');
  totalPoints.innerHTML = '';

  // generate a to z, 26 elements, Starts are Character Code at 65(uppercase A) 97 (lowercase) and give it 0 as index
  alphabetArray = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(97 + index)
  );

  //randomize the array
  alphabetArray.sort((a, b) => 0.5 - Math.random());

  //reset points
  correct = 0;
  wrong = 0;

  displayChar();
}

// display first letter
function displayChar() {
  if (!alphabetArray.length) {
    endGame();
    return;
  }
  //localhost:3002/image/alphabet/s.svg
  img.src = `image/alphabet/${alphabetArray[0]}.svg`;
}

// show the next question
function showNext() {
  //remove old letter and show next question
  alphabetArray.shift();
  displayChar();
}

// input listen to event for correct or wrong answer
function grabInput() {
  const answer = userInput.value.toLowerCase();
  userInput.value = '';

  //send for comparison
  compareAnswer(answer);
}

// compare answer
function compareAnswer(userInput) {
  let result = alphabetArray[0] === userInput;

  //Add point
  result ? correct++ : wrong++;

  //Show message
  let message = result ? 'Nice, you got it' : 'Oops, try again';
  feedback.innerHTML = `<p>${message}</p>`;
  totalPoints.innerHTML = `<p>Correct: ${correct}, Wrong: ${wrong}</p>`;

  showNext();
}

//end game
function endGame() {
  endGameEl.classList.remove('hidden');
  gameSection.classList.add('hidden');
  feedback.innerHTML = '';
}

// Add event listeners
startBtn.addEventListener('click', function () {
  this.classList.add('hidden');
  gameSection.classList.remove('hidden');

  startGame();
});

restartBtn.addEventListener('click', startGame);

gameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  grabInput();
});
