let userProfile = {
    name: "",
    lastName: "",
    email: "email@email.com",
    phoneNumber: "",
    deliveryAddress: "",
    billingAddress: ""
};

document.addEventListener("DOMContentLoaded", function () {

    const storedUserProfile = JSON.parse(localStorage.getItem("userProfile"));

    userProfile = storedUserProfile ? storedUserProfile : userProfile;

    updateProfileInfo();

});

function updateProfileInfo() {
    const Name = document.getElementById("name");
    const LastName = document.getElementById("last-name");
    const Email = document.getElementById("email");
    const PhoneNumber = document.getElementById("phone");
    const DeliveryAddress = document.getElementById("delivery-address");
    const BillingAddress = document.getElementById("billing-address");

    Name.value = userProfile.name;
    LastName.value = userProfile.lastName;
    Email.value = userProfile.email;
    PhoneNumber.value = userProfile.phoneNumber;
    DeliveryAddress.value = userProfile.deliveryAddress;
    BillingAddress.value = userProfile.billingAddress;
}

function saveProfileInfo() {
    const Name = document.getElementById("name");
    const LastName = document.getElementById("last-name");
    const PhoneNumber = document.getElementById("phone");
    const DeliveryAddress = document.getElementById("delivery-address");
    const BillingAddress = document.getElementById("billing-address");

    userProfile.name = Name.value;
    userProfile.lastName = LastName.value;
    userProfile.phoneNumber = PhoneNumber.value;
    userProfile.deliveryAddress = DeliveryAddress.value;
    userProfile.billingAddress = BillingAddress.value;

    localStorage.setItem("userProfile", JSON.stringify(userProfile));


}
