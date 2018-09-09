let state = {
  user: '',
  playlist: ''
}

function httpGetAsync(theUrl, callback) { //theURL or a path to file
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var data = httpRequest.responseText;  //if you fetch a file you can JSON.parse(httpRequest.responseText)
      if (callback) {
        callback(data);
      }                   
    }
  };

  httpRequest.open('GET', theUrl, true); 
  httpRequest.send(null);
}


function httpPostAsync(theUrl, payload, callback) { //theURL or a path to file
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var data = httpRequest.responseText;  //if you fetch a file you can JSON.parse(httpRequest.responseText)
      if (callback) {
        callback(data);
      }                   
    }
  };

  httpRequest.open('POST', theUrl, true); 
  httpRequest.setRequestHeader('Content-Type', 'application/json');
  httpRequest.send(JSON.stringify({payload: payload}));
}

const kendall_user = 'kwatch90210';
const kendall_playlist = '2nrEA3uA0oD23f5KuRUu7u';

const sam_user = 'smessina';


let getUserPlaylists = (user) => {
  switch(user) {
    case 'sam':
      user = sam_user;
      break;
    case 'kendall':
      user = kendall_user;
      break;
    default:
      break
  }
  state.user = user;
  httpGetAsync(`/playlists?userId=${user}`, function(data) {
    updateUserPlaylistsView(JSON.parse(data).items);
  });
}

let updateUserPlaylistsView = (data) => {
  let items = [`<button onclick="updateInitialView()">Back</button>`];
  for (let playlist of data) {
    items.push(`<p class="clickable" onclick="getPlaylistSongs('${playlist.id}')">${playlist.name}</p>`);
  }
  updateMainView(items.join(''));
}


let getPlaylistSongs = (playlistId) => {
  state.playlist = playlistId;

  httpGetAsync(`/playlist?userId=${state.user}&playlistId=${playlistId}`, function(data) {
    updatePlaylistSongsView(JSON.parse(data).items);
  });
}

let updateInitialView = () => {
  updateMainView(`
       <button onclick="getUserPlaylists('sam')">Sam</button>
       <button onclick="getUserPlaylists('kendall')">Kendall</button>
  `);
}

let updatePlaylistSongsView = (data) => {
  let items = [`<button onclick="getUserPlaylists('${state.user}')">Back</button>`];
  for (let song of data) {
    let newData = {
      // the special id for playlist+song combination. 
      // this is the key in the db for the song. the value is the description
      "messinaID": song.messinaId,
      "description": song.description
    }
    items.push(`<p><a href="#" target="_blank">${song.name}</a></p>
                <label for="song-${song.messinaId}">description</label>
                <input type="text" value="${song.description}" name="song-${song.messinaId}" id="song-${song.messinaId}"/>
                <button onclick="setPlaylistSongs('${song.messinaId}', document.getElementById('song-${song.messinaId}').value)">Submit yo' shit</button>
      `);
  }
  updateMainView(items.join(''));
}

let setPlaylistSongs = (id, description) => {
  let payload = [{ 'id': id, 'description': description }];

  httpPostAsync('/playlist', payload, (data) => { 
  });
}

let updateMainView = (content) => {
  let mainSection = document.querySelectorAll('main#main')[0];
  mainSection.innerHTML = content;
}

