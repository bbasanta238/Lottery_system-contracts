async function main() {
  const contractInstance = await ethers.getContractFactoryata("ContractData");
  const contractdeploy = await contractInstance.deploy();
  console.log("data token address :", contractdeploy.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
