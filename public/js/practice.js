// generate a to z, 26 elements, Starts are Character Code at 65(uppercase A) 97 (lowercase) and give it 0 as index
const alphabetArray = Array.from({ length: 26 }, (_, index) =>
  String.fromCharCode(97 + index)
);

//randomize the array
alphabetArray.sort((a, b) => 0.5 - Math.random());

//Selectors
const startBtn = document.querySelector('.start-practice');
const gameSection = document.querySelector('.game-section');

// Add event listeners
startBtn.addEventListener('click', function () {
  this.classList.add('hidden');
  gameSection.classList.remove('hidden');
});

// start button initialiate game start

// start 30 secs count down

// display first letter

// input listen to event for correct or wrong answer

// from a to z
