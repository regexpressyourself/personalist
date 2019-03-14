import React, { Component } from 'react';
import { Redirect } from 'react-router'
import Nav from './Nav';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      spotifyData: false
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.getUserData = this.getUserData.bind(this);
  }

  componentDidMount() {
    this.nameInput.focus();
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handleKeyPress(e) {
    if (e === true || e.key === 'Enter') {
      this.getUserData();
    }
  }

  getUserData(useDefaultVal = false) {
    let username = useDefaultVal ? 'smessina' : this.state.username;

    axios.get(`http://localhost:3000/playlists?user=${username}`)
      .then((response) => {
        // handle success
        let data = response.data;
        data = data.items;
        this.setState({spotifyData: data});
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  }

  render() {
    if (this.state.spotifyData) {
      return <Redirect to={{ pathname: "/playlists", state: this.state }} />;
    }
    return (
      <div id="home">
        <Nav />
        <p>Enter your Spotify username below <span className="clickable" onClick={() => this.getUserData(true)}>(or try mine!)</span></p>
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
