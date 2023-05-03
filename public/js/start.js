//Selectors
const gameForm = document.getElementById('game-form');
const answerInput = document.getElementById('answer-input');
const pointsDisplay = document.getElementById('points-display');
let feedback = document.getElementById('feedback');
// const questionNum = document.getElementById('question-num');
const questionsFrame = document.getElementById('question-frame');
const userExistingPts =
  document.querySelector('.user-existing-pts').innerHTML || 0;
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
  { word: 'Cook', level: 4 },
  { word: 'baby', level: 5 },
];

// Define a variable to keep track of the current word index
let currentWordIndex = 0;

// Function to display a word and its letters
function displayWord(word) {
  // Split the word into an array of letters
  const letters = word.split('');

  // Loop through the letters array and set the src attribute of each image to the corresponding lette r image
  for (let i = 0; i < letters.length; i++) {
    const image = document.getElementById('image-' + i);
    image.src = letterImages[letters[i].toLowerCase()];
    image.alt = 'letter ' + i;
  }

  // Update the level display
  // questionNum.textContent = currentWordIndex;
}

function startGame() {
  // Display the first word
  startGameBtn.classList.add('hidden');
  questionsFrame.classList.remove('hidden');
  answerInput.focus();
  displayWord(words[currentWordIndex].word);

  console.log(userExistingPts);
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
  feedback.textContent = `YOUR FINAL SCORE is ${gamePoints}`;
  console.log(`Final point ${gamePoints}`);
  fetchPoint(gamePoints, userExistingPts);
}

//Check the answer
function checkGuess(event) {
  event.preventDefault();
  // Get the user input value
  let userInput = answerInput.value.trim().toLowerCase();

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

///ADD FETCH to give user final game points and total points to route, to add back to model
async function fetchPoint(points, total_points) {
  const response = await fetch('/api/results/create', {
    method: 'POST',
    body: JSON.stringify({ points, total_points }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.status === 404) {
    document.getElementById('error').innerText =
      'User does not exist! Try to use other username or password';
  }
  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert(response.statusText);
  }
}
