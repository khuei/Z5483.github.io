import React, { useState, useEffect } from "react";
import "./Header.css";

import Box from "@mui/material/Box";
import { MdMenu } from "react-icons/md";

function Header({ onChangeTab, currentTab }) {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const handleChange = (newValue) => {
    onChangeTab(newValue);
    toggleMenu();
  };

  const toggleMenu = () => {
    if (showMenu) {
      setAnimationClass("slide-up-animation");
      setTimeout(() => {
        setShowMenu(false);
        setAnimationClass("");
      }, 500);
    } else {
      setShowMenu(true);
      setAnimationClass("slide-down-animation");
    }
  };

  useEffect(() => {
    handleResize();
    setIsHydrated(true);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isHydrated) {
    return null;
  }

  return (
    <>
      {isMobile ? (
        <header>
          <h1 className="header-logo">
            <MdMenu onClick={toggleMenu} />
          </h1>
          {showMenu && (
            <Box
              className={animationClass}
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100dvw",
                height: "95dvh",
                marginTop: "5dvh",
                bgcolor: "rgba(0, 0, 0, 0.01)",
                backdropFilter: "blur(50px)",
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
                      href="/blog"
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
                      href="/about-me"
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
            </Box>
          )}
        </header>
      ) : (
        <header>
          <h1 className="header-logo">
            <a href="/" className="header-menu-item">
              khuen
            </a>
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
                  href="/blog"
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
                  href="/about-me"
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
      )}
    </>
  );
}

export default Header;
