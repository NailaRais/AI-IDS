import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

export const Web3Context = React.createContext();

const Web3Provider = ({ children }) => {
    const [web3, setWeb3] = useState(null);

    useEffect(() => {
        const initializeWeb3 = async () => {
            try {
                const web3Instance = new Web3(Web3.givenProvider || "http://localhost:8545");
                setWeb3(web3Instance);
            } catch (error) {
                console.error("Failed to connect to Web3 provider:", error);
            }
        };
        initializeWeb3();
    }, []);

    if (!web3) {
        return <div>Loading Web3...</div>;
    }

    return (
        <Web3Context.Provider value={web3}>
            {children}
        </Web3Context.Provider>
    );
};

export default Web3Provider;
