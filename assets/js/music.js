musicUrl = "http://127.0.0.1:5000/music/"
$(document).ready(function () {
    load_music();

});

function load_music(){
var email=sessionStorage.getItem('username');
console.log('music');
    var members={};
        if (email) {
            data = {"email": email};
            $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                url: musicUrl + "load",
                contentType: 'application/json',
                success: function (responce) {
                    members = JSON.parse(responce);
                    console.log(members.Song[0].name);
                    var html1='';
                     html1+='<table class="table table-striped">'+'<thead>\n' +
                        '<th>ID</th>' +
                        '<th>Name</th>\n' +
                        '<th>Album</th>\n' +
                        '                                            <th>Singer</th>\n' +
                        '                                            <th>Rating</th>\n' +
                        '                                            <th>Play ?</th>\n' +
                        '                                        </thead>\n' +
                        '                                        \n' +
                        '<tbody>\n'
                    for (var i=0;i<members.Song.length;i++) {
                        html1+=' <tr>\n' +
                            '                                                <td>'+(i+1)+'</td>\n' +
                            '                                                <td>'+members.Song[i].name+'</td>\n' +
                        '                                               <td>' +members.Song[i].album+'</td>\n' +
                        '                                                <td>' +members.Song[i].singer+'</td>\n' +
                        '                                                <td>' +members.Song[i].rating+ '</td>\n' +
                        '                                                <td>'+
                        '                                                    <btn class="btn btn-sm  btn-icon"><img src="../assets/img/Plex-icon.jpg"\n' +
                        '                                                            alt="Circle Image" class="img-circle img-no-padding img-responsive"></btn>\n' +
                        '                                                </td>\n' +
                        '                                            </tr>'

                    }
                    html1+='</tbody>'+'</table>';
                    document.getElementById("upload_table").innerHTML=html1;

                   },
                error: function (response) {
                    jQuery("#loginModal").modal("show");
                    alert(response.responseJSON["reason"])
                }
            });
        }};
