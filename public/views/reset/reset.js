window.addEventListener('DOMContentLoaded', ()=> {


    const resetPassForm = document.getElementById('resetPassForm');
    resetPassForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        handlePasswordReset(event);
    })

});



function handlePasswordReset(event) {

    const formData = event.target.elements;
    const resetData = {
        email: formData.email.value,
    }

    resetForm();

    axios.post('http://16.171.53.53:3000/password/forgotpassword', resetData)
        .then(response => {
            console.log(response)
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
    
};

