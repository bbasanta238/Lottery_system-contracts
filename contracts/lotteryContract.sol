//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./contractData.sol";

contract lotteryContract is contractData {
	constructor() {
		owner = msg.sender;
	}

	modifier validateTime(uint256 _appliedtime) {
		require(lottery[lotteryNumber].closeTime >= _appliedtime,"lottery applying time is over");
		_;
	}

	function openLottery(
		uint256 _lotteryNumber,
		uint256 _lotteryPrice,
		uint256 _openTime,
		uint256 _closeTime
	) public {
		lottery[_lotteryNumber] = lotteryInfo(
			_lotteryPrice,
			_openTime,
			_closeTime,
			true
		);
		lotteryNumber = _lotteryNumber;
	}

	function applyLottery(uint256 _appliedTime)
		public
		payable
		validateTime(_appliedTime)
	{
		require(msg.sender != owner, "Owner can't participate");
		require(
			msg.value == lottery[lotteryNumber].lotteryPrice,
			"paid balance is greater or less than lottery price"
		);
		participant.push(msg.sender);
	}

	function getContractBalance() public view returns (uint256) {
		return address(this).balance;
	}

	function getLotteryInfo(uint256 _lotteryNumber)
		public
		view
		returns (lotteryInfo memory)
	{
		lotteryInfo memory returnData = lotteryInfo(
			lottery[_lotteryNumber].lotteryPrice,
			lottery[_lotteryNumber].openTime,
			lottery[_lotteryNumber].closeTime,
			lottery[_lotteryNumber].isOpen
		);
		return returnData;
	}
}
