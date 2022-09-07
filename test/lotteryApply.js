const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lottery issuer", () => {
	beforeEach(async () => {
		[add1, add2] = await ethers.getSigners();
		contract = await ethers.getContractFactory("lotteryContract");
		deployedContract = await contract.deploy();
		await deployedContract.connect(add1).openLottery(1, 999, 100, 105);
	});
	it("should apply for a lottery", async () => {
		console.log("account balance old", await add2.getBalance());
		console.log(
			"contractbalance old",
			await deployedContract.connect(add1).getContractBalance()
		);
		console.log(
			await deployedContract.connect(add2).applyLottery({ value: 999 })
		);
		console.log(
			"contractbalance new",
			await deployedContract.connect(add1).getContractBalance()
		);
		console.log("account balance new", await add2.getBalance());
	});

	it("should revert transaction if owner apply for lottery", async () => {
		await expect(
			deployedContract.connect(add1).applyLottery({ value: 999 })
		).to.be.revertedWith("Owner can't participate");
	});
	it("should revert transaction if paid value is less or greater than lottery price", async () => {
		await expect(
			deployedContract.connect(add2).applyLottery({ value: 929 })
		).to.be.revertedWith("paid balance is greater or less than lottery price");
		await expect(
			deployedContract.connect(add2).applyLottery({ value: 1000 })
		).to.be.revertedWith("paid balance is greater or less than lottery price");
	});
});
