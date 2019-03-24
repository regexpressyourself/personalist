import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Loading from './Loading';
import { Redirect } from 'react-router'

function Playlists(props) {
  const [username, setUsername] = useState(
    props.location.username ||
    localStorage.getItem('username')
  );
  const [playlists, setPlaylists] = useState(
    props.location.playlists ||
    JSON.parse(localStorage.getItem('playlists'))
  );
  const [playlistItems, setPlaylistItems] = useState('');
  const [chosenPlaylist, setChosenPlaylist] = useState(false);

  useEffect(() => {
    // create the playlist elements and push them to playlistItems on load
    let data = playlists;
    if (data === undefined) {return;}
    let items = [];
    for (let i = 0; i < data.length; i++) {
      let playlist = data[i];
      let oddEvenModifier = (i % 2 === 0) ? 'odd' : 'even';
      items.push(
        <p key={i} className={`playlist playlist--${oddEvenModifier}`}>
          <span className={`playlist__pointer playlist__pointer--${oddEvenModifier}`}></span>
          <button className={`playlist__link playlist__link--${oddEvenModifier}`}
            onClick={() => setChosenPlaylist({id: playlist.id, name: playlist.name})}>
            <span>
              {playlist.name}
            </span>
          </button>
        </p>
      );
    }
    setPlaylistItems(items);
  }, []);

  useEffect(() => {
    // store the playlist when one is chosen for functionality across refresh
    localStorage.setItem('chosenPlaylist', JSON.stringify(chosenPlaylist));
  }, [chosenPlaylist]);


  // playlist has been chosen, redirect to songs component
  if (chosenPlaylist) {
    return <Redirect to={{ pathname: "/songs", chosenPlaylist: chosenPlaylist, username: username }} />;
  }

  // Loading screen
  else if (!playlistItems) {
    return (
      <div id="lists">
        <Nav username={username} />
        <Loading />
      </div>
    );
  }

  // No playlists to show
  else if (playlistItems.length === 0) {
    return (
      <div id="lists">
        <Nav username={username} />
        <main>
          <p className="error-text">Oops! Looks like that user doesn't have any playlists.</p>
          <p className="error-text"><a href="/">Go home.</a></p>
        </main>
      </div>
    );
  }

  // Playlists are all set
  else {
    return (
      <div id="lists">
        <Nav username={username} />
        <main id="main">
          {playlistItems}
        </main>
      </div>
    )
  }
}

export default Playlists;
