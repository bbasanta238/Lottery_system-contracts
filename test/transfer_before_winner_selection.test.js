const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Transferring amount to certain address by manger using contract amount", () => {
  beforeEach(async () => {
    [add1, add2, add3, add4, add5] = await ethers.getSigners();
    contract = await ethers.getContractFactory("LotteryContract");
    deployedContract = await contract.deploy();
    await deployedContract.connect(add1).openLottery(1, 700, 100, 105);
    await deployedContract.connect(add2).applyLottery(101, { value: 700 });
    await deployedContract.connect(add3).applyLottery(101, { value: 700 });
    await deployedContract.connect(add4).applyLottery(101, { value: 700 });
    await deployedContract.connect(add1).selectWinner(106);
    await deployedContract.connect(add1).closeLottery(107);
  });

  it("should revert the transaction if the remining balance is less than the lotterypool before selecting winner", async () => {
    await deployedContract.connect(add1).openLottery(2, 500, 100, 105);
    await deployedContract.connect(add2).applyLottery(101, { value: 500 });
    await deployedContract.connect(add3).applyLottery(101, { value: 500 });
    await deployedContract.connect(add4).applyLottery(101, { value: 500 });
  });
});
