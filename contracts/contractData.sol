//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract contractData {
    address public owner;
    uint256[] public lotteryNumber;
    struct lotteryInfo {
        uint256 lotteryPrice;
        uint256 openTime;
        uint256 closeTime;
        bool isOpen;
    }

    mapping(uint256 => lotteryInfo) lottery;
}
