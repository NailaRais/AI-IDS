import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import IntrusionDetection from '../abis/IntrusionDetection.json';

const Dashboard = () => {
    const [alerts, setAlerts] = useState([]); // State for storing alerts
    const [description, setDescription] = useState(''); // State for input field
    const [contract, setContract] = useState(null); // State for contract instance
    const [account, setAccount] = useState(''); // State for user account

    useEffect(() => {
        const initWeb3 = async () => {
            // Initialize Web3
            const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

            // Set up account
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);

            // Set up contract
            const networkId = await web3.eth.net.getId();
            const networkData = IntrusionDetection.networks[networkId];

            if (networkData) {
                const contractInstance = new web3.eth.Contract(IntrusionDetection.abi, networkData.address);
                setContract(contractInstance);
                loadAlerts(contractInstance); // Load alerts after setting the contract
            } else {
                console.error('Smart contract not deployed to detected network.');
            }
        };

        const loadAlerts = async (contractInstance) => {
            // Load alerts from the smart contract
            const response = await contractInstance.methods.getAlerts().call();
            setAlerts(response);
        };

        initWeb3(); // Initialize Web3 on component mount
    }, []);

    const logAlert = async () => {
        // Log an alert to the smart contract
        if (contract && account) {
            await contract.methods.logAlert(description).send({ from: account });
            setDescription(''); // Clear input field after logging
            loadAlerts(contract); // Reload alerts after logging a new one
        } else {
            console.error('Contract or account not loaded.');
        }
    };

    return (
        <div>
            <h1>Intrusion Alerts</h1>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Alert Description"
            />
            <button onClick={logAlert}>Log Alert</button>
            <ul>
                {alerts.map((alert, index) => (
                    <li key={index}>
                        {alert.description} at {new Date(alert.timestamp * 1000).toString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
