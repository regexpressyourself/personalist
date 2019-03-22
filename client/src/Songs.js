import React, { Component } from 'react';
import axios from 'axios';
import Nav from './Nav';
import Song from './Song';
import orangeLogo from './static/images/personalist-orange.png';

class Songs extends Component {
  constructor(props) {
    super(props);
    this.state = props.location.state;
    this.state.items = [];

    this.createPlaylists = this.createPlaylists.bind(this);
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

  createPlaylists() {
    let data = this.state.playlistData;
    let items = [];
    for (let song of data) {
      items.push(
        <Song key={song.id} songId={song.id} songDescription={song.description} songName={song.name} messinaId={song.messinaId} />
      );
    }
    items.push(<div key="player" id="embed-player"></div>);
    this.setState({newItems: items});
    return items;
  }

  render() {
    if (!this.state.newItems) {
      return (
        <div id="songs">
          <Nav username={this.state.username} playlist={this.state.chosenPlaylist} />
          <p className="loading-text">Loading...</p>
          <div className="placeholder">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                </path>
              </svg>
            </span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                </path>
              </svg>
            </span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                </path>
              </svg>
            </span>
          </div>
        </div>
      );
    }
    else {
      return (
        <div id="songs">
          <div className="save-confirmation">
            <p className="big">Save Successful!</p>
          </div>
          <Nav username={this.state.username} playlist={this.state.chosenPlaylist} />
          <main id="main">
            {this.state.newItems}
          </main>
        </div>
      );
    }
  }
}

export default Songs;
