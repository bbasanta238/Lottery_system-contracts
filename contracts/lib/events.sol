//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract events {
	event lotteryOpenEvent(uint256 _openTime, uint256 _closeTime, uint256 _price);
	event lotteryApplyEvent(
		uint256 _appliedTime,
		uint256 _lotteryPrice,
		uint256 _lotteryNumber
	);
	event transferredToWinner(address _winnerAddress, uint256 _winningAmount);
	event transferredToManager(
		address _managerAddress,
		uint256 _commissionAmount
	);
}
