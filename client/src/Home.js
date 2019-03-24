import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import Nav from './Nav';
import axios from 'axios';

function Home() {
  const [username, setUsername] = useState( localStorage.getItem('username') || '');
  const [playlists, setPlaylists] = useState(false);
  const [usernameReady, setUsernameReady] = useState(false);
  const [errorMsg, setErrorMsg] = useState('none');

  const handleKeyPress = (e) => {
    if (e === true || e.key === 'Enter') {
      setUsernameReady(true);
    }
  }

  useEffect(() => {
    // listen for enter to trigger search
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if(!usernameReady) { return; }
    // usernameReady is set to 'trymine' when the "try mine" link is clicked.
    // we have to set the username to 'smessina' in this case.
    let currentUsername = (usernameReady === 'trymine') ? 'smessina' : username;
    setUsername(currentUsername);

    // get the current user's playlists
    axios.get(`/api/playlists?user=${currentUsername}`)
      .then((response) => {
        if (response.data.name !== 'WebapiError') {
          // store the username and playlists for parsing after refresh
          localStorage.setItem('username', currentUsername);
          localStorage.setItem('playlists', JSON.stringify(response.data.items));
          // setting playlist prompts the redirect
          setPlaylists(response.data.items);
          return;
        }
        else {
          throw new Error();
        }
      })
      .catch((error) => {
        setErrorMsg('block');
        setUsernameReady(false);
      });
  }, [usernameReady]);

  if (playlists.length)  {
    return <Redirect to={{ pathname: "/playlists", username: username, playlists: playlists}} />;
  }
  else {
    return (
      <div id="home">
        <Nav />
        <p className="home-hint">
          Enter your Spotify username below
          <span className="clickable"
            onClick = { () => setUsernameReady('trymine') }>
            (or try mine!)
          </span>
        </p>
        <p className="home-hint">
          <br />
          <span style={{display: errorMsg}}>
            Oops!Looks like there was a problem. <br />
            Does {username} exist ? <br / >
              <a href={ `https://open.spotify.com/user/${username}` }
                target="_blank"
                rel="noopener noreferrer">
                Check here.
              </a>
            </span>
          </p>
          <div className="btn-container">
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Spotify username"
              required
            />

          <button className="btn btn--home"
            onClick={ () => setUsernameReady(true) }>
            Go!
          </button>
        </div>
        <div className="bands">
          <p /><p /><p />
        </div>
      </div>
    );
  }
}

export default Home;
