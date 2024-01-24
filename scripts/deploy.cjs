// Import Hardhat runtime environment
const hre = require("hardhat");

async function main() {
  const { ethers } = hre;
  const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");

  // Deploy the contract
  const nftMarketplace = await NFTMarketplace.deploy();

  console.log(`Deployed contract address: ${nftMarketplace.address}`);
}

// Run the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
