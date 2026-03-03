import { createConfig, http } from 'wagmi'
import { injected, walletConnect } from 'wagmi/connectors'
import { QueryClient } from '@tanstack/react-query'
import {
  SUPPORTED_CHAINS,
  luxMainnet,
  luxTestnet,
  zooMainnet,
  zooTestnet,
  hanzoMainnet,
  spcMainnet,
  parsMainnet,
  ethereum,
  sepolia,
} from './chains'

export function createWagmiConfig(projectId?: string) {
  const connectors = [
    injected(),
    ...(projectId ? [walletConnect({ projectId })] : []),
  ]
  return createConfig({
    chains: SUPPORTED_CHAINS,
    connectors,
    transports: {
      [luxMainnet.id]: http(),
      [luxTestnet.id]: http(),
      [zooMainnet.id]: http(),
      [zooTestnet.id]: http(),
      [hanzoMainnet.id]: http(),
      [spcMainnet.id]: http(),
      [parsMainnet.id]: http(),
      [ethereum.id]: http(),
      [sepolia.id]: http(),
    },
    ssr: true,
  })
}

export function createQueryClientInstance() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
      },
    },
  })
}
