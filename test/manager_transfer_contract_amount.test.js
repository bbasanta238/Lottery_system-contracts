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
    console.log(
      "add5 balance before transfering from contract : ",
      await add5.getBalance()
    );
  });

  it("should transfer amount to the given address", async () => {
    await deployedContract.connect(add1).selectWinner(106);
    await deployedContract
      .connect(add1)
      .transferAmount(await add5.getAddress(), 200);
    console.log(
      "add5 balance after transfering from contract :",
      await add5.getBalance()
    );
  });

  it("should revert the transaction if the amount is greater than the amount available in contract", async () => {
    await deployedContract.connect(add1).selectWinner(106);
    await expect(
      deployedContract
        .connect(add1)
        .transferAmount(await add5.getAddress(), 1000)
    ).to.be.revertedWith("Invalid Amount: greater than available in contract");
    console.log(
      "add5 balance after transfering from contract :",
      await add5.getBalance()
    );
  });
});
