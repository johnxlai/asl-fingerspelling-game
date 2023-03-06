const is_superuser = document.getElementById('superuser');

if (JSON.parse(is_superuser.innerText)) {
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

is_superuser.style.display = 'none';
