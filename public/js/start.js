// Define an object that maps each letter of the alphabet to an image filename
      const letterImages = {
        'a': 'image/alphabet/a.svg',
        'b': 'image/alphabet/b.svg',
        'c': 'image/alphabet/c.svg',
        'd': 'image/alphabet/d.svg',
        'e': 'image/alphabet/e.svg',
        'f': 'image/alphabet/f.svg',
        'g': 'image/alphabet/g.svg',
        'h': 'image/alphabet/h.svg',
        'i': 'image/alphabet/i.svg',
        'j': 'image/alphabet/j.svg',
        'k': 'image/alphabet/k.svg',
        'l': 'image/alphabet/l.svg',
        'm': 'image/alphabet/m.svg',
        'n': 'image/alphabet/n.svg',
        'o': 'image/alphabet/o.svg',
        'p': 'image/alphabet/p.svg',
        'q': 'image/alphabet/q.svg',
        'r': 'image/alphabet/r.svg',
        's': 'image/alphabet/s.svg',
        't': 'image/alphabet/t.svg',
        'u': 'image/alphabet/u.svg',
        'v': 'image/alphabet/v.svg',
        'w': 'image/alphabet/w.svg',
        'x': 'image/alphabet/x.svg',
        'y': 'image/alphabet/y.svg',
        'z': 'image/alphabet/z.svg'
      };
      
      // Define an array of words to use for the game, with each word assigned a level
      const words = [
        { word: "love", level: 1 },
        { word: "joke", level: 2 },
        { word: "feel", level: 3 },
        { word: "Cook", level: 4 },
        { word: "baby", level: 5 }
      ];
      
      
// Define a variable to keep track of the current word index
let currentWordIndex = 0;

// Define a variable to keep track of the highest level completed
let highestLevelCompleted = 1;

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

  // Update the level display
  const levelDisplay = document.getElementById('level-display');
  levelDisplay.textContent = words[currentWordIndex].level;
}

// Display the first word
displayWord(words[currentWordIndex].word);

// Add an event listener to the form submit button
const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get the user input value
  const userInput = document.getElementById('input').value.trim().toLowerCase();

  // Check if the user input matches the current word
  if (userInput === words[currentWordIndex].word.toLowerCase()) {
    // Increment the current word index
    currentWordIndex++;

    // Check if all words have been displayed
    if (currentWordIndex >= words.length) {
      // Display a message and reset the current word index
      alert('You have completed all the words!');
      currentWordIndex = 0;
    }

    // Check if the current level is unlocked
    if (words[currentWordIndex].level <= highestLevelCompleted + 1) {
      // Display the next word
      displayWord(words[currentWordIndex].word);

      // Check if the current word is in level 1 and the user's answer is correct
      if (words[currentWordIndex].level === 1 && userInput === words[currentWordIndex].word.toLowerCase()) {
        // Unlock level 2 by setting the highestLevelCompleted variable to 1
        highestLevelCompleted = 1;
      }

      // Update the highest level completed if necessary
      if (words[currentWordIndex].level > highestLevelCompleted) {
        highestLevelCompleted = words[currentWordIndex].level;
      }

      // Update the points display
      const pointsDisplay = document.getElementById('points-display');
      pointsDisplay.textContent = parseInt(pointsDisplay.textContent) + 1;

      // Clear the feedback message
      const feedback = document.getElementById('feedback');
      feedback.textContent = '';
    } else {
      // Display an error message
      const feedback = document.getElementById('feedback');
      feedback.textContent = 'Level ' + words[currentWordIndex].level + ' is locked. Complete level ' + (words[currentWordIndex].level - 1) + ' first.';
    }
  } else {
    // Display an error message
    const feedback = document.getElementById('feedback');
    feedback.textContent = 'Incorrect. Try again. guess right to unlock next level';
  }

  // Clear the user input field
  const input = document.getElementById('input');
  input.value = '';
});

