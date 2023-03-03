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
    
    let currentScore = 0;
    let currentLevel = 1;
    const maxLevel = 5; // set the maximum level
    
    // Initialize the flags for each level
let level1_unlocked = true;
let level2_unlocked = false;
let level3_unlocked = false;
let level4_unlocked = false;
let level5_unlocked = false;

// Define a function to check if a level is unlocked
function is_level_unlocked(level) {
  if (level === 1) {
    return level1_unlocked;
  } else if (level === 2) {
    return level2_unlocked;
  } else if (level === 3) {
    return level3_unlocked;
  } else if (level === 4) {
    return level4_unlocked;
  } else if (level === 5) {
    return level5_unlocked;
  } else {
    return false;
  }
}

// Define a function to unlock the next level
function unlock_next_level(level) {
  if (level === 1) {
    level2_unlocked = true;
  } else if (level === 2) {
    level3_unlocked = true;
  } else if (level === 3) {
    level4_unlocked = true;
  } else if (level === 4) {
    level5_unlocked = true;
  }
} else if (level === 5) {
    level5_unlocked = true;
  }

// Example usage
if (is_level_unlocked(1)) {
  // Play level 1
  unlock_next_level(1);
}
if (is_level_unlocked(2)) {
  // Play level 2
  unlock_next_level(2);
}
// And so on for the other levels...

    
    function getRandomWord() {
      const filteredWords = words.filter(wordObj => wordObj.level === currentLevel);
      const randomIndex = Math.floor(Math.random() * filteredWords.length);
      return filteredWords[randomIndex].word;
    }
    
    function updateScoreAndLevel() {
      document.getElementById("score").textContent = currentScore;
      document.getElementById("level-display").textContent = currentLevel;
    }
    
    function updateLetterImages() {
      const word = getRandomWord();
      for (let i = 0; i < word.length; i++) {
        const letter = word[i];
        const imageSrc = letterImages[letter];
        document.getElementById(`image-${i}`).src = imageSrc;
      }
    }
    
    function unlockNextLevel() {
      if (currentLevel < maxLevel && currentScore >= currentLevel * 2) {
        currentLevel++;
        updateScoreAndLevel();
      }
    }
    
    function handleFormSubmit(event) {
      event.preventDefault();
    
      const currentWord = getRandomWord(); // get the current word
      const userAnswer = document.getElementById("input").value.toLowerCase();
      const feedback = document.getElementById("feedback");
    
      if (userAnswer === currentWord) { // check if the user's answer is correct
        currentScore = currentScore + 1; // increment the score
        updateLetterImages(); // update the letter images
        unlockNextLevel(); // check if the player has unlocked the next level
        updateScoreAndLevel(); // update the score and level
        feedback.textContent = "Correct!"; // display a message to the user that the answer is correct
      } else {
        feedback.textContent = "Incorrect!"; // display a message to the user that the answer is incorrect
      }
    
      // clear the input field and prepare for the next word
      document.getElementById("input").value = "";
    
      // wait for 1 second before proceeding to the next word
      setTimeout(() => {
        feedback.textContent = "";
        // generate a new random word and display it to the user
        const newWord = getRandomWord();
        // you can display the new word here or in another function
      }, 1000);
    }
    
    const feedback = document.getElementById("feedback");
    
    const feedbackElement = document.getElementById("feedback");
    if (feedbackElement !== null) {
      feedbackElement.textContent = "Correct!";
    } else {
      // Handle the case where the element does not exist
    }
    
    
    
    function goToNextLevel() {
      // Check if the player has reached the maximum level
      if (currentLevel >= maxLevel) {
        // Display a message to the player that they have won the game
        alert("Congratulations, you have completed all levels!");
      } else {
        // Update the current level and generate a new random word
        currentLevel++;
        const newWord = getRandomWord();
        // Update the UI to reflect the new level and word
        updateScoreAndLevel();
        updateLetterImages();
        document.getElementById("input").value = "";
        // Display the new word to the user
        document.getElementById("word-display").textContent = newWord;
      }
    }
    
    
    updateScoreAndLevel();
    updateLetterImages();
    
    document.getElementById("form").addEventListener("submit", handleFormSubmit);