import React, { Component } from 'react';
import Nav from './Nav';
import { Redirect } from 'react-router'

class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = props.location.state;
    this.state.items = null;

    this.createPlaylists = this.createPlaylists.bind(this);
    this.getPlaylistData = this.getPlaylistData.bind(this);
  }

  componentDidMount() {
    this.createPlaylists();
  }

  getPlaylistData(playlist) {
    this.setState({chosenPlaylist: playlist});
  }

  createPlaylists() {
    let data = this.state.playlistData;
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
    this.setState({items: items});
  }

  render() {
    if (this.state.chosenPlaylist) {
      this.props.history.push('/songs');
      return <Redirect to={{ pathname: "/songs", state: this.state }} />;
    }
    else if (this.state.items === null) {
      return (
        <div id="lists">
          <Nav username={this.state.username} />
          <main>
            <p className="error-text">Oops! Looks like that user doesn't exist.</p>
            <p className="error-text"><a href="/">Go home.</a></p>
          </main>
        </div>
      );
    }
    else if (this.state.items.length === 0) {
      return (
        <div id="lists">
          <Nav username={this.state.username} />
          <main>
            <p className="error-text">Oops! Looks like that user doesn't have any playlists.</p>
            <p className="error-text"><a href="/">Go home.</a></p>
          </main>
        </div>
      );
    }
    else {
      return (
        <div id="lists">
          <Nav username={this.state.username} />
          <main id="main">
            {this.state.items}
          </main>
        </div>
      )
    }
  }
}

export default Playlists;
