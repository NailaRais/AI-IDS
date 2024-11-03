import React from 'react';
import Dashboard from './components/Dashboard';
import Web3Provider from './Web3Provider';

const App = () => {
    return (
        <Web3Provider>
            <Dashboard />
        </Web3Provider>
    );
};

export default App;
