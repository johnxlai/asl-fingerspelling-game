// generate a to z, 26 elements, Starts are Character Code at 65(uppercase A) 97 (lowercase) and give it 0 as index
const alphabetArray = Array.from({ length: 26 }, (_, index) =>
  String.fromCharCode(97 + index)
);

//randomize the array
alphabetArray.sort((a, b) => 0.5 - Math.random());

//Selectors
const startBtn = document.querySelector('.start-practice');
const gameSection = document.querySelector('.game-section');
const img = document.querySelector('.question');
const gameForm = document.querySelector('.game-form');
const userInput = document.querySelector('.user-input');

// display first letter
function displayChar() {
  img.src = `image/alphabet/${alphabetArray[0]}.svg`;
  console.log(alphabetArray);
}

//Loop thru array, pop item once it has been displayed
for (let i = 0; i < alphabetArray.length; i++) {
  alphabetArray.shift();
  console.log(alphabetArray[i]);
}

// input listen to event for correct or wrong answer
function grabInput() {
  const answer = userInput.value.toLowerCase();
  userInput.value = '';
}

// start button initialiate game start
// Add event listeners
startBtn.addEventListener('click', function () {
  this.classList.add('hidden');
  gameSection.classList.remove('hidden');
  displayChar();
});

gameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  grabInput();
});
// start 30 secs count down
