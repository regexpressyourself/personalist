import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';
import Loading from './Loading';
import Song from './Song';

function Songs(props) {
  const [username, setUsername] = useState(
    props.location.username ||
    localStorage.getItem('username')
  );
  const [chosenPlaylist, setChosenPlaylist] = useState(
    props.location.chosenPlaylist ||
    JSON.parse(localStorage.getItem('chosenPlaylist'))
  );
  const [playlistSongs, setPlaylistSongs] = useState(false)
  const [playlistSongView, setPlaylistSongView] = useState(false)

  useEffect(() => {
    // get the playlists on load
    // if no playlist is in state, redirect to the home page
    if (!chosenPlaylist) {window.location.href = '/'; return;}
    axios.get(`https://localhost:3000/playlist?user=${username}&list=${chosenPlaylist.id}`)
      .then((response) => {
        setPlaylistSongs(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!playlistSongs) {return;}
    let data = playlistSongs;
    let items = [];
    for (let song of data) {
      items.push(
        <Song key={song.id}
          songId={song.id}
          songDescription={song.description}
          songName={song.name}
          messinaId={song.messinaId} />
      );
    }
    items.push(<div key="player" id="embed-player"></div>);
    setPlaylistSongView(items);
  }, [playlistSongs]);

  if (!playlistSongView) {
    return (
      <div id="songs">
        <Nav username={username}
          playlistName={chosenPlaylist.name}
          playlistId={chosenPlaylist.id} />
        <Loading />
      </div>
    );
  }
  else {
    return (
      <div id="songs">
        <div className="save-confirmation">
          <p className="big">Save Successful!</p>
        </div>
        <Nav username={username}
          playlistName={chosenPlaylist.name}
          playlistId={chosenPlaylist.id} />
        <main id="main">
          {playlistSongView}
        </main>
      </div>
    );
  }
}

export default Songs;
