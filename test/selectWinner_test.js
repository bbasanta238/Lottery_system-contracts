const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lottery winning Amount transfer", () => {
	beforeEach(async () => {
		[add1, add2, add3, add4, add5] = await ethers.getSigners();
		contract = await ethers.getContractFactory("lotteryContract");
		deployedContract = await contract.deploy();
		await deployedContract.connect(add1).openLottery(1, 1000000000, 100, 105);
		// console.log(await deployedContract.connect(add1).getLotteryInfo(1));
		await deployedContract
			.connect(add2)
			.applyLottery(101, { value: 1000000000 });
		await deployedContract
			.connect(add3)
			.applyLottery(101, { value: 1000000000 });
		await deployedContract
			.connect(add4)
			.applyLottery(101, { value: 1000000000 });
		await deployedContract
			.connect(add5)
			.applyLottery(101, { value: 1000000000 });
		// checking balance before selecting winner
		// console.log(
		// 	"add2 Balance Before selction of winner",
		// 	await add2.getBalance()
		// );
		// console.log(
		// 	"add3 Balance Before selction of winner",
		// 	await add3.getBalance()
		// );
		// console.log(
		// 	"add4 Balance Before selction of winner",
		// 	await add4.getBalance()
		// );
		// console.log(
		// 	"add5 Balance Before selction of winner",
		// 	await add5.getBalance()
		// );
	});
	it("should compute  the parizepool", async () => {
		// console.log(await deployedContract.connect(add1).lotteryPool());
		expect((await deployedContract.connect(add1).winningAmount())[0]).is.equal(
			0.67 * 4000000000
		);
		expect((await deployedContract.connect(add1).winningAmount())[1]).is.equal(
			0.13 * 4000000000
		);
	});
	it("should transfer wining amount to winner's address", async () => {
		console.log(
			"contract balance Before selection of Winner : ",
			await deployedContract.connect(add1).getContractBalance()
		);
		await deployedContract.connect(add1).selectWinner(106);
		console.log("***********After lottery has been drawed****************");
		console.log(
			"contract balance After Selection of Winner",
			await deployedContract.connect(add1).getContractBalance()
		);
		// console.log(
		// 	"add2 Balance after selction of winner",
		// 	await add2.getBalance()
		// );
		// console.log(
		// 	"add3 Balance after selction of winner",
		// 	await add3.getBalance()
		// );
		// console.log(
		// 	"add4 Balance after selction of winner",
		// 	await add4.getBalance()
		// );
		// console.log(
		// 	"add5 Balance after selction of winner",
		// 	await add5.getBalance()
		// );
	});

	it("cannot select winner utill lottery closing time is over", async () => {
		// console.log(await deployedContract.connect(add1).selectWinner(102));
		await deployedContract.connect(add1).selectWinner(106);
		expect(deployedContract.connect(add1).selectWinner(102)).to.be.revertedWith(
			"Invalid Time Acess"
		);
	});
});
