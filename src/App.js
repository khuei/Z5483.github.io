import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Home from "./Home.js";
import Blog from "./Blog.js";
import AboutMe from "./AboutMe.js";
import Header from "./Header.js";

import FavoriteFont from "./blog/FavoriteFont.js";
import CollegeProductivity from "./blog/CollegeProductivity.js";
import VinylAnatomy from "./blog/VinylAnatomy.js";
import MakingCoffee from "./blog/MakingCoffee.js";

function App() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [tabHistory, setTabHistory] = useState([0]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [direction, setDirection] = useState("");

  const handleTabChange = (newValue) => {
    // Determine direction for left/right animation based on tab change
    if (newValue < selectedTab) {
      setDirection("left");
    } else {
      setDirection("right");
    }

    const newHistory = [...tabHistory.slice(0, historyIndex + 1), newValue];
    setTabHistory(newHistory);
    setHistoryIndex(historyIndex + 1);
    setSelectedTab(newValue);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setDirection("up"); // Apply "up" animation for back
      setHistoryIndex(historyIndex - 1);
      setSelectedTab(tabHistory[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < tabHistory.length - 1) {
      setDirection("down"); // Apply "down" animation for forward
      setHistoryIndex(historyIndex + 1);
      setSelectedTab(tabHistory[historyIndex + 1]);
    }
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
        // Check the direction from the history state
        if (event.state.direction === "back") {
          goBack(); // Go back
        } else if (event.state.direction === "forward") {
          goForward(); // Go forward
        }
      }
    };

    const handleMouseBackForward = (event) => {
      if (event.button === 3) {
        event.preventDefault();
        goBack(); // Mouse button 3 for back
      } else if (event.button === 4) {
        event.preventDefault();
        goForward(); // Mouse button 4 for forward
      }
    };

    window.addEventListener("popstate", handleBackForwardNavigation);
    window.addEventListener("mouseup", handleMouseBackForward);

    return () => {
      window.removeEventListener("popstate", handleBackForwardNavigation);
      window.removeEventListener("mouseup", handleMouseBackForward);
    };
  }, [tabHistory, historyIndex, selectedTab]);

  return (
    <div className="App">
      <Header onChangeTab={handleTabChange} currentTab={selectedTab} />
      <TransitionGroup>
        <CSSTransition
          key={selectedTab}
          timeout={300}
          classNames="fade"
          onEnter={(node) =>
            Object.assign(
              node.style,
              getTransitionStyles("entering", direction),
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
            {selectedTab === 0 && <Home onChangeTab={handleTabChange} />}
            {selectedTab === 1 && <Blog onChangeTab={handleTabChange} />}
            {selectedTab === 2 && <AboutMe />}
            {selectedTab === 100 && <FavoriteFont />}
            {selectedTab === 101 && <CollegeProductivity />}
            {selectedTab === 102 && <VinylAnatomy />}
            {selectedTab === 103 && <MakingCoffee />}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
