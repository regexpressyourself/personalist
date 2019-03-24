import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Song(props) {
  const playIcon = <svg className="feather feather-play sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>;

  const pauseIcon = <svg className="feather feather-x sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

  const [songId, setSongId] = useState(props.songId);
  const [songName, setSongName] = useState(props.songName);
  const [messinaId, setMessinaId] = useState(props.messinaId);
  const [songDescription, setSongDescription] = useState(props.songDescription);
  const [hasDescription, setHasDescription] = useState(props.songDescription.length > 0 ? 'has-description' : '');
  const [isShown, setIsShown] = useState('hidden');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(playIcon);

  useEffect(() => {
    // change out has-description class to trigger styles
    setHasDescription(songDescription.length > 0 ? 'has-description' : '');
  }, [songDescription]);

  useEffect(() => {
    // change out icon and display/hide Spotify player
    if (isPlaying) {
      document.querySelector(`#embed-player`).innerHTML = `
        <iframe src="https://open.spotify.com/embed/track/${songId}"
          width="100%"
          height="80"
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media">
        </iframe>`;
      setCurrentIcon(pauseIcon);
    }
    else {
      document.querySelector(`#embed-player`).innerHTML = ``;
      setCurrentIcon(playIcon);
    }
  }, [isPlaying]);

  return (
    <div key={songId}
      className={`song-item song-item--${isShown} ${hasDescription}`}>
      <span className={`song-item__name__play song-item__name__play--${isPlaying}`}
        onClick={(e) => setIsPlaying(!isPlaying)}>
        {currentIcon}
      </span>

      {/* Song name and play/pause icon */}
      <p className={`song-item__name clickable`}
        onClick={(e) => setIsShown(isShown === 'hidden' ? 'shown' : 'hidden')}>

        <span>{songName}</span>
      </p>

      {/* Song description */}
      <div className={`song-item__description`}>

        <textarea type="text"
          placeholder="Write a little something about the song"
          onChange={ (e) => setSongDescription(e.target.value) }
          defaultValue={songDescription}>
        </textarea>

        <div className="song-item__description__btn-container">
          <button className="save-btn clickable"
            onClick={() => updateSong(messinaId, songDescription)}>
            Save
          </button>
          <button className="cancel-btn clickable"
            onClick={(e) => setIsShown(isShown === 'hidden' ? 'shown' : 'hidden')}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

function updateSong(id, newDescription) {
  const urlPrefix = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

  // post the new song description to Node for storage
  let payload = [{
    'id': id,
    'description': newDescription
  }];
  axios.post(`${urlPrefix}/api/playlist`, payload)
    .then((response) => {
      let saveConfirmation = document.querySelector('.save-confirmation');
      saveConfirmation.classList.add('save-confirmation--on');
      setTimeout(() => {
        saveConfirmation.classList.remove('save-confirmation--on');
      }, 3000);
      return;
    })
    .catch((error) => {
      console.log(error);
    });
}
export default Song;
