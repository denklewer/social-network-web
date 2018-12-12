userUrl = "http://35.204.169.59:29000/user/"
var currentUser;
$(document).ready(function () {
    getCurrentUser();
    getTeam();

});

function createTeamRow(teamMember, i){
    var li = document.createElement('li');
    var row = li.appendChild(document.createElement('div'));
    row.className = 'row';
    var avatarCol = document.createElement('div');
    avatarCol.className = 'col-xs-3';
    avatarCol.innerHTML = ' <div class="avatar"> ' +
        '<img src="../assets/img/img-'+((i)%3+1)+ '.jpg" alt="Circle Image" class="img-circle img-no-padding img-responsive"> </div>'
    row.appendChild(avatarCol);
    var nameCol = document.createElement('div');
    nameCol.className = 'col-xs-6';
    nameCol.innerHTML = teamMember.lastname + '<br />' + '<span class="text-muted"><small>Offline</small></span>';
    row.appendChild(nameCol);
    var convertCol = document.createElement('div');
    convertCol.className = 'col-xs-3 text-right';
    convertCol.innerHTML = '<btn class="btn btn-sm btn-success btn-icon"><i class="fa fa-envelope"></i></btn>'
    row.appendChild(convertCol);
    return row;
}

function getTeam(){
    var email=sessionStorage.getItem('username');
    var members={};
        if (email){
        data = {"email": email};
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            url: userUrl + "team",
            contentType: 'application/json',
            success:function(response){
                members = JSON.parse(response);
                var teamList = document.getElementById("team_members");
                teamList.innerHTML = '';
                members.forEach(function (member, i) {
                    if (member['email'] !== email){
                        teamList.appendChild(createTeamRow(member, i));
                    }
                });
            },
            error: function(response){
              alert(response.responseJSON["reason"])
            }
        });
        console.log(members);
        }
    }

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





