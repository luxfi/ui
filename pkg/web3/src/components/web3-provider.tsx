'use client'

import * as React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { createWagmiConfig, createQueryClientInstance } from '../wagmi'

interface Web3ProviderProps {
  children: React.ReactNode
  walletConnectProjectId?: string
}

export function Web3Provider({ children, walletConnectProjectId }: Web3ProviderProps) {
  const [config] = React.useState(() => createWagmiConfig(walletConnectProjectId))
  const [queryClient] = React.useState(() => createQueryClientInstance())

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
