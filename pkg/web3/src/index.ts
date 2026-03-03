// Components
export { Web3Provider } from './components/web3-provider'
export { ConnectButton } from './components/connect-button'
export { ChainSelector } from './components/chain-selector'

// Chain definitions and utilities
export {
  luxMainnet, luxTestnet, luxDev,
  zooMainnet, zooTestnet,
  hanzoMainnet, spcMainnet, parsMainnet,
  ethereum, sepolia,
  SUPPORTED_CHAINS, MAINNET_CHAINS, TESTNET_CHAINS, LUX_ECOSYSTEM_CHAINS,
  CHAIN_BY_ID, EXPLORER_API,
  getChainById, isLuxEcosystem, isLuxChain, isZooChain, isTestnet,
  getDefaultChain, getChainIcon, getExplorerApiUrl,
  type SupportedChainId,
} from './chains'

// Wagmi utilities
export { createWagmiConfig, createQueryClientInstance } from './wagmi'
