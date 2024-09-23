import React from 'react';

import './Footer.css';
import IconLinks from './IconLinks.js';

function Footer() {
  return (
    <footer>
      <center>
        <ul className="footer-site-map">
          <li style={{ display: 'inline' }}>
            <a href="/index.html" className="footer-image-anchor">Home</a>
          </li>
          <li style={{ display: 'inline' }}>
            <a href="/blog/index.html" className="footer-image-anchor">Blog</a>
          </li>
          <li style={{ display: 'inline' }}>
            <a href="/archive/index.html" target="_blank" className="footer-image-anchor">Archive</a>
          </li>
          <li style={{ display: 'inline' }}>
            <a href="/about-me.html" target="_blank" className="footer-image-anchor">About</a>
          </li>
        </ul>
      </center>
      <center>
        <ul className="footer-body-link-menu">
            <IconLinks inputColor='white' />
        </ul>
      </center>
    </footer>
  );
}

export default Footer;

