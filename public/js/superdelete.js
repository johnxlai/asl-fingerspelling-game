let is_superuser = document.getElementById('superuser');
console.log(is_superuser);
if (is_superuser === 'false') {
  is_superuser = false;
} else {
  is_superuser = true;
}

if (is_superuser.innerText) {
  const removeButtons = document.querySelectorAll('.remove');
  for (button of removeButtons) {
    button.innerText = 'Remove User';
  }
} else {
  const removeButtons = document.querySelectorAll('.remove');
  for (button of removeButtons) {
    button.style.display = 'none';
  }
}
if (is_superuser) {
  is_superuser.style.display = 'none';
}
