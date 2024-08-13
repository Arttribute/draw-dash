require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: __dirname + "/.env" });
const privateKey = process.env.PRIVATE_KEY;
const projectId = process.env.PROJECT_ID;

/** @type import('hardhat/config').HardhatUserConfig */
console.log(privateKey);
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    basemainnet: {
      url: "https://mainnet.base.org",
      accounts: [privateKey],
      gasPrice: 1000000000,
    },
    basesepolia: {
      url: "https://sepolia.base.org",
      accounts: [privateKey],
      gasPrice: 1000000000,
    },
    baselocal: {
      url: "http://localhost:8545",
      accounts: [privateKey],
      gasPrice: 1000000000,
    },
    //Celo
    alfajores: {
      chainId: 44787,
      url: `https://celo-alfajores.infura.io/v3/${projectId}`,
      accounts: [privateKey],
    },
    celo: {
      chainId: 42220,
      url: "https://forno.celo.org",
      accounts: [privateKey],
    },
  },
};
