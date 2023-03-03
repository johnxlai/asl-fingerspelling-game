let existingPoint = Number(document.querySelector('.total-points').innerHTML);
const pointBtn = document.querySelector('.add-points');

pointBtn.addEventListener('click', addPoints);

function addPoints() {
  existingPoint += 1;
  console.log(existingPoint);
}

// we to get total points from user
// we need to add points to user when game finished
