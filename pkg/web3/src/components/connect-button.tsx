'use client'

import * as React from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

function shortenAddress(address: string, chars = 4): string {
  if (!address) return ''
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

interface ConnectButtonProps {
  className?: string
}

export function ConnectButton({ className }: ConnectButtonProps) {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected && address) {
    return (
      <button
        onClick={() => disconnect()}
        className={className || "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 bg-accent text-accent-foreground shadow-sm hover:bg-accent/80 border border-border transition-colors"}
      >
        {shortenAddress(address)}
      </button>
    )
  }

  return (
    <button
      onClick={() => {
        const injectedConnector = connectors.find((c) => c.id === 'injected')
        if (injectedConnector) {
          connect({ connector: injectedConnector })
        }
      }}
      className={className || "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 bg-accent text-accent-foreground shadow-sm hover:bg-accent/80 border border-border transition-colors"}
    >
      Connect Wallet
    </button>
  )
}
