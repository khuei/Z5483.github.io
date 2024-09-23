import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Home from './Home.js';
import AboutMe from './AboutMe.js';
import Header from './Header.js';

function App() {
    const [selectedTab, setSelectedTab] = useState(0);
    const [direction, setDirection] = useState('right'); // Track direction

    const handleTabChange = (newValue) => {
        if (newValue !== selectedTab) {
            setDirection(newValue > selectedTab ? 'right' : 'left');
            setSelectedTab(newValue);
        }
    };

    const getTransitionStyles = (state) => {
        const baseStyle = {
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            opacity: 0,
        };

        if (state === 'entering') {
            return direction === 'right'
                ? { ...baseStyle, transform: 'translateX(100%)' }
                : { ...baseStyle, transform: 'translateX(-100%)' };
        }

        if (state === 'entered') {
            return { transform: 'translateX(0)', opacity: 1 };
        }

        if (state === 'exiting') {
            return direction === 'right'
                ? { transform: 'translateX(-100%)', opacity: 0 }
                : { transform: 'translateX(100%)', opacity: 0 };
        }

        return baseStyle;
    };

    return (
        <div className="App">
            <Header onChangeTab={handleTabChange} />
            <TransitionGroup>
                <CSSTransition
                    key={selectedTab}
                    timeout={200}
                    onEnter={(node) => Object.assign(node.style, getTransitionStyles('entering'))}
                    onEntered={(node) => Object.assign(node.style, getTransitionStyles('entered'))}
                    onExit={(node) => Object.assign(node.style, getTransitionStyles('exiting'))}
                >
                    <div style={getTransitionStyles('entered')}>
                        {selectedTab === 0 ? (
                            <Home onChangeTab={handleTabChange} />
                        ) : (
                            <AboutMe onChangeTab={handleTabChange} />
                        )}
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
}

export default App;
