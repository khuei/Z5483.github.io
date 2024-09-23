import React from 'react';
import './Header.css';

function Header() {
  return (
    <header>
      <h1 className="header-logo">
        <a href="/" className="header-menu-item">khuen</a>
      </h1>
      <nav>
        <ul className="header-menu">
          <li><a href="/" className="header-menu-item" id="header-item-home">Home</a></li>
          <li><a href="/blog/" className="header-menu-item" id="header-item-blog">Blog</a></li>
          <li><a href="/about-me.html" className="header-menu-item" id="header-item-about-me">About Me</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

