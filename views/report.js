document.addEventListener("DOMContentLoaded", function(event){
    getDate();
})


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
    document.getElementById('notes-year').innerHTML = 'Notes Report' + ' ' + year;
}

document.getElementsByClassName('download-btn')[0].onclick = async function(event) {
    
}
