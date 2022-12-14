//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./lib/ContractData.sol";
import "./lib/Modifiers.sol";
import "./lib/Events.sol";

contract LotteryWinner is ContractData, Modifiers, Events {
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
                    abi.encodePacked(
                        block.timestamp,
                        block.difficulty,
                        msg.sender
                    )
                )
            ) % (participant.length);
    }

    function selectWinner(uint256 _invokedTime)
        public
        validateTimeForManager(_invokedTime)
    {
        require(msg.sender == owner, "Unauthorized Access");
        uint256 winnerIndex = randomNumberGenereator();
        address winner = participant[winnerIndex];
        uint256[2] memory prize = winningAmount();
        (bool sentToWinner, ) = payable(winner).call{value: prize[1]}("");
        require(sentToWinner, "couldnot transfer amount to winner");
        (bool sentToManager, ) = payable(owner).call{value: prize[0]}("");
        require(sentToManager, "couldnot transfer amount to manager");
        lottery[lotteryNumber].isWinnerSelected = true;
        lottery[lotteryNumber].isOpen = false;
        emit transferredToWinner(winner, prize[1]);
        emit transferredToManager(owner, prize[0]);
        delete lotteryPool;
    }

    function transferAmount(address _toAddress, uint256 _amount)
        public
        checkAmount(_amount)
    {
        require(msg.sender == owner);
        (bool sent, ) = payable(_toAddress).call{value: _amount}("");
        require(sent, "Transfering Amount Fails");
    }
}
