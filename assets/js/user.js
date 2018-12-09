userUrl = "http://127.0.0.1:5000/user/"
var currentUser;


$(document).ready(function () {
    getCurrentUser();
});

function getCurrentUser(){
    var email = sessionStorage.getItem('username');
    if (email) {
        data = {"email": email};
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            url: userUrl + "current",
            contentType: 'application/json',
            success:function(user){
                currentUser = JSON.parse(user);
                fillPage()
            },
            error: function(response){
                jQuery("#loginModal").modal("show");
              alert(response.responseJSON["reason"])
            }
        });
    }
    else {
        window.location.replace("dashboard.html");
    }
}

function fillPage(){
    utils.displayUserName();
    $("#inputFirstname").val(currentUser['name']);
    $("#inputLastname").val(currentUser['lastname']);
    $("#inputCity").val(currentUser['city']);
    $("#inputAddress").val(currentUser['address']);
    $("#inputCountry").val(currentUser['country']);
    $("#inputDescription").val(currentUser['description']);
    $("#inputEmail").val(currentUser['email']);
    $("#inputPostalcode").val(currentUser['postal_code']);
    $("#inputUsername").val(currentUser['username'])
    $("#inputCompany").val(currentUser['company'])
    $("#slogan").text(currentUser['slogan']);
    var fullName = (currentUser['name']?currentUser['name'] + " " + currentUser['lastname']: "Anonymous");
    $("#fullname").text(fullName);
    $("#small_link").text(currentUser['small_link']);
}

function updateUser() {
    var email = sessionStorage.getItem('username');
    if (email) {
        var user = {
            id: currentUser['_id'], // change for current id
            name: $('#inputFirstname').val(),
            lastname: $('#inputLastname').val(),
            city: $('#inputCity').val(),
            address: $('#inputAddress').val(),
            country: $('#inputCountry').val(),
            description: $('#inputDescription').val(),
            email: $('#inputEmail').val(),
            postal_code: $('#inputPostalcode').val(),
            username: $('#inputUsername').val(),
            company: $('#inputCompany').val(),
        };
        data = user;
        $.ajax({
            type: 'PUT',
            data: JSON.stringify(data),
            url: userUrl,
            contentType: 'application/json',
            success:function(){
                getCurrentUser()
            },
            error: function(response){
                jQuery("#loginModal").modal("show");
                alert(response.responseJSON["reason"])
            }
        });
    }
    else {
        window.location.replace("dashboard.html");
    }
}





