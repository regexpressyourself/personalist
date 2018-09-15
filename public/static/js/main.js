let state = {
  user: '',
  list: ''
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
  updateUserPlaylistsView();
}

let updateUserPlaylistsView = () => {
  httpGetAsync(`/playlists?user=${state.user}`, function(data) {
    let items = [];
    data = JSON.parse(data).items;

    for (let playlist of data) {
      items.push(`<p><a href="/songs?user=${state.user}&list=${playlist.id}" >${playlist.name}</a></p>`);
    }
    updateMainView(items.join(''));
  });
}

let updateInitialView = () => {
  updateMainView(`
      <a href="/lists?user=${sam_user}" >
       <button>Sam</button>
     </a>
     <br />
      <a href="/lists?user=${kendall_user}" >
       <button>Kendall</button>
     </a>
  `);
}

let updatePlaylistSongsView = () => {
  httpGetAsync(`/playlist?user=${state.user}&list=${state.list}`, function(data) {
    let items = [];
    data = JSON.parse(data);
    for (let song of data['items']) {
      let newData = {
        // the special id for playlist+song combination. 
        // this is the key in the db for the song. the value is the description
        "messinaID": song.messinaId,
        "description": song.description
      }
      items.push(`<p class="clickable" onclick="playSong('${song.id}')">${song.name}</p>
    <div id="embed-${song.id}"></div>
                <label for="song-${song.messinaId}">description</label>
                <input type="text" value="${song.description}" name="song-${song.messinaId}" id="song-${song.messinaId}"/>
                <button onclick="setPlaylistSongs('${song.messinaId}', document.getElementById('song-${song.messinaId}').value)">Submit yo' shit</button>
      `);
    }
    updateMainView(items.join(''));
  });
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

let playSong = (songId) => {
  let iframe = `<iframe src="https://open.spotify.com/embed/track/${songId}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
  let embedSection = document.querySelectorAll(`#embed-${songId}`)[0];
  embedSection.innerHTML = iframe;

}





function findGetParameter(parameterName) {
  var result = null,
    tmp = [];
  location.search
    .substr(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
}

(() => {
  switch (window.location.pathname) {
    case '/':
      //updateInitialView();
      break;
    case '/lists':
      state.user = findGetParameter('user');
      updateUserPlaylistsView();
      break;
    case '/songs':
      state.user = findGetParameter('user');
      state.list = findGetParameter('list');
      updatePlaylistSongsView();
      break;
    default:
      break;
  }
})()
