window.addEventListener('DOMContentLoaded', ()=> {

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        handleLogin(event);
    })


    const forgotBtn = document.getElementById('forgot');
    forgotBtn.addEventListener('click', function(event) {
        window.location.href = '../views/password-reset.html';
    })

});



function handleLogin(event) {

    const formData = event.target.elements;
    const loginData = {
        email: formData.email.value,
        password: formData.password.value
    }

    resetForm();

    axios.post('http://54.163.4.78:3000/user/login', loginData)
        .then(response => {
            localStorage.setItem('token', response.data.token);
            window.location.href = 'http://54.163.4.78:3000/expense/add-expense.html';
        })
        .catch(err => {
            displayMessage(err.response.data.message);
        });
}



function displayMessage(message, status=null) {
    const h4 = document.getElementById('message');

    let color = 'red'
    if (status === 200) {
        color = 'green'
    }
    h4.innerHTML = message;
    h4.style.color = color
};



function resetForm(){
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
};
