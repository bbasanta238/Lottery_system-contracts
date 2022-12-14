//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract ContractData {
	address public owner;
	uint256 lotteryNumber;
	address[] participant;
	uint256 public lotteryPool;
	struct lotteryInfo {
		uint256 lotteryPrice;
		uint256 openTime;
		uint256 closeTime;
		bool isOpen;
		bool isWinnerSelected;
	}

	mapping(uint256 => lotteryInfo) lottery;
	mapping(address => bool) applied;
}
