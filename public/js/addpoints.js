let existingPoint = Number(document.querySelector('.total-points').innerHTML);
const pointBtn = document.querySelector('.add-points');

pointBtn.addEventListener('click', addPoints);

function addPoints() {
  existingPoint += 1;
  console.log(existingPoint);
}
