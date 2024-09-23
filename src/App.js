import React, { useState } from 'react';
import Home from './Home.js';
import AboutMe from './AboutMe.js';

import Header from './Header.js';
import Footer from './Footer.js';

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
            <Footer />
        </div>
    );
}

export default App;
