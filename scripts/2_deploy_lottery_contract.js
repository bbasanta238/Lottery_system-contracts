const { ethers } = require("hardhat");

async function main() {
  const lotteryContractInstance = await ethers.getContractFactory(
    "LotteryContract"
  );
  const contractDeploy = await lotteryContractInstance.deploy();
  console.log("deployed Contract Address:", contractDeploy.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
