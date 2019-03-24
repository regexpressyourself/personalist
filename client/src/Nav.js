import React from 'react';
import whiteLogo from './static/images/personalist-white.png';
import orangeLogo from './static/images/personalist-orange.png';

function Nav(props) {
  if (window.location.pathname === '/') {
    // homepage header take full screen
    return (
      <header>
        <a className="header-img-container header-img-container--home"
          title="Personalist Home"
          href="/">
          <img className="header-img header-img--home" src={whiteLogo} alt="PersonaList" />
        </a>
      </header>
    );
  }
  else if (props.playlistName && props.username) {
    // Show both playlist and username
    document.title = `${props.playlistName} by ${props.username} | personaList`;
    return (
      <header>
        <a className="header-img-container" title="Personalist Home" href="/">
          <img className="header-img" src={orangeLogo} alt="PersonaList" />
        </a>
        <h1>
          <a target="_blank"
            rel="noopener noreferrer"
            className="header-h1 has-subhead"
            title={`${props.username}'s ${props.playlistName} playlist`}
            href={`https://open.spotify.com/playlist/${props.playlistId}`}>
            {props.playlistName}
          </a>
          <a target="_blank"
            rel="noopener noreferrer"
            className="subheader"
            title={`${props.username}'s profile`}
            href={`https://open.spotify.com/user/${props.username}`}>
            by {props.username}
          </a>
        </h1>
      </header>
    );
  }
  else if (props.username) {
    // Show just username
    document.title = `${props.username}'s playlists | personaList`;
    return (
      <header>
        <a className="header-img-container" title="Personalist Home" href="/">
          <img className="header-img" src={orangeLogo} alt="PersonaList" />
        </a>
        <h1>
          <a target="_blank"
            rel="noopener noreferrer"
            className="header-h1"
            title={`${props.username}'s profile`}
            href={`https://open.spotify.com/user/${props.username}`}>
            {props.username}
          </a>
        </h1>
      </header>
    );
  }
  else {
    return (
      <header>
        <a className="header-img-container" title="Personalist Home" href="/">
          <img className="header-img" src={orangeLogo} alt="PersonaList" />
        </a>
      </header>
    );
  }
}

export default Nav;
