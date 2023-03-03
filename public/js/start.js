//Selectors
const gameForm = document.getElementById('game-form');
const answerInput = document.getElementById('answer-input');
const pointsDisplay = document.getElementById('points-display');
let feedback = document.getElementById('feedback');
const questionNum = document.getElementById('question-num');
const questionsFrame = document.getElementById('question-frame');

const startGameBtn = document.querySelector('.start-game');

let gamePoints = 0;
// Define an object that maps each letter of the alphabet to an image filename
const letterImages = {
  a: 'image/alphabet/a.svg',
  b: 'image/alphabet/b.svg',
  c: 'image/alphabet/c.svg',
  d: 'image/alphabet/d.svg',
  e: 'image/alphabet/e.svg',
  f: 'image/alphabet/f.svg',
  g: 'image/alphabet/g.svg',
  h: 'image/alphabet/h.svg',
  i: 'image/alphabet/i.svg',
  j: 'image/alphabet/j.svg',
  k: 'image/alphabet/k.svg',
  l: 'image/alphabet/l.svg',
  m: 'image/alphabet/m.svg',
  n: 'image/alphabet/n.svg',
  o: 'image/alphabet/o.svg',
  p: 'image/alphabet/p.svg',
  q: 'image/alphabet/q.svg',
  r: 'image/alphabet/r.svg',
  s: 'image/alphabet/s.svg',
  t: 'image/alphabet/t.svg',
  u: 'image/alphabet/u.svg',
  v: 'image/alphabet/v.svg',
  w: 'image/alphabet/w.svg',
  x: 'image/alphabet/x.svg',
  y: 'image/alphabet/y.svg',
  z: 'image/alphabet/z.svg',
};

// Define an array of words to use for the game, with each word assigned a level
const words = [
  { word: 'love', level: 1 },
  { word: 'joke', level: 2 },
  { word: 'feel', level: 3 },
  // { word: 'Cook', level: 4 },
  // { word: 'baby', level: 5 },
];

// Define a variable to keep track of the current word index
let currentWordIndex = 0;

// Function to display a word and its letters
function displayWord(word) {
  // Split the word into an array of letters
  const letters = word.split('');

  // Loop through the letters array and set the src attribute of each image to the corresponding letter image
  for (let i = 0; i < letters.length; i++) {
    const image = document.getElementById('image-' + i);
    image.src = letterImages[letters[i].toLowerCase()];
    image.alt = 'letter ' + i;
  }
  // Increment the current word index (go to next question)

  // Update the level display
  // questionNum.textContent = words[currentWordIndex].level;
}

function startGame() {
  // Display the first word
  questionsFrame.classList.remove('hidden');
  displayWord(words[currentWordIndex].word);
}

function goToNextQuestion() {
  if (words.length - 1 === currentWordIndex) {
    endGame();
  } else {
    currentWordIndex++;
    displayWord(words[currentWordIndex].word);
  }
}
//end of game
function endGame() {
  feedback.textContent = `<h3>YOUR FINAL SCORE is ${gamePoints}</h3>`;
  console.log(`Final point ${gamePoints}`);
}

//Check the answer
function checkGuess(event) {
  event.preventDefault();
  // Get the user input value
  let userInput = answerInput.value.trim().toLowerCase();

  // Check if all words have been displayed END GAME

  // Check if the user input matches the current word
  let correct = userInput === words[currentWordIndex].word.toLowerCase();
  if (correct) {
    // Update game point and display point
    gamePoints += 10;
    pointsDisplay.textContent = gamePoints;

    // Clear the user input field
    answerInput.value = '';
    // When user is correct
    feedback.textContent = 'GOOD JOB YOU GOT IT RIGHT';
    goToNextQuestion();
  } else {
    // Clear the user input field
    answerInput.value = '';
    // Display an error message
    feedback.textContent = 'Incorrect. Try again!';
    goToNextQuestion();
  }
}

//ADDEVENTLISTENER
startGameBtn.addEventListener('click', startGame);
gameForm.addEventListener('submit', checkGuess);
