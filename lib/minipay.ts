import {
  createPublicClient,
  createWalletClient,
  custom,
  encodeFunctionData,
  formatEther,
  getContract,
  http,
  parseUnits,
} from "viem";
import { celo, celoAlfajores, mainnet } from "viem/chains";
import { stableTokenABI } from "@celo/abis";

export type Token = "cUSD" | "USDC" | "USDT";

export type TransactionBody = {
  account: `0x${string}`;
  to: `0x${string}`;
  value: bigint;
  data?: `0x${string}`;
};

// Mainnet
const MAINNET_CUSD_TOKEN_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a";
const MAINNET_USDC_TOKEN_ADDRESS = "0xcebA9300f2b948710d2653dD7B07f33A8B32118C";
const MAINNET_USDT_TOKEN_ADDRESS = "0x48065fbbe25f71c9282ddf5e1cd6d6a887483d5e";

// Testnet
const TESTNET_CUSD_TOKEN_ADDRESS = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";
const TESTNET_USDC_TOKEN_ADDRESS = "0xa6920Dd986896D5433b4f388FCB705947A6af835";
const TESTNET_USDT_TOKEN_ADDRESS = "0x9Ae90C20aFCEDA659bDbC5F77A09f1A5771F140f";

const getStableTokenAddress = (token: Token, isTestnet: boolean) => {
  switch (token) {
    case "cUSD":
      return isTestnet
        ? TESTNET_CUSD_TOKEN_ADDRESS
        : MAINNET_CUSD_TOKEN_ADDRESS;
    case "USDC":
      return isTestnet
        ? TESTNET_USDC_TOKEN_ADDRESS
        : MAINNET_USDC_TOKEN_ADDRESS;
    case "USDT":
      return isTestnet
        ? TESTNET_USDT_TOKEN_ADDRESS
        : MAINNET_USDT_TOKEN_ADDRESS;
  }
};

export const createMinipayClient = () => {
  const client = createWalletClient({
    chain: mainnet,
    transport: custom((window as any).ethereum!),
  });

  return client;
};

// const mainnetPublicClient = createPublicClient({
//   chain: celo,
//   transport: http(),
// });

const testnetPublicClient = createPublicClient({
  chain: celoAlfajores,
  transport: http(),
});

export const checkBalance = async (
  address: string,
  token: Token,
  isTestnet = true
) => {
  let StableTokenContract = getContract({
    abi: stableTokenABI,
    address: getStableTokenAddress(token, isTestnet),
    client: testnetPublicClient,
  });

  let balanceInBigNumber = await StableTokenContract.read.balanceOf([
    address as `0x${string}`,
  ]);

  let balanceInWei = balanceInBigNumber;

  let balanceInEthers = formatEther(balanceInWei);

  return balanceInEthers;
};

export const signMinipayMessage = async (message: string) => {
  const walletClient = createMinipayClient();
  const [account] = await walletClient.getAddresses();

  const signature = await walletClient.signMessage({
    account,
    message,
  });

  return signature;
};

// returns the gas fees in cUSD
export const estimateGasFees = async (
  transaction: TransactionBody,
  token: Token = "cUSD",
  isTestnet = true
) => {
  const stableTokenAddress = getStableTokenAddress(token, isTestnet);

  const gasLimit = await testnetPublicClient.estimateGas({
    ...transaction,
    feeCurrency: stableTokenAddress,
  }); // returns the gas

  const gasPrice = await testnetPublicClient.getGasPrice();

  const gasFees = formatEther(gasLimit * gasPrice); // gas fees in cUSD

  return gasFees;
};

export const requestTransfer = async (
  transactionBody: TransactionBody,
  isTestnet = true
) => {
  const client = createWalletClient({
    chain: isTestnet ? celoAlfajores : celo,
    transport: custom((window as any).ethereum!),
  });

  // const FETCH_CUSD_ABI_URL = `https://explorer.celo.org/${
  //   isTestnet ? "alfajores" : "mainnet"
  // }/api?module=contract&action=getabi&address=${
  //   isTestnet ? TESTNET_STABLE_TOKEN_ADDRESS : MAINNET_STABLE_TOKEN_ADDRESS
  // }`;

  // const stableContractAbi = await fetch(FETCH_CUSD_ABI_URL)
  //   .then((res) => res.json())
  //   .then((res) => JSON.parse(res.result));

  let hash = await client.sendTransaction({
    account: transactionBody.account,
    to: transactionBody.to,
    value: transactionBody.value,
    data: encodeFunctionData({
      abi: stableTokenABI,
      functionName: "transfer",
      args: [
        transactionBody.to,
        // Different tokens can have different decimals, cUSD (18), USDC (6)
        parseUnits(`${Number(transactionBody.value)}`, 18),
      ],
    }),
    // If the wallet is connected to a different network then you get an error.
    chain: celoAlfajores,
    // chain: celo,
  });

  const transaction = await testnetPublicClient.waitForTransactionReceipt({
    hash, // Transaction hash that can be used to search transaction on the explorer.
  });

  if (transaction.status === "success") {
    // Do something after transaction is successful.
    return transaction;
  } else {
    // Do something after transaction has failed.
    return null;
  }
};
