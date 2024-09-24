import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Home from './Home.js';
import AboutMe from './AboutMe.js';
import Header from './Header.js';
import Personal from './Personal.js';

function App() {
    const [selectedTab, setSelectedTab] = useState(0);
    const [direction, setDirection] = useState('right'); // Track direction

    const handleTabChange = (newValue) => {
        // Detect if we're switching between negative and positive values
        if (newValue < 0 && selectedTab >= 0) {
            setDirection('down'); // Slide down when going from positive to negative
        } else if (newValue >= 0 && selectedTab < 0) {
            setDirection('up'); // Slide up when going from negative to positive
        } else if (newValue > selectedTab) {
            setDirection('right'); // Horizontal right transition
        } else {
            setDirection('left'); // Horizontal left transition
        }

        setSelectedTab(newValue);
    };

    const getTransitionStyles = (state) => {
        const baseStyle = {
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            opacity: 0,
        };

        // Horizontal transitions (right or left)
        if (state === 'entering') {
            if (direction === 'right') {
                return { ...baseStyle, transform: 'translateX(100%)' };
            } else if (direction === 'left') {
                return { ...baseStyle, transform: 'translateX(-100%)' };
            } else if (direction === 'up') {
                // Vertical transition - slide up
                return { ...baseStyle, transform: 'translateY(100%)' };
            } else if (direction === 'down') {
                // Vertical transition - slide down
                return { ...baseStyle, transform: 'translateY(-100%)' };
            }
        }

        if (state === 'entered') {
            // Return to neutral state without applying new transforms (this avoids double animation)
            return { transform: 'translateX(0)', opacity: 1 };
        }

        return baseStyle;
    };

    useEffect(() => {
        const setDesktopViewport = () => {
            const isMobile = window.innerWidth < 1024;
            if (isMobile) {
                document.body.style.minWidth = '1024px';
            }
        };

        setDesktopViewport();
        window.addEventListener('resize', setDesktopViewport);

        return () => window.removeEventListener('resize', setDesktopViewport);
    }, []);

    return (
        <div className="App">
            <Header onChangeTab={handleTabChange} currentTab={selectedTab} />
            <TransitionGroup>
                <CSSTransition
                    key={selectedTab}
                    timeout={200}
                    onEnter={(node) => Object.assign(node.style, getTransitionStyles('entering'))}
                    onEntered={(node) => Object.assign(node.style, getTransitionStyles('entered'))}
                    onExit={(node) => Object.assign(node.style, getTransitionStyles('exiting'))}
                >
                    <div style={getTransitionStyles('entered')}>
                        {selectedTab === 0 && <Home />}
                        {selectedTab === 1 && <AboutMe />}
                        {selectedTab === -1 && <Personal />}
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
}

export default App;
