'use client'

import * as React from 'react'
import { useChainId, useSwitchChain } from 'wagmi'
import { getChainById, SUPPORTED_CHAINS, luxMainnet, isTestnet } from '../chains'

interface ChainSelectorProps {
  className?: string
  showTestnets?: boolean
}

export function ChainSelector({ className, showTestnets = true }: ChainSelectorProps) {
  const chainId = useChainId()
  const { switchChain, isPending } = useSwitchChain()
  const [isOpen, setIsOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  const currentChain = getChainById(chainId) || luxMainnet

  const mainnets = SUPPORTED_CHAINS.filter((c) => !isTestnet(c.id))
  const testnets = SUPPORTED_CHAINS.filter((c) => isTestnet(c.id))

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className={`relative ${className || ''}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="inline-flex items-center gap-2 h-9 px-3 rounded-md text-sm font-medium border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-70"
      >
        <span className="font-medium">{currentChain.name}</span>
        <svg className="h-4 w-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-56 rounded-md border border-border bg-popover p-1 shadow-lg z-50">
          <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Mainnets</div>
          {mainnets.map((chain) => (
            <button
              key={chain.id}
              onClick={() => { switchChain?.({ chainId: chain.id }); setIsOpen(false) }}
              className="flex w-full items-center gap-3 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer"
            >
              <span className="flex-1 text-left">{chain.name}</span>
              {chain.id === chainId && <span className="text-primary">&#10003;</span>}
            </button>
          ))}
          {showTestnets && testnets.length > 0 && (
            <>
              <div className="my-1 h-px bg-border" />
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Testnets</div>
              {testnets.map((chain) => (
                <button
                  key={chain.id}
                  onClick={() => { switchChain?.({ chainId: chain.id }); setIsOpen(false) }}
                  className="flex w-full items-center gap-3 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer"
                >
                  <span className="flex-1 text-left">{chain.name}</span>
                  {chain.id === chainId && <span className="text-primary">&#10003;</span>}
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}
