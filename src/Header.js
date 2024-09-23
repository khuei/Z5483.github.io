import React, { useState } from 'react';
import './Header.css';

function Header({ onChangeTab }) {
    const handleChange = (newValue) => {
        onChangeTab(newValue);
    };

    return (
        <header>
            <h1 className="header-logo">
                <a href="/" className="header-menu-item">khuen</a>
            </h1>
            <nav>
                <ul className="header-menu">
                    <li>
                        <a
                            href="/"
                            className="header-menu-item"
                            id="header-item-home"
                            onClick={(e) => {
                                e.preventDefault();
                                handleChange(0);
                            }}
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="/about-me.html"
                            className="header-menu-item"
                            id="header-item-about-me"
                            onClick={(e) => {
                                e.preventDefault();
                                handleChange(1);
                            }}
                        >
                            About Me
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
