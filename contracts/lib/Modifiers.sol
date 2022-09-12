//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./contractData.sol";

contract Modifiers is contractData {
	modifier validateTimeForUser(uint256 _appliedtime) {
		require(
			lottery[lotteryNumber].closeTime >= _appliedtime,
			"lottery applying time is over"
		);
		_;
	}
	modifier validateTimeForManager(uint256 _invokedTime) {
		require(
			lottery[lotteryNumber].closeTime < _invokedTime,
			"Inavalid Time Access"
		);
		_;
	}
	modifier isAlreadyApplied() {
		require(applied[msg.sender] == false, "You have already apply for Lottery");
		_;
	}
	modifier isPreviousLotteryClosed() {
		require(
			lottery[lotteryNumber].isOpen == false,
			"Please ! Close Previous Lottery"
		);
		_;
	}
	modifier checkAmount(uint256 _amount) {
		if (lotteryPool > 0) {
			require(
				(address(this).balance - _amount) >= lotteryPool,
				"Invalid Amount: Affects the lottery pool amount"
			);
		} else {
			require(
				address(this).balance >= _amount,
				"Invalid Amount: greater than available in contract"
			);
		}
		_;
	}

	modifier isWinnerSelected() {
		require(
			lottery[lotteryNumber].isWinnerSelected == true,
			"Winner has not been selected"
		);
		_;
	}
}
