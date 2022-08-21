//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.16;

import "hardhat/console.sol";

contract Token {

    string public name = "My Token";
    string public symbol = "YB";

    uint256 public totalSupply = 1000000;

    address public owner = msg.sender; // just for testing

    mapping(address => uint256) balances;


    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    constructor() {
        balances[msg.sender] = totalSupply;
    }

    /**
     * minting function
     */
    function mint(uint256 amount) public {
        require(msg.sender == owner, "Only the owner can burn coins");

        balances[msg.sender] += amount;
    }

    /**
     * burning function
     */
    function burn(uint256 amount) public {
        require(msg.sender == owner, "Only the owner can burn coins");
        require(
            balances[msg.sender] >= amount,
            "The amount can't exceed the owner's balance"
        );

        balances[msg.sender] -= amount;
    }

    /**
     * get balance of address
     */
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
