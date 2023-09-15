// generate a to z, 26 elements, Starts are Character Code at 65(uppercase A) 97 (lowercase) and give it 0 as index
let alphabetArray = Array.from({ length: 26 }, (_, index) =>
  String.fromCharCode(97 + index)
);

//randomize the array
alphabetArray.sort((a, b) => 0.5 - Math.random());

alphabetArray = ['a', 'b', 'c'];
//Selectors
const startBtn = document.querySelector('.start-practice');
const gameSection = document.querySelector('.game-section');
const img = document.querySelector('.question');
const gameForm = document.querySelector('.game-form');
const userInput = document.querySelector('.user-input');
const endGameEl = document.querySelector('.end-game');

// display first letter
function displayChar() {
  if (!alphabetArray.length) {
    endGame();
    return;
  }
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
  console.log(alphabetArray[0]);
  const message = alphabetArray[0] === userInput ? 'you got it' : 'try again';
  console.log(message);

  showNext();
}

// show result and add to tally

//end game
function endGame() {
  endGameEl.classList.remove('hidden');
  gameSection.classList.add('hidden');
}

// Add event listeners
startBtn.addEventListener('click', function () {
  this.classList.add('hidden');
  gameSection.classList.remove('hidden');

  displayChar();
  console.log(alphabetArray);
});

gameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  grabInput();
});
// start 30 secs count down
