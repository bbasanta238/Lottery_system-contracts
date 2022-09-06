const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lottery issuer", () => {
	beforeEach(async () => {
		[add1, add2] = await ethers.getSigners();
		contract = await ethers.getContractFactory("lotteryContract");
		deployedContract = await contract.deploy();
	});
	it("should issue a lottery", async () => {
		await deployedContract.connect(add1).openLottery(1, 2, 100, 105);
		console.log(await deployedContract.connect(add1).getLotteryInfo(1));
	});
});
