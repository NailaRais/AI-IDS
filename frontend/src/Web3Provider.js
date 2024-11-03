import React from 'react';
import Web3 from 'web3';

export const Web3Context = React.createContext();

export const Web3Provider = ({ children }) => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

    return (
        <Web3Context.Provider value={web3}>
            {children}
        </Web3Context.Provider>
    );
};
