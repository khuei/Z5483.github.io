import React, { useState } from 'react';
import './Header.css';

function Header({ onChangeTab }) {
    const [value, setValue] = useState(0);

    const handleChange = (newValue) => {
        setValue(newValue);
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
                            href="/blog/"
                            className="header-menu-item"
                            id="header-item-blog"
                            onClick={(e) => {
                                e.preventDefault();
                                handleChange(1);
                            }}
                        >
                            Blog
                        </a>
                    </li>
                    <li>
                        <a
                            href="/about-me.html"
                            className="header-menu-item"
                            id="header-item-about-me"
                            onClick={(e) => {
                                e.preventDefault();
                                handleChange(2);
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
