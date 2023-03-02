const inputForm = document.getElementById('answer-input');

function getAnswer(e) {
  e.preventDefault();
  let answer = inputForm.getElementsByClassName('answer')[0].value;
  console.log(answer);
}

inputForm.addEventListener('submit', getAnswer);
