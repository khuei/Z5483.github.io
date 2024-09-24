import React, { useState } from 'react';

import './Header.css';

function Header({ onChangeTab, currentTab }) {
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
                            href="/about-me"
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
                    <li>
                        <a
                            href="/gallery"
                            className="header-menu-item"
                            onClick={(e) => {
                                e.preventDefault();

                                if (currentTab >= 0)
                                    handleChange(-1);
                                else
                                    handleChange(0);
                            }}
                        >
                            { currentTab >= 0 ? "Professional" : "Personal"}
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
