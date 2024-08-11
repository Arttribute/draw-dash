const hre = require("hardhat");
require("dotenv").config();

async function main() {
  // Deploy the DrawDashNFT contract
  const drawDashNFTAddress = await deployNFTContract();

  // Deploy the NFTMarketplace contract
  const marketplaceAddress = await deployMarketplaceContract();

  // Deploy the DrawDashGameVault contract
  const vaultAddress = await deployVaultContract();

  // Deploy the DrawDashPlayToEarn contract
  await deployPlayToEarnContract(vaultAddress);
}

async function deployNFTContract() {
  const drawDashNFT = await hre.ethers.deployContract("DrawDashNFT");
  await drawDashNFT.waitForDeployment();
  console.log(`DrawDashNFT contract deployed to ${drawDashNFT.target}`);
  return drawDashNFT.target;
}

async function deployMarketplaceContract() {
  const nftMarketplace = await hre.ethers.deployContract("NFTMarketplace");
  await nftMarketplace.waitForDeployment();
  console.log(`NFTMarketplace contract deployed to ${nftMarketplace.target}`);
  return nftMarketplace.target;
}

async function deployVaultContract() {
  const assetAddress = "0xa6920Dd986896D5433b4f388FCB705947A6af835"; // TESTNET_USDC_TOKEN_ADDRESS
  const gameContractAddress = "0xA54051AE922cB47734d1D13E800c061A962C5523"; // Placeholder, will be replaced with the real game contract address later

  const drawDashVault = await hre.ethers.deployContract("DrawDashGameVault", [
    assetAddress,
    "DrawDash Vault",
    "DDVT",
    gameContractAddress,
  ]);
  await drawDashVault.waitForDeployment();
  console.log(`DrawDashGameVault contract deployed to ${drawDashVault.target}`);
  return drawDashVault.target;
}

async function deployPlayToEarnContract(vaultAddress: string) {
  const assetAddress = "0xa6920Dd986896D5433b4f388FCB705947A6af835"; // TESTNET_USDC_TOKEN_ADDRESS
  const houseEdgeBasisPoints = 500;

  const playToEarn = await hre.ethers.deployContract("DrawDashPlayToEarn", [
    assetAddress,
    vaultAddress,
    houseEdgeBasisPoints,
  ]);
  await playToEarn.waitForDeployment();
  console.log(`DrawDashPlayToEarn contract deployed to ${playToEarn.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
