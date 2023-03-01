const inputForm = document.getElementById('answer-input');
console.log(inputForm);

function getAnswer(e) {
  const inputAnswer = document.querySelector('.answer-input');
  e.preventDefault();
  console.log('test');
}

inputForm.addEventListener('submit', getAnswer);
