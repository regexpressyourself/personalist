import React, { Component } from 'react';
import axios from 'axios';
import Nav from './Nav';
import Song from './Song';

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
