userUrl = "http://127.0.0.1:5000/user/"
var currentUser;

init = {
    initChartPie: function () {
        var dataPreferences = {
            series: [
                [25, 30, 20, 25]
            ]
        };
        var optionsPreferences = {
            donut: true,
            donutWidth: 40,
            startAngle: 0,
            total: 100,
            showLabel: false,
            axisX: {
                showGrid: false
            }
        };
        Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);
        Chartist.Pie('#chartPreferences', {
            labels: ['33%', '33%', '34%'],
            series: [33, 33, 34]
        });
    }
}


utils = {
    loginFunction: function (element) {
        var email = document.getElementById("loginForm-email").value;
        var pass = document.getElementById("loginForm-pass").value;

        data = {"email": email, "password": pass};
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            url: userUrl + "login",
            contentType: 'application/json',
            success: function(user){
                if (user) {
                    updateCurrentUser(user)
                    jQuery("#errorLabel").hide();
                    jQuery("#loginModal").modal("hide");

                    sessionStorage.setItem('username', currentUser.email);
                    sessionStorage.setItem('firstname', currentUser.name);
                    utils.ensureAuthentication();
                }

            },
            error: function(response){
                jQuery("#errorLabel").show();
                jQuery("#errorLabel").text(response.responseJSON["reason"]);
                console.log(response.responseJSON["reason"])
            }
        });

    },

    ensureAuthentication: function(){
        var email = sessionStorage.getItem('username');

        if (email) {
            document.getElementById("menuUser").style.display = "initial";
            document.getElementById("menuMusic").style.display = "initial";
            document.getElementById("signInLink").style.display = "none";
            document.getElementById("userLoginName").style.display = "initial";
            utils.displayUserName();
        }
    },
    eraseSessionStorage: function () {
        sessionStorage.removeItem('username');
        window.sessionStorage.clear();
    },
    registerUser() {
        if ($('#signupForm-pass1').val() !=  $('#signupForm-pass2').val()) {
            $('#errorMessage').text("Passwords don't match");
            $('#errorMessage').show();
        } else {
            jQuery("#errorMessage").hide();
            var user = {
                email: $('#signupForm-email').val(),
                username: $('#signupForm-username').val(),
                slogan: $('#signupForm-slogan').val(),
                small_link: "@" + $('#signupForm-username').val(),
                company: $('#signupForm-company').val(),
                password: $('#signupForm-pass1').val(),
            };
            data = user;
            $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                url: userUrl,
                contentType: 'application/json',
                success:function(){
                    jQuery("#loginModal").modal("hide");
                    jQuery("#signupModal").modal("hide");
                    jQuery("#loginModal").modal("toggle");
                },
                error: function(response){
                    jQuery("#errorMessage").text(response.responseJSON["reason"]);
                    jQuery("#errorMessage").show();
                }
            });
        }
    },

    displayUserName: function () {
        var firstname = sessionStorage.getItem('firstname');
        var currentName;
        if (firstname) {
            currentName = firstname;
        }
        else {
            currentName = "Anonymous";
        }
        document.getElementById("showUserName").innerHTML = 'Welcome, ' + currentName;
    }
}

function updateCurrentUser(user){
    currentUser = JSON.parse(user);
}
