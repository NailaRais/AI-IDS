import React, { useState, useEffect, useContext } from 'react';
import Web3 from 'web3';
import { Web3Context } from '../Web3Provider';
import IntrusionDetection from '../abis/IntrusionDetection.json';

const Dashboard = () => {
    const [alerts, setAlerts] = useState([]);
    const [description, setDescription] = useState('');
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState('');
    const web3 = useContext(Web3Context); // Use Web3 context

    useEffect(() => {
        const initContract = async () => {
            if (!web3) return; // Wait until web3 is initialized

            // Set up account
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);

            // Set up contract
            const networkId = await web3.eth.net.getId();
            const networkData = IntrusionDetection.networks[networkId];
            if (networkData) {
                const contractInstance = new web3.eth.Contract(IntrusionDetection.abi, networkData.address);
                setContract(contractInstance);
                loadAlerts(contractInstance);
            } else {
                console.error('Smart contract not deployed to detected network.');
            }
        };

        const loadAlerts = async (contractInstance) => {
            const count = await contractInstance.methods.getAlertCount().call();
            const alertsArray = [];
            for (let i = 0; i < count; i++) {
                const alert = await contractInstance.methods.getAlert(i).call();
                alertsArray.push(alert);
            }
            setAlerts(alertsArray);
        };

        initContract();
    }, [web3]); // Only re-run when web3 changes

    const logAlert = async () => {
        if (contract && account) {
            await contract.methods.logAlert(description).send({ from: account });
            setDescription('');
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
                    <li key={index}>{alert.description} at {new Date(alert.timestamp * 1000).toString()}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
