const { ethers } = require("hardhat");

async function main() {
  const lotteryContractInstance = await ethers.getContractFactory(
    "LotteryWinner"
  );
  const contractDeploy = await lotteryContractInstance.deploy();
  // deployed address
  console.log("deployed Contract Address:", contractDeploy.address);
  // deployed address written in .env file
  var dataArray = fs.readFileSync(".env", "utf8").split("\n");
  dataArray[0] = `DEPLOYED_CONTRACT_ADDRESS="${contractDeploy.address}"`;
  fs.writeFileSync(".env", "");
  for (let i = 0; i < dataArray.length; i++) {
    fs.appendFileSync(".env", dataArray[i] + "\n");
  }
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
