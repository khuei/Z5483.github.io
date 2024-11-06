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

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
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
      <Header />
      <div>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
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
    </div>
  );
}

export default App;
