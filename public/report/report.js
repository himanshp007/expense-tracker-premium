document.addEventListener("DOMContentLoaded", function(event) {
    getDate();
    displayAllExpenses();
    document.getElementById('download-btn').onclick = downloadData;
});

// Function to get and display the current date
function getDate() {
    var today = new Date();

    var monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var day = ('0' + today.getDate()).slice(-2);
    var month = monthNames[today.getMonth()];
    var year = today.getFullYear();
    var time = today.toLocaleTimeString();

    var formattedDate = `${day} ${month} ${year}, ${time}`;

    document.getElementById("date").innerHTML = formattedDate;
    document.getElementById('this-year').innerHTML = year;
    document.getElementById('this-month').innerHTML = month + ' ' + year;
    // document.getElementById('notes-year').innerHTML = 'Notes Report' + ' ' + year;
}

// Function to display all expenses with pagination
function displayAllExpenses(page = 1) {
    const token = localStorage.getItem('token');
    const rows = localStorage.getItem('rows');

    axios.get(`http://54.163.4.78:3000/premium/showexpenses?page=${page}&rows=${rows}`, { headers: { 'Authorization': token } })
    .then(response => {
        const data = response.data.result;
        console.log(data);

        if (!data || !Array.isArray(data)) {
            console.log("No data found");
            return;
        }

        const totalPages = response.data.totalPages;
        const currentPage = response.data.currentPage;

        const monthlydatatable = document.getElementById('monthly-table');
        monthlydatatable.innerHTML = "";
        monthlydatatable.appendChild(createHeadings());

        data.forEach(item => {
            const monthlydata = document.createElement('tr');
            monthlydata.id = 'monthly-data';
            const date = document.createElement('td');
            date.innerHTML = new Date(item.createdAt).toLocaleDateString();
            const description = document.createElement('td');
            description.innerHTML = item.description;
            const category = document.createElement('td');
            category.innerHTML = item.category;
            const income = document.createElement('td');
            income.innerHTML = '0';
            const expense = document.createElement('td');
            expense.innerHTML = item.amount;

            monthlydata.appendChild(date);
            monthlydata.appendChild(description);
            monthlydata.appendChild(category);
            monthlydata.appendChild(income);
            monthlydata.appendChild(expense);

            monthlydatatable.appendChild(monthlydata);
        });

        // Pagination buttons
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = ""; // Clear previous pagination

        if (currentPage > 1) {
            const prevPageButton = document.createElement('button');
            prevPageButton.innerHTML = `${currentPage - 1}`;
            prevPageButton.onclick = () => displayAllExpenses(currentPage - 1);
            pagination.appendChild(prevPageButton);
        }

        const currentPageButton = document.createElement('button');
        currentPageButton.innerHTML = `${currentPage}`;
        currentPageButton.classList.add('active');
        pagination.appendChild(currentPageButton);

        if (currentPage < totalPages) {
            const nextPageButton = document.createElement('button');
            nextPageButton.innerHTML = `${currentPage + 1}`;
            nextPageButton.onclick = () => displayAllExpenses(currentPage + 1);
            pagination.appendChild(nextPageButton);
        }
    }).catch(err => console.log(err));
}

// Function to create table headings
function createHeadings() {
    const monthlyheading = document.createElement('tr');
    monthlyheading.id = 'monthly-heading';
    const date = document.createElement('th');
    date.innerHTML = 'Date';
    const description = document.createElement('th');
    description.innerHTML = "Description";
    const category = document.createElement('th');
    category.innerHTML = 'Category';
    const income = document.createElement('th');
    income.innerHTML = "Income";
    const expense = document.createElement('th');
    expense.innerHTML = 'Expense';

    monthlyheading.appendChild(date);
    monthlyheading.appendChild(description);
    monthlyheading.appendChild(category);
    monthlyheading.appendChild(income);
    monthlyheading.appendChild(expense);

    return monthlyheading;
}

// Function to set the number of rows to display
function setRows() {
    const rows = document.getElementById('rows').value;
    localStorage.setItem('rows', rows);
    displayAllExpenses(1, rows);
}

// Function to download data
async function downloadData(event) {
    event.preventDefault(); // Prevent default anchor behavior
    const token = localStorage.getItem('token');
    await axios.get('http://54.163.4.78:3000/user/download', { headers: { 'Authorization': token } })
    .then(response => {
        var a = document.createElement('a');
        a.href = response.data.url;
        a.click();
    }).catch(err => console.log(err));
}
