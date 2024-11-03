import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import IntrusionDetection from '../abis/IntrusionDetection.json';

const Dashboard = () => {
    const [alerts, setAlerts] = useState([]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        const loadAlerts = async () => {
            const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
            const networkId = await web3.eth.net.getId();
            const contractAddress = IntrusionDetection.networks[networkId].address;
            const contract = new web3.eth.Contract(IntrusionDetection.abi, contractAddress);

            const response = await contract.methods.getAlerts().call();
            setAlerts(response);
        };

        loadAlerts();
    }, []);

    const logAlert = async () => {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        const accounts = await web3.eth.getAccounts();
        const contract = new web3.eth.Contract(IntrusionDetection.abi, contractAddress);

        await contract.methods.logAlert(description).send({ from: accounts[0] });
        setDescription('');
        // Reload alerts
        loadAlerts();
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
                {alerts.map(alert => (
                    <li key={alert.id}>{alert.description} at {new Date(alert.timestamp * 1000).toString()}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
