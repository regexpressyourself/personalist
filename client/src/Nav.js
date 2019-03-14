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
