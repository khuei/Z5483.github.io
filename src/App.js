import React, { useState } from 'react';

import Home from './Home.js';
import AboutMe from './AboutMe.js';
import Header from './Header.js';

function App() {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <div className="App">
            <Header onChangeTab={handleTabChange} />
            {selectedTab === 0 && <Home onChangeTab={handleTabChange} />}
            {selectedTab === 1 && <AboutMe onChangeTab={handleTabChange} />}
        </div>
    );
}

export default App;
