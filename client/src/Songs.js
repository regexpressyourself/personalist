import React, { Component } from 'react';
import axios from 'axios';
import Nav from './Nav';

class Songs extends Component {
  constructor(props) {
    super(props);
    this.state = props.location.state;
    this.state.items = [];

    this.createPlaylists = this.createPlaylists.bind(this);
    this.playSong = this.playSong.bind(this);
    this.pauseSong = this.pauseSong.bind(this);
    this.toggleDescription = this.toggleDescription.bind(this);
    this.setPlaylistSongs = this.setPlaylistSongs.bind(this);
    this.getPlaylistData = this.getPlaylistData.bind(this);
  }
  componentWillMount() {
    this.getPlaylistData(this.state.chosenPlaylist);
  }

  getPlaylistData(playlist) {
    axios.get(`http://localhost:3000/playlist?user=${this.state.username}&list=${playlist.id}`)
      .then((response) => {
        // handle success
        this.setState({playlistData: response.data.items}, this.createPlaylists)
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  }

  setPlaylistSongs(id) {
    let newDescription = document.getElementById(`song-${id}`).value;
    let payload = [{
      'id': id,
      'description': newDescription
    }];

    axios.post('http://localhost:3000/playlist', payload)
      .then((response) => {
        let saveConfirmation = document.querySelector('.save-confirmation');
        saveConfirmation.classList.add('save-confirmation--on');
        let playlistData = this.state.playlistData.map((item) => {
          if (item.id === payload.id) {
            item.description = newDescription;
          }
          return item;
        });
        this.setState({playlistData: playlistData});
        setTimeout(() => {
          saveConfirmation.classList.remove('save-confirmation--on');
        }, 3000);
        return;
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  toggleDescription(event, songId) {

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

  pauseSong(songId) {
    document.querySelectorAll(`#embed-player`)[0].innerHTML = ``;
    document.querySelectorAll(`#play-icon--${songId}`)[0].style.opacity = 0;
    document.querySelectorAll(`#play-icon--${songId}`)[0].classList.remove('play-icon--playing');
    setTimeout(() => {
      document.querySelectorAll(`#play-icon--${songId}`)[0].innerHTML = `
            <svg id="play-icon-${songId}" class="feather feather-play sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-reactid="916"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
  `;
      document.querySelectorAll(`#play-icon--${songId}`)[0].onclick = () => this.playSong(songId);
      document.querySelectorAll(`#play-icon--${songId}`)[0].style.opacity = 1;
    }, 500);
  }


  playSong(songId) {
    document.querySelectorAll(`#embed-player`)[0].innerHTML = `<iframe src="https://open.spotify.com/embed/track/${songId}" width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
    document.querySelectorAll(`#play-icon--${songId}`)[0].style.opacity = 0;
    document.querySelectorAll(`#play-icon--${songId}`)[0].onclick = () => this.pauseSong(songId);
    document.querySelectorAll(`#play-icon--${songId}`)[0].classList.add('play-icon--playing');
    setTimeout(() => {
      document.querySelectorAll(`#play-icon--${songId}`)[0].innerHTML = `
<svg id="pause-icon-${songId}" class="feather feather-x sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-reactid="1336"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  `;
      document.querySelectorAll(`#play-icon--${songId}`)[0].onclick = () => this.pauseSong(songId);
      document.querySelectorAll(`#play-icon--${songId}`)[0].style.opacity = 1;
    }, 500);
  }
  createPlaylists() {
    let data = this.state.playlistData;
    let items = [];
    for (let song of data) {
      let hasDescription = '';
      if (song.description.length > 0) {
        hasDescription = 'has-description';
      }
      items.push(
        <div key={song.id} className={`song-item song-item--${song.id} ${hasDescription}`}>
          <p onClick={(e) => this.toggleDescription(e, song.id)} className={`song-item__name song-item__name--${song.id} clickable`}>
            <span>
              {song.name}
            </span>
            <span id={`play-icon--${song.id}`} className="song-item__name__play" onClick={() => this.playSong(song.id)}>
              <svg id={`play-icon-${song.id}`} className="feather feather-play sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-reactid="916"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </span>
          </p>
          <div className={`song-item__description song-item__description--${song.id}`}>
            <textarea type="text"
              placeholder="Description"
              name={`song-${song.messinaId}`}
              id={`song-${song.messinaId}`}
              defaultValue={song.description}></textarea>
            <div className="song-item__description__btn-container">
              <button id={`save-btn-${song.messinaId}`} className="save-btn clickable" onClick={() => this.setPlaylistSongs(song.messinaId)}>Save</button>
              <button id={`cancel-btn-${song.messinaId}`} className="cancel-btn clickable" onClick={(e) => this.toggleDescription(e, song.id)}>Cancel</button>
            </div>
          </div>
        </div>
      );
    }
    items.push(<div key="player" id="embed-player"></div>);
    this.setState({newItems: items});
    return items;
  }

  render() {
    return (
      <div id="songs">
        <div className="save-confirmation">
          <p className="big">Save Successful!</p>
        </div>
        <Nav />
        <main id="main">
          {this.state.newItems}
        </main>
      </div>
    );
  }
}

export default Songs;
