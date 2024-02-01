import { HardhatUserConfig } from "hardhat/config";
import { config as dotenvConfig } from "dotenv";
import "@nomicfoundation/hardhat-toolbox";


dotenvConfig();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  paths: {
    artifacts: "../src/artifacts",
  },
  networks: {
    arbsep: {
      url: process.env.JSON_RPC_URL,
      accounts: [process.env.PRIVATE_KEY!],
    }
  },
  sourcify: {
    enabled: true
  },
  etherscan: {
    apiKey: {
      arbsep: process.env.ARBISCAN_API_KEY!,
    },
    customChains: [
      {
        network: "arbsep",
        chainId: 421614,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api",
          browserURL: "https://sepolia.arbiscan.io/"
        }
      }
    ]
  }
};

export default config;
