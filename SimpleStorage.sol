// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStorage {
    string public message;
    address public owner;
    uint256 public updateCount;

    event MessageUpdated(address indexed user, string newMessage);

    constructor(string memory _msg) {
        message = _msg;
        owner = msg.sender;
    }

    function setMessage(string memory _newMessage) public {
        message = _newMessage;
        updateCount++;
        emit MessageUpdated(msg.sender, _newMessage);
    }
}