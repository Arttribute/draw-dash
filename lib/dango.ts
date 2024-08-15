import { defineChain } from "viem";

const sourceId = 17000;

export const dango = defineChain({
  name: "Dango Testnet",
  id: 44_787,
  nativeCurrency: {
    decimals: 18,
    name: "CELO",
    symbol: "CELO",
  },
  rpcUrls: {
    default: {
      http: ["https://forno.dango.celo-testnet.org"],
    },
  },
  contracts: {
    gasPriceOracle: { address: "0x420000000000000000000000000000000000000F" },
    l1Block: { address: "0x4200000000000000000000000000000000000015" },
    l2CrossDomainMessenger: {
      address: "0x4200000000000000000000000000000000000007",
    },
    l2Erc721Bridge: { address: "0x4200000000000000000000000000000000000014" },
    l2StandardBridge: { address: "0x4200000000000000000000000000000000000010" },
    l2ToL1MessagePasser: {
      address: "0x4200000000000000000000000000000000000016",
    },
    disputeGameFactory: {
      [sourceId]: {
        address: "0x831f39053688f05698ad0fB5f4DE7e56B2949c55",
      },
    },
    l2OutputOracle: {
      [sourceId]: {
        address: "0x419577592C884868C3ed85B97169b93362581855",
      },
    },
    portal: {
      [sourceId]: {
        address: "0xB29597c6866c6C2870348f1035335B75eEf79d07",
      },
    },
    l1StandardBridge: {
      [sourceId]: {
        address: "0x9FEBd0F16b97e0AEF9151AF07106d733E87B1be4",
      },
    },
  },
  blockExplorers: {
    default: {
      name: "Celo Explorer",
      url: "https://explorer.celo.org/alfajores",
      apiUrl: "https://explorer.celo.org/api",
    },
  },
  testnet: true,
});
