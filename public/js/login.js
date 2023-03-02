async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.getElementById('form2Example1').value.trim();
    const password = document.getElementById('form2Example2').value.trim();


    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.status === 404){
            document.getElementById('error').innerText = "User does not exist! Try to use other username or password"
        }

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }

}

document.getElementById('loginbtn').addEventListener('submit', loginFormHandler);

