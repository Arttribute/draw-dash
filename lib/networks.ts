export enum Network {
  POLYGON_MUMBAI = "polygon-mumbai",
  POLYGON = "polygon",
  ETHEREUM_GOERLI = "ethereum-goerli",
  ETHEREUM = "ethereum",
  CELO_ALFAJORES = "celo-alfajores",
  BASE_SEPOLIA = "base-sepolia",
}

export const getNetworkUrl = () => {
  switch (process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK) {
    case Network.POLYGON:
      return "https://polygon-rpc.com/";
    case Network.POLYGON_MUMBAI:
      return "https://rpc-mumbai.maticvigil.com/";
    case Network.ETHEREUM_GOERLI:
      return "https://eth-goerli.g.alchemy.com/v2/3jKhhva6zBqwp_dnwPlF4d0rFZhu2pjD";
    case Network.ETHEREUM:
      return "https://eth-mainnet.g.alchemy.com/v2/3jKhhva6zBqwp_dnwPlF4d0rFZhu2pjD";
    case Network.CELO_ALFAJORES:
      return "https://alfajores-forno.celo-testnet.org";
    case Network.BASE_SEPOLIA:
      return "https://sepolia.base.org";
    default:
      throw new Error("Network not supported");
  }
};

export const getChainId = () => {
  switch (process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK) {
    case Network.POLYGON:
      return 137;
    case Network.POLYGON_MUMBAI:
      return 80001;
    case Network.ETHEREUM_GOERLI:
      return 5;
    case Network.CELO_ALFAJORES:
      return 44787;
    case Network.BASE_SEPOLIA:
      return 84532;
    case Network.ETHEREUM:
      return 1;
  }
};

export const getNetworkToken = () => {
  switch (process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK) {
    case Network.POLYGON_MUMBAI:
    case Network.POLYGON:
      return "MATIC";
    case Network.CELO_ALFAJORES:
      return "CELO";
    case Network.BASE_SEPOLIA:
      return "BASE";
    case Network.ETHEREUM:
      return "ETH";
    case Network.ETHEREUM_GOERLI:
      return "ETH";
  }
};

export const getFaucetUrl = () => {
  switch (process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK) {
    case Network.POLYGON_MUMBAI:
      return "https://faucet.polygon.technology/";
    case Network.ETHEREUM_GOERLI:
      return "https://goerlifaucet.com/";
    case Network.CELO_ALFAJORES:
      return "https://celo.org/developers/faucet";
    case Network.BASE_SEPOLIA:
      return "https://faucet.base-sepolia.com/";
  }
};

export const getNetworkName = () => {
  switch (process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK) {
    case Network.POLYGON:
      return "Polygon (Mainnet)";
    case Network.POLYGON_MUMBAI:
      return "Polygon (Mumbai)";
    case Network.ETHEREUM_GOERLI:
      return "Ethereum (Goerli)";
    case Network.ETHEREUM:
      return "Ethereum (Mainnet)";
    case Network.CELO_ALFAJORES:
      return "Celo (Alfajores)";
    case Network.BASE_SEPOLIA:
      return "Base (Sepolia)";
  }
};

export const getBlockExplorer = (address: string) => {
  switch (process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK) {
    case Network.POLYGON:
      return `https://polygonscan.com/address/${address}`;
    case Network.POLYGON_MUMBAI:
      return `https://mumbai.polygonscan.com/address/${address}`;
    case Network.ETHEREUM:
      return `https://etherscan.io/address/${address}`;
    case Network.ETHEREUM_GOERLI:
      return `https://goerli.etherscan.io/address/${address}`;
    case Network.CELO_ALFAJORES:
      return `https://alfajores-blockscout.celo-testnet.org/address/${address}`;
    case Network.BASE_SEPOLIA:
      return `https://base-sepolia.blockscout.com/address/${address}`;
  }
};
