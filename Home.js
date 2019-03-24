import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Nav from './Nav';
import axios from 'axios';

export default function Home(props) {
  const [username, setUsername] = useState('smessina');
  const [playlistData, setPlaylistData] = useState(false);
  const happyPress = useKeyPress('Enter');
  this.handleKeyPress = this.handleKeyPress.bind(this);
  this.getUserData = this.getUserData.bind(this);

  useEffect(() => {
    this.nameInput.focus();
  });

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });


  if (this.state.playlistData) {
    this.props.history.push('/');
    this.props.history.push('/playlists');
    return <Redirect to = {
      {
        pathname: "/playlists",
        state: this.state
      }
    }
  />;
  }

  return (
    <div id="home">
      <Nav />
      <p className="home-hint">
        Enter your Spotify username below
        <span className="clickable"
          onClick = { () => this.getUserData(true) }>
          (or try mine!)
        </span>
      </p>
      <p className="home-hint">
        <br />
        { this.state.errorMsg }
      </p>
      <div className="btn-container">
        <input ref={ (input) => { this.nameInput = input; } }
          onKeyPress = { this.handleKeyPress }
          type="text"
          name="username"
          id="username"
          placeholder="Spotify username"
          value = { this.state.value }
          onChange = { this.handleUsernameChange }
        />

      <button className="btn btn--home"
        onClick = { this.getUserData }>
        Go!
      </button>
    </div>
    <div className="bands">
      <p></p><p></p><p></p>
    </div>
  </div>
  );
}

//function handleKeyPress(e) {
  //if (e === true || e.key === 'Enter') {
    //this.getUserData();
  //}
//}

//function getUserData() {
//}


//function getUserData() {
//axios.get(`http://localhost:3000/playlists?user=${this.state.username}`)
//.then((response) => {
//// handle success
//if (response.data.name === 'WebapiError') {
//this.setState({
//errorMsg: (
//<span>Oops!Looks like there was a problem. <br />
//Does {this.state.username} exist ? <br / >
//<a href={ `https://open.spotify.com/user/${this.state.username}` }
//target = "_blank"
//rel = "noopener noreferrer">
//Check here.
//</a>
//</span>
//),
//playlistData: false
//});

//} else {
//this.setState({
//playlistData: response.data.items
//});
//}
//return;
//})
//.catch((error) => {
//// handle error
//});
//}


