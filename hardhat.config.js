/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("chai");

let mnemonic = process.env.MNEMONIC
  ? process.env.MNEMONIC
  : "test test test test test test test test test test test test";

module.exports = {
  networks: {
    hardhat: {
      // Uncomment these lines to use mainnet fork
      // forking: {
      //   url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
      //   blockNumber: 11589707,
      // },
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
      accounts: {
        mnemonic,
      },
    },
    live: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
      accounts: {
        mnemonic,
      },
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API,
  },
  namedAccounts: {
    deployer: 0,
    feeRecipient: 1,
    user: 2,
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 50,
    enabled: process.env.REPORT_GAS ? true : false,
    coinmarketcap: process.env.CMC_API_KEY,
    excludeContracts: ["mocks/"],
  },
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  mocha: {
    timeout: 240000,
  },
};
