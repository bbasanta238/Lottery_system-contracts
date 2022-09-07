const { expect } = require("chai");
const { deployContract } = require("ethereum-waffle");
const { ethers } = require("hardhat");

describe("Lottery issuer", () => {
	beforeEach(async () => {
		[add1, add2] = await ethers.getSigners();
		contract = await ethers.getContractFactory("lotteryContract");
		deployedContract = await contract.deploy();
		let currentTime = new Date(2022, 08, 07, 12, 40).getTime();
		let closeTime = new Date(2022, 08, 07, 12, 42).getTime(); //(year,month,day,hour,min) Note: currentmonth-1 gives current month (2022,september,7)
		console.log(currentTime);
		console.log(closeTime);
		await deployedContract
			.connect(add1)
			.openLottery(1, 999, currentTime, closeTime);
	});
	it("cannot apply lottery after participating time is over", async () => {
		await expect(
			deployedContract
				.connect(add2)
				.applyLottery(new Date(2022, 08, 07, 12, 43).getTime(), {
					value: 999,
				})
		).to.be.revertedWith("lottery applying time is over");
	});

	it("able to apply for lottery before participating time is over", async () => {
		await deployedContract
			.connect(add2)
			.applyLottery(new Date(2022, 08, 07, 12, 41).getTime(), { value: 999 });
	});
});
