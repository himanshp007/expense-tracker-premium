window.addEventListener('DOMContentLoaded', ()=> {

    const addExpenseForm = document.getElementById('addExpenseForm');
    addExpenseForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        handleAddExpense(event);
    })


    const token = localStorage.getItem('token')

    axios.get('http://54.163.4.78:3000/expense/get-expense', {headers: {'Authorization': token}})
        .then( (response) => { 
            if (response.data.premiumuserCheck) {
                const button = document.getElementById('rzrpay-btn');
                
                if (button) {
                    button.remove();
                    premiumUser();
                }
            }
            displayExpenses();
        })
        .catch(err => console.log(err))

});



function handleAddExpense(event) {

    const formData = event.target.elements;

    const expenseData = {
        amount: formData.amount.value,
        description: formData.description.value,
        category: formData.category.value,
    }

    resetForm();

    const token = localStorage.getItem('token')
    axios.post('http://54.163.4.78:3000/expense/add-expense',expenseData, {headers: {'Authorization': token}})
        .then(response => {
            displayExpenses();
        })
        .catch(err => {
            displayMessage(err.response.data.message);
        });
}





function displayExpenses() {
    const token = localStorage.getItem('token')
    axios.get('http://54.163.4.78:3000/expense/get-expense', { headers: { 'Authorization': token }})
        .then(response => { 

            const allItems = document.querySelector('ul');
            allItems.innerHTML = "";

            const data = response.data.result;

            data.forEach(item => {
                const listItem = createFront(item, token); 
                allItems.appendChild(listItem);
            })
        })
        .catch(err => console.log(err))
}

function createFront(item, token) {
    const listItem = document.createElement('li');
    const p = document.createElement('p');
    p.innerHTML = `${item.amount} - ${item.description} - ${item.category}`;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete'

    deleteBtn.addEventListener('click', async () => {
        try {
            await axios.delete(`http://54.163.4.78:3000/expense/delete-expense/${item.id}`, { headers: { 'Authorization': token }});
            displayExpenses();
        } catch (err) {
            console.log(err);
        }
    });

    p.appendChild(deleteBtn);
    listItem.appendChild(p);

    return listItem;
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

    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value = '';

    
};

document.getElementById('rzrpay-btn').onclick = async function(event) {
    console.log("print")
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://54.163.4.78:3000/purchase/premiummembership`, {headers: {"Authorization": token}});

    var options = {
        'key': response.data.key_id,
        'order_id': response.data.order.id,

        'handler': async function (response) {
            await axios.post(`http://54.163.4.78:3000/purchase/updatetransactionstatus`, {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            }, {headers: {'Authorization': token}})

            const button = document.getElementById('rzrpay-btn');
            button.remove();

            alert("You are premium user now")

            premiumUser();
        },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
    event.preventDefault();

    rzp1.on('payment.failed', function(response) {
        console.log(response);
        alert("Something went wrong");
    })
}


function premiumUser() {
    const premiumDiv = document.getElementsByClassName('premium-user')[0];
    const headingElement = document.createElement('h4');
    headingElement.innerHTML = "You are a Premium User";
    const leaderBtn = document.createElement('button');
    leaderBtn.textContent = "Show Leaderboard";
    leaderBtn.id = 'leaderbtn'
    const dwnbutton = document.createElement("button")
    dwnbutton.id = 'download-data'
    dwnbutton.innerHTML = 'Show Expenses';
    headingElement.appendChild(leaderBtn);
    headingElement.appendChild(dwnbutton);
    premiumDiv.appendChild(headingElement);

    leaderBtn.onclick = async function(event) {

        const token = localStorage.getItem('token');
        axios.get('http://54.163.4.78:3000/premium/showleaderboard', { headers: { 'Authorization': token }})
        .then(response => {
            
            const data = response.data.result;

            createLeader();
            const allitems = document.getElementById('leaderlist');
            allitems.innerHTML = "";
            data.forEach(item => {
                const listItem = document.createElement('li');
                const p = document.createElement('p');
                p.innerHTML = `Name: ${item.name} - Total Expense - ${item.totalExpense}`;
                listItem.appendChild(p);
                allitems.appendChild(listItem);
            })

         })

    }

    dwnbutton.onclick = async function(event) {

        window.location.href = 'http://54.163.4.78:3000/report/report.html';
    }
}

function createLeader() {

    const div = document.getElementById('leader_container');
    div.innerHTML = "";

    const leaderHeading = document.createElement('h4');
    leaderHeading.id = 'leaderheading';
    leaderHeading.innerHTML = "Leaderboard";

    const ul = document.createElement('ul');
    ul.id = 'leaderlist';

    div.appendChild(leaderHeading);
    div.appendChild(ul);
}


