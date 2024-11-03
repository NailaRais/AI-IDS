// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IntrusionDetection {
    struct Alert {
        uint id;
        string description;
        address sender;
        uint timestamp;
    }

    Alert[] public alerts;
    uint public alertCount;

    function logAlert(string memory _description) public {
        alertCount++;
        alerts.push(Alert(alertCount, _description, msg.sender, block.timestamp));
    }

    function getAlerts() public view returns (Alert[] memory) {
        return alerts;
    }
}
