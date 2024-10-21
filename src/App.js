import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Home from "./Home";
import Blog from "./Blog";
import AboutMe from "./AboutMe";
import Header from "./Header";

import FavoriteFont from "./blog/FavoriteFont";
import CollegeProductivity from "./blog/CollegeProductivity";
import VinylAnatomy from "./blog/VinylAnatomy";
import MakingCoffee from "./blog/MakingCoffee";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [direction, setDirection] = useState("");

  const handleTabChange = (newValue) => {
    const currentPath = location.pathname;

    if (newValue === 0 && currentPath !== "/") {
      setDirection("right");
      navigate("/");
    } else if (newValue === 1 && currentPath !== "/blog") {
      setDirection("right");
      navigate("/blog");
    } else if (newValue === 2 && currentPath !== "/about-me") {
      setDirection("right");
      navigate("/about-me");
    }
  };

  const goBack = () => {
    setDirection("up");
    navigate(-1);
  };

  const goForward = () => {
    setDirection("down");
    navigate(1);
  };

  const getTransitionStyles = (state, direction) => {
    const baseStyle = {
      transition: "transform 0.3s ease, opacity 0.3s ease",
      opacity: 0,
    };

    if (state === "entering") {
      if (direction === "right") {
        return { ...baseStyle, transform: "translateX(100%)" };
      } else if (direction === "left") {
        return { ...baseStyle, transform: "translateX(-100%)" };
      } else if (direction === "up") {
        return { ...baseStyle, transform: "translateY(-100%)" };
      } else if (direction === "down") {
        return { ...baseStyle, transform: "translateY(100%)" };
      }
    }

    if (state === "entered") {
      return { transform: "translateX(0)", opacity: 1 };
    }

    if (state === "exiting") {
      if (direction === "right") {
        return { ...baseStyle, transform: "translateX(-100%)" };
      } else if (direction === "left") {
        return { ...baseStyle, transform: "translateX(100%)" };
      } else if (direction === "up") {
        return { ...baseStyle, transform: "translateY(100%)" };
      } else if (direction === "down") {
        return { ...baseStyle, transform: "translateY(-100%)" };
      }
    }

    return baseStyle;
  };

  useEffect(() => {
    const handleBackForwardNavigation = (event) => {
      if (event.state) {
        if (event.state.direction === "back") {
          goBack();
        } else if (event.state.direction === "forward") {
          goForward();
        }
      }
    };

    const handleMouseBackForward = (event) => {
      if (event.button === 3) {
        event.preventDefault();
        goBack();
      } else if (event.button === 4) {
        event.preventDefault();
        goForward();
      }
    };

    window.addEventListener("popstate", handleBackForwardNavigation);
    window.addEventListener("mouseup", handleMouseBackForward);

    return () => {
      window.removeEventListener("popstate", handleBackForwardNavigation);
      window.removeEventListener("mouseup", handleMouseBackForward);
    };
  }, []);

  return (
    <div className="App">
      <Header onChangeTab={handleTabChange} />
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={300}
          classNames="fade"
          onEnter={(node) =>
            Object.assign(
              node.style,
              getTransitionStyles("entering", direction)
            )
          }
          onEntered={(node) =>
            Object.assign(node.style, getTransitionStyles("entered", direction))
          }
          onExit={(node) =>
            Object.assign(node.style, getTransitionStyles("exiting", direction))
          }
        >
          <div style={getTransitionStyles("entered", direction)}>
            <Routes location={location}>
              <Route path="/" element={<Home onChangeTab={handleTabChange} />} />
              <Route path="/blog" element={<Blog onChangeTab={handleTabChange} />} />
              <Route path="/about-me" element={<AboutMe />} />
              <Route path="/blog/favorite-font" element={<FavoriteFont />} />
              <Route
                path="/blog/college-productivity"
                element={<CollegeProductivity />}
              />
              <Route path="/blog/vinyl-anatomy" element={<VinylAnatomy />} />
              <Route path="/blog/making-coffee" element={<MakingCoffee />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
