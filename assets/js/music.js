musicUrl = "http://35.204.169.59:29000/music/"
$(document).ready(function () {
    utils.displayUserName();
    load_music();

});


function createMusicRow(music, i){
    var row = document.createElement('tr');
    var number = document.createElement('td');
    number.innerText = i+1;
    var name = document.createElement('td');
    name.innerText = (music['name']);
    var album = document.createElement('td');
    album.innerText = (music['album']);
    var singer = document.createElement('td');
    singer.innerText = (music['singer']);
    var rating = document.createElement('td');
    rating.innerText = (music['rating']);
    var playCell = document.createElement('td');
    var playBtn = document.createElement('btn');
    playBtn.className = 'btn btn-sm  btn-icon';
    playBtn.onclick = 'playAudio(bensound-'+name+'.mp3)';
    playBtn.innerHTML = '<img src="../assets/img/Plex-icon.jpg" alt="Circle Image" class="img-circle img-no-padding img-responsive">';
    playCell.appendChild(playBtn);

    row.appendChild(number);
    row.appendChild(name);
    row.appendChild(album);
    row.appendChild(singer);
    row.appendChild(rating);
    row.appendChild(playCell);
    return row;
}



function createTable(){
    var table = document.createElement('table');
    table.className = 'table table-striped';
    var header = document.createElement('thead');
    table.appendChild(header);
    var content = document.createElement('tr');
    content.appendChild(createCol('ID'));
    content.appendChild(createCol('Name'));
    content.appendChild(createCol('Album'));
    content.appendChild(createCol('Singer'));
    content.appendChild(createCol('Rating'));
    content.appendChild(createCol('Play'));
    header.appendChild(content);

    return table;
}

function createCol(text){
    var col = document.createElement("th");
    col.scope ="col";
    var content = document.createTextNode(text);
    col.appendChild(content);
    return col;
}


function load_music(){
var email=sessionStorage.getItem('username');
console.log('music');
    var songs=[];
        if (email) {
            data = {"email": email};
            $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                url: musicUrl + "load",
                contentType: 'application/json',
                success: function (response) {
                    songs = JSON.parse(response);
                    var tableParent = document.getElementById("music-table-holder");
                    tableParent.innerHTML = '';
                    if (songs.length > 0) {
                        var table= createTable();
                        var tableBody = table.appendChild(document.createElement('tbody'));
                        songs.forEach(function (song, i) {
                            tableBody.appendChild(createMusicRow(song, i));
                        });
                        tableParent.appendChild(table);
                    }
                    else {
                        var message = document.createTextNode("Your collection is empty");
                        tableParent.appendChild(message);
                    }
                   },
                error: function (response) {
                    alert(response.responseJSON["reason"])
                }
            });
        }
}

function playAudio(filename) {
    {
        var url = "http://35.204.169.59/social-network-web/music/" + filename
        var a = new Audio(url);
        a.play();
    }
}