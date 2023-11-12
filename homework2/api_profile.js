

document.addEventListener("DOMContentLoaded", function () {
    
    fetch('http://localhost:8000/api/user/0')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
    
        document.getElementById("name").value = data.data.name;
        document.getElementById("last-name").value = data.data["last-name"]; 
        document.getElementById("phone").value = data.data.phone;
        document.getElementById("email").value = data.data.email;
        document.getElementById("delivery-address").value = data.data["delivery-address"]; 
        document.getElementById("billing-address").value = data.data["billing-address"];
    })
    .catch(error => {
        console.log('Error:', error);
    });

    
});



function updateUser(){

    const data = {
        "name": document.getElementById("name").value,
        "last-name": document.getElementById("last-name").value,
        "phone": document.getElementById("phone").value,
        "email": document.getElementById("email").value,
        "delivery-address": document.getElementById("delivery-address").value,
        "billing-address": document.getElementById("billing-address").value
    };

    fetch("http://localhost:8000/api/user/0", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}


