import React, { Component } from 'react';
import axios from 'axios';

class Song extends Component {
  constructor(props) {
    super(props);
    let hasDescription = props.songDescription.length > 0 ? 'has-description' : '';
    this.state = {
      songId: props.songId,
      songDescription: props.songDescription,
      songName: props.songName,
      songHasDescription: hasDescription
    };

    this.playSong = this.playSong.bind(this);
    this.pauseSong = this.pauseSong.bind(this);
    this.toggleDescription = this.toggleDescription.bind(this);
    this.setPlaylistSongs = this.setPlaylistSongs.bind(this);
  }

  setPlaylistSongs(id) {
    let newDescription = document.getElementById(`song-${id}`).value;
    let hasDescription = newDescription.length > 0 ? 'has-description' : '';
    let payload = [{
      'id': id,
      'description': newDescription
    }];

    axios.post('http://localhost:3000/playlist', payload)
      .then((response) => {
        let saveConfirmation = document.querySelector('.save-confirmation');
        saveConfirmation.classList.add('save-confirmation--on');
        this.setState({
          songDescription: newDescription,
          songHasDescription: hasDescription
        });
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

  render() {
    return (
      <div key={this.state.songId} className={`song-item song-item--${this.state.songId} ${this.state.songHasDescription}`}>
        <p onClick={(e) => this.toggleDescription(e, this.state.songId)} className={`song-item__name song-item__name--${this.state.songId} clickable`}>
          <span>
            {this.state.songName}
          </span>
          <span id={`play-icon--${this.state.songId}`} className="song-item__name__play" onClick={() => this.playSong(this.state.songId)}>
            <svg id={`play-icon-${this.state.songId}`} className="feather feather-play sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-reactid="916"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </span>
        </p>
        <div className={`song-item__description song-item__description--${this.state.songId}`}>
          <textarea type="text"
            placeholder="Description"
            name={`song-${this.state.messinaId}`}
            id={`song-${this.state.messinaId}`}
            defaultValue={this.state.songDescription}></textarea>
          <div className="song-item__description__btn-container">
            <button id={`save-btn-${this.state.messinaId}`} className="save-btn clickable" onClick={() => this.setPlaylistSongs(this.state.messinaId)}>Save</button>
            <button id={`cancel-btn-${this.state.messinaId}`} className="cancel-btn clickable" onClick={(e) => this.toggleDescription(e, this.state.songId)}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Song;
