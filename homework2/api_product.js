document.addEventListener("DOMContentLoaded", function () {

    //Load and display product details from http://localhost:5000/api/products/<product_id> 
    
    fetch('http://localhost:8000/api/products/0')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
    
        document.getElementById("model").value = data.data.model;
        document.getElementById("manufacturer").value = data.data.manufacturer;; 
        document.getElementById("body-style").value = data.data["body-style"];
        document.getElementById("engine-options").value = data.data["engine-options"];

    })
    .catch(error => {
        console.log('Error:', error);
    });

    //When user clicks on “Edit” in the product gallery, a file upload window opens. 
    //User can select up to 3 images to upload. Once uploaded, the images will replace the ones available in the gallery. 

    document.getElementById('editButton').addEventListener('click', function(event) {
        event.preventDefault();
        console.log('edit button clicked')
        document.getElementById('fileInput').click(); // Click the hidden file input
    });
    
    document.getElementById('fileInput').addEventListener('change', function() {
        console.log('file input changed')
        const fileInput = document.getElementById('fileInput');
        const imageGallery = document.getElementById('imageGallery');
        
        while (imageGallery.firstChild) {
            imageGallery.removeChild(imageGallery.firstChild); // Remove existing images
        }
    
        for (let i = 0; i < Math.min(3, fileInput.files.length); i++) {
            const file = fileInput.files[i];
            const reader = new FileReader();
    
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = 'Uploaded Image';
                img.classList.add('object-cover', 'aspect-square');
                imageGallery.appendChild(img); // Add new images
            };
    
            reader.readAsDataURL(file);
        }
    });

    //When user clicks on “Edit” in the product info box, the fields become editable. User can change the values for all fields. 

    const toggleButton = document.getElementById('toggleEdit');
    console.log(toggleButton)

    toggleButton.addEventListener('click', function(event){
        event.preventDefault();
        var detailsDisplay = document.getElementById("detailsDisplay");
        var editFields = document.getElementById("editFields");

        console.log(editFields)

        
        editFields.classList.remove("hidden");
        editFields.style.display = "inline";
        
        document.getElementById("modelDisplay").style.display = "none";
        document.getElementById("manufacturerDisplay").style.display = "none";
        document.getElementById("bodyStyleDisplay").style.display = "none";
        document.getElementById("engineOptionsDisplay").style.display = "none";
        
        document.querySelector("#modelInput").value = document.querySelector("#modelDisplay").textContent;
        document.querySelector("#manufacturerInput").value = document.querySelector("#manufacturerDisplay").textContent;
        document.querySelector("#bodyStyleInput").value = document.querySelector("#bodyStyleDisplay").textContent;
        document.querySelector("#engineOptionsInput").value = document.querySelector("#engineOptionsDisplay").textContent;

        
    });
    

    //POST when saving changes to http://localhost:5000/api/products/<product_id>

    const saveButton = document.getElementById('saveButton');

    saveButton.addEventListener('click', function(event){
        event.preventDefault();

        const data = {
            "model": document.getElementById("modelInput").value,
            "manufacturer": document.getElementById("manufacturerInput").value,
            "body-style": document.getElementById("bodyStyleInput").value,
            "engine-options": document.getElementById("engineOptionsInput").value
        };

        fetch("http://localhost:8000/api/products/0", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

    });

});

//The API is storing the products where the users should go.

