//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./lotteryWinner.sol";

contract lotteryContract is lotteryWinner {
    constructor() {
        owner = msg.sender;
    }

    // method to issue a lottery
    function openLottery(
        uint256 _lotteryNumber,
        uint256 _lotteryPrice,
        uint256 _openTime,
        uint256 _closeTime
    ) public isPreviousLotteryClosed {
        lottery[_lotteryNumber] = lotteryInfo(
            _lotteryPrice,
            _openTime,
            _closeTime,
            true,
            false
        );
        lotteryNumber = _lotteryNumber;
        emit lotteryOpenEvent(_openTime, _closeTime, _lotteryPrice);
    }

    // method to apply issued lottery
    function applyLottery(uint256 _appliedTime)
        public
        payable
        validateTimeForUser(_appliedTime)
        isAlreadyApplied
    {
        require(msg.sender != owner, "Owner can't participate");
        require(
            msg.value == lottery[lotteryNumber].lotteryPrice,
            "paid balance is greater or less than lottery price"
        );
        participant.push(msg.sender);
        applied[msg.sender] = true;
        lotteryPool = lotteryPool + msg.value;
    }

    //method to get contract balance
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    //method to get current lottery Information
    function getLotteryInfo(uint256 _lotteryNumber)
        public
        view
        returns (lotteryInfo memory)
    {
        lotteryInfo memory returnData = lotteryInfo(
            lottery[_lotteryNumber].lotteryPrice,
            lottery[_lotteryNumber].openTime,
            lottery[_lotteryNumber].closeTime,
            lottery[_lotteryNumber].isOpen,
            lottery[_lotteryNumber].isWinnerSelected
        );
        return returnData;
    }

    // method to get current lottery participants
    function getLotteryParticipants() public view returns (address[] memory) {
        require(msg.sender == owner);
        address[] memory participantData = new address[](participant.length);
        for (uint256 i = 0; i < participant.length; i++) {
            participantData[i] = participant[i];
        }
        return participantData;
    }

    // method to close current lottery
    function closeLottery(uint256 _closingCallTime)
        public
        validateTimeForManager(_closingCallTime)
        isWinnerSelected
    {
        require(msg.sender == owner);
        // require(lottery[lotteryNumber].isWinnerSelected == true);
        lottery[lotteryNumber].isOpen = false;
        for (uint256 i = 0; i < participant.length; i++) {
            delete applied[participant[i]];
        }
        participant = new address[](0);
    }
}
