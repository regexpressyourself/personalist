import React, { Component } from 'react';
import axios from 'axios';
import Nav from './Nav';
import { Redirect } from 'react-router'

class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = props.location.state;
    this.state.items = [];

    this.createPlaylists = this.createPlaylists.bind(this);
    this.getPlaylistData = this.getPlaylistData.bind(this);
  }


  getPlaylistData(playlist) {
    axios.get(`http://localhost:3000/playlist?user=${this.state.username}&list=${playlist.id}`)
      .then((response) => {
        // handle success
        let data = response.data;
        this.setState({playlistData: data})
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
    let data = this.state.spotifyData;
    let items = [];
    for (let i = 0; i < data.length; i++) {
      let playlist = data[i];
      let oddEvenModifier = (i % 2 === 0) ? 'odd' : 'even';
      items.push(
        <p key={i} className={`playlist playlist--${oddEvenModifier}`}>
          <span className={`playlist__pointer playlist__pointer--${oddEvenModifier}`}></span>
          <button className={`playlist__link playlist__link--${oddEvenModifier}`}
            onClick={() => this.getPlaylistData(playlist)}>
            <span>
              {playlist.name}
            </span>
          </button>
        </p>
      );
    }
    return items;
  }

  render() {
    if (this.state.playlistData) {
      return <Redirect to={{ pathname: "/songs", state: this.state }} />;
    }
    return (
      <div id="lists">
        <Nav />
        <main id="main">
          {this.createPlaylists()}
        </main>
      </div>
    );
  }
}

export default Playlists;
