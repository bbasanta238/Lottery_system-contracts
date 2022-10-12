const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Transferring amount to certain address by manger using contract amount", () => {
	beforeEach(async () => {
		[add1, add2, add3, add4, add5] = await ethers.getSigners();
		contract = await ethers.getContractFactory("lotteryContract");
		deployedContract = await contract.deploy();
		await deployedContract.connect(add1).openLottery(1, 700, 100, 105);
		await deployedContract.connect(add2).applyLottery(101, { value: 700 });
		await deployedContract.connect(add3).applyLottery(101, { value: 700 });
		await deployedContract.connect(add4).applyLottery(101, { value: 700 });
		await deployedContract.connect(add1).selectWinner(106);
		await deployedContract.connect(add1).closeLottery(107);
		
		// console.log(
		// 	"add5 balance before transfering from contract : ",
		// 	await add5.getBalance()
		// );
	});
	it("should revert the transaction if the remining balance is less than the lotterypoo before selecting winner", async () => {
		// console.log(
		// 	"lotteryPool before reissuing lottery : ",
		// 	await deployedContract.connect(add1).lotteryPool()
		// );
		// console.log(
		// 	"balance of contract before resissing lottery : ",
		// 	await deployedContract.connect(add1).getContractBalance()
		// );
		await deployedContract.connect(add1).openLottery(2, 500, 100, 105);
		await deployedContract.connect(add2).applyLottery(101, { value: 500 });
		await deployedContract.connect(add3).applyLottery(101, { value: 500 });
		await deployedContract.connect(add4).applyLottery(101, { value: 500 });
		// console.log(
		// 	"lotteryPool after reissuing lottery : ",
		// 	await deployedContract.connect(add1).lotteryPool()
		// );
		// console.log(
		// 	"balance of contract after resissing lottery : ",
		// 	await deployedContract.connect(add1).getContractBalance()
		// );
		// await expect(
		// 	deployedContract
		// 		.connect(add1)
		// 		.transferAmount(await add5.getAddress(), 500)
		// ).to.be.revertedWith("Invalid Amount: Affects the lottery pool amount");
		// console.log(
		// 	"add5 balance after transfering from contract :",
		// 	await add5.getBalance()
		// );
	});
});
