import React, { Component } from 'react';
import whiteLogo from './static/images/personalist-white.png';
import orangeLogo from './static/images/personalist-orange.png';

class Nav extends Component {
  render() {
    if (window.location.pathname === '/') {
      return (
        <header>
          <a className="header-img-container header-img-container--home" title="Personalist Home" href="/">
            <img className="header-img header-img--home" src={whiteLogo} alt="PersonaList" />
          </a>
        </header>
      );
    }
    else if (this.props.playlist && this.props.username) {
      return (
        <header>
          <a className="header-img-container" title="Personalist Home" href="/">
            <img className="header-img" src={orangeLogo} alt="PersonaList" />
          </a>
          <h1>
            <a target="_blank"
              rel="noopener noreferrer"
              className="header-h1 has-subhead"
              title={`${this.props.username}'s ${this.props.playlist.name} playlist`}
              href={`https://open.spotify.com/playlist/${this.props.playlist.id}`}>
              {this.props.playlist.name}
            </a>
            <a target="_blank"
              rel="noopener noreferrer"
              className="subheader"
              title={`${this.props.username}'s profile`}
              href={`https://open.spotify.com/user/${this.props.username}`}>
              by {this.props.username}
            </a>
          </h1>
        </header>
      );
    }
    else if (this.props.username) {
      return (
        <header>
          <a className="header-img-container" title="Personalist Home" href="/">
            <img className="header-img" src={orangeLogo} alt="PersonaList" />
          </a>
          <h1>
            <a target="_blank" rel="noopener noreferrer" className="header-h1" title={`${this.props.username}'s profile`} href={`https://open.spotify.com/user/${this.props.username}`}>{this.props.username}</a>
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
}

export default Nav;
