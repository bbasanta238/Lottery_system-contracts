//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./lotteryContract.sol";

contract lotteryWinner is lotteryContract {
	function winningAmount() public view returns (uint256[2] memory) {
		uint256[2] memory prize;
		uint256 winnerAmount = (67 * lotteryPool) / 100;
		uint256 managerAmount = (13 * lotteryPool) / 100;
		prize[0] = winnerAmount;
		prize[1] = managerAmount;
		return (prize);
	}

	function randomNumberGenereator() private view returns (uint256) {
		return
			uint256(
				keccak256(
					abi.encodePacked(block.timestamp, block.difficulty, msg.sender)
				)
			) % (participant.length);
	}

	function selectWinner() public {
		require(msg.sender == owner, "Unauthorized Access");
		uint256 winnerIndex = randomNumberGenereator();
		address winner = participant[winnerIndex];
		uint256[2] memory prize = winningAmount();
		(bool winnerTransfer, ) = payable(winner).call{ value: prize[1] }("");
		require(winnerTransfer, "couldnot transfer amount to winner");
		(bool managerTransfer, ) = payable(owner).call{ value: prize[0] }("");
		require(managerTransfer, "couldnot transfer amount to manager");
	}
}
