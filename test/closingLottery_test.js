const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lottery closing", () => {
	beforeEach(async () => {
		contract = await ethers.getContractFactory("lotteryContract");
		deployedContract = await contract.deploy();
		[add1, add2, add3, add4] = await ethers.getSigners();
		await deployedContract.connect(add1).openLottery(1, 999, 100, 105);
		await deployedContract.connect(add2).applyLottery(101, { value: 999 });
		await deployedContract.connect(add3).applyLottery(101, { value: 999 });
		await deployedContract.connect(add4).applyLottery(101, { value: 999 });
		// console.log(await deployedContract.connect(add1).getLotteryInfo());
		console.log(
			"before closing : ",
			await deployedContract.connect(add1).getLotteryParticipants()
		);
	});
	it("should clear arryas of participant after closing", async () => {
		await deployedContract.connect(add1).selectWinner(106);
		await deployedContract.connect(add1).closeLottery(107);
		console.log(
			"After closing : ",
			await deployedContract.connect(add1).getLotteryParticipants()
		);
		// console.log(await deployedContract.connect(add1).getLotteryInfo());
	});
	it("should reissue the lottery for new lottery using same contract", async () => {
		await deployedContract.connect(add1).selectWinner(106);
		await deployedContract.connect(add1).closeLottery(107);
		console.log(
			"After closing : ",
			await deployedContract.connect(add1).getLotteryParticipants()
		);
		console.log("***************Reissuing Lottery**********************");
		await deployedContract.connect(add1).openLottery(2, 888, 100, 105);
		await deployedContract.connect(add2).applyLottery(101, { value: 888 });
		await deployedContract.connect(add3).applyLottery(101, { value: 888 });
		console.log(
			"after Reissuing : ",
			await deployedContract.connect(add1).getLotteryParticipants()
		);
	});
	it("should not close the lottery if lottery is still open", async () => {
		await expect(
			deployedContract.connect(add1).closeLottery(104)
		).to.be.revertedWith("Inavalid Time Access");
	});
	it("should not close the lottery if winner has not been selected yet", async () => {
		await expect(
			deployedContract.connect(add1).closeLottery(107)
		).to.be.revertedWith("Winner has not been selected");
	});

	it("can't reissue lottery before closing previous lottery", async () => {
		await expect(
			deployedContract.connect(add1).openLottery(2, 888, 100, 105)
		).to.be.revertedWith("Please ! Close Previous Lottery");
	});
});
