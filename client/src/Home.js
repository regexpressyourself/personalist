import React, { Component } from 'react';
import { Redirect } from 'react-router'
import Nav from './Nav';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'smessina',
      playlistData: false
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.getUserData = this.getUserData.bind(this);
  }

  componentDidMount() {
    this.nameInput.focus();
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value}, () => {console.log(this.state.username);});
  }

  handleKeyPress(e) {
    if (e === true || e.key === 'Enter') {
      this.getUserData();
    }
  }

  getUserData() {

    axios.get(`http://localhost:3000/playlists?user=${this.state.username}`)
      .then((response) => {
        // handle success
        if (response.data.name === 'WebapiError') {
          this.setState({errorMsg: <span>Oops! Looks like there was a problem. <br />Does {this.state.username} exist?<br /><a href={`https://open.spotify.com/user/${this.state.username}`} target="_blank"> Check here.</a></span>});
          this.setState({playlistData: false});
        }
        else {
          let playlistData = response.data.items;
          this.setState({playlistData: playlistData});
        }
        return;
      })
      .catch((error) => {
        // handle error
      });
  }

  render() {
    if (this.state.playlistData) {
      console.log(this.state);
      this.props.history.push('/');
      this.props.history.push('/playlists');
      return <Redirect to={{ pathname: "/playlists", state: this.state }} />;
    }
    return (
      <div id="home">
        <Nav />
        <p className="home-hint">
          Enter your Spotify username below
          <span className="clickable" onClick={() => this.getUserData(true)}>(or try mine!)</span>
        </p>
        <p className="home-hint"><br />{this.state.errorMsg}</p>
        <div className="btn-container">
          <input
            ref={(input) => { this.nameInput = input; }}
            onKeyPress={this.handleKeyPress}
            type="text"
            name="username"
            id="username"
            placeholder="Spotify username"
            value={this.state.value}
            onChange={this.handleUsernameChange} />

          <button className="btn btn--home" onClick={this.getUserData} >
            Go!
          </button>
        </div>
        <div className="bands">
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
    );
  }
}

export default Home;
