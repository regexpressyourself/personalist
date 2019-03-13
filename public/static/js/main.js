let state = {
  user: '',
  list: ''
}


function httpGetAsync(theUrl) {
  return new Promise( (resolve, reject) => {
    let httpRequest = new XMLHttpRequest();

    httpRequest.open('GET', theUrl, true);

    httpRequest.onload = () => {
      let data = httpRequest.responseText;
      if (httpRequest.status == 200) {
        resolve(data)
      }
      else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    httpRequest.onerror = () => {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };

    httpRequest.send(null);
  });
}


function httpPostAsync(theUrl, payload) {
  return new Promise((resolve, reject) => {
    let httpRequest = new XMLHttpRequest();

    httpRequest.open('POST', theUrl, true);
    httpRequest.setRequestHeader('Content-Type', 'application/json');

    httpRequest.onload = () => {
      if (httpRequest.status == 200) {
        let data = httpRequest.responseText;
        resolve(data);
      }
      else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };

    httpRequest.onerror = () => {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };

    httpRequest.send(JSON.stringify(payload));
  });
}

let updateUserPlaylistsView = (playlists) => {
  httpGetAsync(`/playlists?user=${state.user}`)
    .then((data) => {
      if (data === 'try again') {
        updateUserPlaylistsView();
        return;
      }
      let items = [];
      data = JSON.parse(data).items;

      for (let i = 0; i < data.length; i++) {
        let playlist = data[i];
        let oddEvenModifier = (i % 2 === 0) ? 'odd' : 'even';
        items.push(`<p class="playlist playlist--${oddEvenModifier}">
                    <span class="playlist__pointer playlist__pointer--${oddEvenModifier}"></span>
                    <a class="playlist__link playlist__link--${oddEvenModifier}" href="/songs?user=${state.user}&list=${playlist.id}" >
                      <span>
                        ${playlist.name}
                      </span>
                    </a>
                  </p>
                `);
      }
      updateMainView(items.join(''));
    }, (data) => {
      console.log(data);
    });
}

let redirectToListView = () => {
  let id = document.getElementById('username').value;
  window.location.href = `/lists?user=${id}`;
}

let checkForEnter = (event) => {
  if (event.keyCode == 13) {
    redirectToListView();
  }
}

let updateInitialView = () => {
  document.querySelector('.header-img').src = '/images/personalist-white.png';
  document.querySelector('.header-img-container').classList.add('header-img-container--home');

  document.querySelector('.header-img').classList.add('header-img--home');
  updateMainView(`
      <div class="btn-container">
          <input onkeypress="checkForEnter(event)" type="text" name="username" id="username" placeholder="Enter your Spotify username">
          <button class="btn" onclick="redirectToListView()" >
            Go!
          </button>
      </div>
    <div class="bands">
      <p></p>
      <p></p>
      <p></p>
    </div>
  `);
}

let updatePlaylistSongsView = () => {
  httpGetAsync(`/playlist?user=${state.user}&list=${state.list}`)
    .then((data) => {
      let items = [];
      data = JSON.parse(data);
      for (let song of data['items']) {
        let hasDescription = '';
        let newData = {
          // the special id for playlist+song combination.
          // this is the key in the db for the song. the value is the description
          "messinaID": song.messinaId,
          "description": song.description
        }
        if (song.description.length > 0) {
          hasDescription = 'has-description';
        }
        items.push(`
      <div class="song-item song-item--${song.id} ${hasDescription}">
        <p onclick="toggleDescription(event, '${song.id}')" class="song-item__name song-item__name--${song.id} clickable">
          <span>
            ${song.name}
          </span>
          <span id="play-icon--${song.id}" class="song-item__name__play" onclick="playSong('${song.id}')">
            <svg id="play-icon-${song.id}" class="feather feather-play sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-reactid="916"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </span>
        </p>
        <div class="song-item__description song-item__description--${song.id}">
          <textarea type="text"
                    placeholder="Description"
                    name="song-${song.messinaId}"
                    id="song-${song.messinaId}">${song.description}</textarea>
          <div class="song-item__description__btn-container">
            <button id="save-btn-${song.messinaId}" class="save-btn clickable" onclick="setPlaylistSongs('${song.messinaId}')">Save</button>
            <button id="cancel-btn-${song.messinaId}" class="cancel-btn clickable" onclick="toggleDescription(event, '${song.id}')">Cancel</button>
          </div>
        </div>
      </div>
      `);
      }
      items.push('<div id="embed-player"></div>');
      updateMainView(items.join(''));
    });
}

let setPlaylistSongs = (id) => {
  let saveBtn = document.getElementById(`save-btn-${id}`);
  let cancelBtn = document.getElementById(`cancel-btn-${id}`);
  let newDescription = document.getElementById(`song-${id}`).value;
  let payload = [{
    'id': id,
    'description': newDescription
  }];

  httpPostAsync('/playlist', payload)
  .then((data) => {
    let saveConfirmation = document.querySelector('.save-confirmation');
    saveConfirmation.classList.add('save-confirmation--on');

    setTimeout(() => {
      saveConfirmation.classList.remove('save-confirmation--on');
    }, 3000);
  });
}

let updateMainView = (content) => {
  let mainSection = document.querySelectorAll('main#main')[0];
  mainSection.innerHTML = content;
}

let toggleDescription = (event, songId) => {
  if (event.target.closest('.song-item__name__play')) return;
  let songEl = document.querySelectorAll(`.song-item--${songId}`)[0];
  if (songEl.classList.contains('song-item--shown')) {
    songEl.classList.add('song-item--hidden');
    songEl.classList.remove('song-item--shown');
  } else {
    songEl.classList.add('song-item--shown');
    songEl.classList.remove('song-item--hidden');
  }
}

let playSong = (songId) => {
  document.querySelectorAll(`#embed-player`)[0].innerHTML = `<iframe src="https://open.spotify.com/embed/track/${songId}" width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
  document.querySelectorAll(`#play-icon--${songId}`)[0].style.opacity = 0;
  document.querySelectorAll(`#play-icon--${songId}`)[0].onclick = () => pauseSong(songId);
  document.querySelectorAll(`#play-icon--${songId}`)[0].classList.add('play-icon--playing');
  setTimeout(() => {
    document.querySelectorAll(`#play-icon--${songId}`)[0].innerHTML = `
<svg id="pause-icon-${songId}" class="feather feather-x sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-reactid="1336"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  `;
    document.querySelectorAll(`#play-icon--${songId}`)[0].onclick = () => pauseSong(songId);
    document.querySelectorAll(`#play-icon--${songId}`)[0].style.opacity = 1;
  }, 500);
}

let pauseSong = (songId) => {
  document.querySelectorAll(`#embed-player`)[0].innerHTML = ``;
  document.querySelectorAll(`#play-icon--${songId}`)[0].style.opacity = 0;
  document.querySelectorAll(`#play-icon--${songId}`)[0].classList.remove('play-icon--playing');
  setTimeout(() => {
    document.querySelectorAll(`#play-icon--${songId}`)[0].innerHTML = `
            <svg id="play-icon-${songId}" class="feather feather-play sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-reactid="916"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
  `;
    document.querySelectorAll(`#play-icon--${songId}`)[0].onclick = () => playSong(songId);
    document.querySelectorAll(`#play-icon--${songId}`)[0].style.opacity = 1;
  }, 500);
}

function findGetParameter(parameterName) {
  var result = null,
    tmp = [];
  location.search
    .substr(1)
    .split("&")
    .forEach(function(item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
}

(() => {
  switch (window.location.pathname) {
    case '/':
      document.querySelectorAll('body')[0].id = 'home';
      updateInitialView();
      break;
    case '/lists':
      document.querySelectorAll('body')[0].id = 'lists';
      state.user = findGetParameter('user');
      updateUserPlaylistsView();
      break;
    case '/songs':
      document.querySelectorAll('body')[0].id = 'songs';
      state.user = findGetParameter('user');
      state.list = findGetParameter('list');
      updatePlaylistSongsView();
      break;
    default:
      break;
  }


})()
