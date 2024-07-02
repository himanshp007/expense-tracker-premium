window.addEventListener('DOMContentLoaded', () => {


    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', function(event) {
      event.preventDefault();
      handleSignup(event);
    })
  });
  
  
  
  
  function handleSignup(event) {
    const formData = event.target.elements;
    const signupData = {
      name: formData.name.value,
      email: formData.email.value,
      password: formData.password.value
    };
  
    console.log(signupData.name, signupData.email, signupData.password);
    
    axios.post('http://52.91.108.81/user/signup', signupData)
      .then(response => {
        window.location.href = 'http://52.91.108.81/expense/add-expense.html';
      })
      .catch(err => {
        console.log(err)
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
    document.getElementById('name').value = '';
};

