import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Home from './Home.js';
import Blog from './Blog.js';
import AboutMe from './AboutMe.js';
import Header from './Header.js';

import CollegeProductivity from './blog/CollegeProductivity.js';
import VinylAnatomy from './blog/VinylAnatomy.js';
import MakingCoffee from './blog/MakingCoffee.js';

function App() {
    const [selectedTab, setSelectedTab] = useState(0);
    const [tabHistory, setTabHistory] = useState([0]); // Initialize history with the first tab
    const [historyIndex, setHistoryIndex] = useState(0);
    const [direction, setDirection] = useState('right');

    const handleTabChange = (newValue) => {
        // Update the direction based on the new tab
        if (newValue < selectedTab) {
            setDirection('left'); // Going left in history
        } else {
            setDirection('right'); // Going right in history
        }

        // Update the tab history
        const newHistory = [...tabHistory.slice(0, historyIndex + 1), newValue];
        setTabHistory(newHistory);
        setHistoryIndex(historyIndex + 1); // Move history index forward
        setSelectedTab(newValue);
    };

    const goBack = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            setSelectedTab(tabHistory[historyIndex - 1]);
        }
    };

    const goForward = () => {
        if (historyIndex < tabHistory.length - 1) {
            setHistoryIndex(historyIndex + 1);
            setSelectedTab(tabHistory[historyIndex + 1]);
        }
    };

    const getTransitionStyles = (state, direction) => {
        const baseStyle = {
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            opacity: 0,
        };

        if (state === 'entering') {
            if (direction === 'right') {
                return { ...baseStyle, transform: 'translateX(100%)' };
            } else if (direction === 'left') {
                return { ...baseStyle, transform: 'translateX(-100%)' };
            }
        }

        if (state === 'entered') {
            return { transform: 'translateX(0)', opacity: 1 };
        }

        if (state === 'exiting') {
            if (direction === 'right') {
                return { ...baseStyle, transform: 'translateX(-100%)' };
            } else if (direction === 'left') {
                return { ...baseStyle, transform: 'translateX(100%)' };
            }
        }

        return baseStyle;
    };

    useEffect(() => {
        const handleMouseBackButton = (event) => {
            if (event.button === 3) { // Mouse back button
                goBack();
            } else if (event.button === 4) { // Mouse forward button
                goForward();
            }
        };

        window.addEventListener('mouseup', handleMouseBackButton);

        return () => {
            window.removeEventListener('mouseup', handleMouseBackButton);
        };
    }, [tabHistory, historyIndex]); // Dependencies updated to include history

    return (
        <div className="App">
            <Header onChangeTab={handleTabChange} currentTab={selectedTab} />
            <TransitionGroup>
                <CSSTransition
                    key={selectedTab}
                    timeout={300}
                    classNames="fade"
                    onEnter={(node) => Object.assign(node.style, getTransitionStyles('entering', direction))}
                    onEntered={(node) => Object.assign(node.style, getTransitionStyles('entered', direction))}
                    onExit={(node) => Object.assign(node.style, getTransitionStyles('exiting', direction))}
                >
                    <div style={getTransitionStyles('entered', direction)}>
                        {selectedTab === 0 && <Home onChangeTab={handleTabChange} />}
                        {selectedTab === 1 && <Blog onChangeTab={handleTabChange} />}
                        {selectedTab === 2 && <AboutMe />}
                        {selectedTab === 100 && <CollegeProductivity />}
                        {selectedTab === 101 && <VinylAnatomy />}
                        {selectedTab === 102 && <MakingCoffee />}
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
}

export default App;
