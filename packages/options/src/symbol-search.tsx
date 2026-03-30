"use client"

import * as React from "react"
import { cn } from "./cn"
import type { Token } from "./types"

// =============================================================================
// Props
// =============================================================================

export interface SymbolSearchProps {
  /** Currently selected token. */
  selectedToken: Token | null
  /** Called when the user picks a token from the dropdown. */
  onSelect: (token: Token) => void
  /** Full list of tokens to search through. */
  tokens: Token[]
  className?: string
  /** Optional render function for the token icon. Receives symbol and logoUri. */
  renderTokenIcon?: (symbol: string, logoUri?: string) => React.ReactNode
}

// =============================================================================
// Component
// =============================================================================

export function SymbolSearch({
  selectedToken,
  onSelect,
  tokens,
  className,
  renderTokenIcon,
}: SymbolSearchProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const ref = React.useRef<HTMLDivElement>(null)

  const filtered = React.useMemo(() => {
    if (!query) return tokens
    const q = query.toLowerCase()
    return tokens.filter(
      (t) =>
        t.symbol.toLowerCase().includes(q) ||
        t.name.toLowerCase().includes(q)
    )
  }, [tokens, query])

  // Close on outside click
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        className="flex items-center gap-2 h-10 px-3 rounded-md border border-input bg-background text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
        onClick={() => setOpen(!open)}
      >
        {selectedToken ? (
          <>
            {renderTokenIcon?.(selectedToken.symbol, selectedToken.logoUri)}
            <span className="font-semibold">{selectedToken.symbol}</span>
          </>
        ) : (
          <span className="text-muted-foreground">Select token</span>
        )}
        <svg
          className="h-4 w-4 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 z-50 mt-1 w-72 rounded-lg border bg-popover p-2 shadow-lg">
          <div className="relative mb-2">
            <svg
              className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search tokens..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 pl-8 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              autoFocus
            />
          </div>
          <div className="max-h-64 overflow-y-auto space-y-0.5">
            {filtered.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No tokens found
              </div>
            ) : (
              filtered.map((token) => (
                <button
                  key={`${token.chainId}-${token.symbol}-${token.address}`}
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-sm transition-colors hover:bg-accent",
                    selectedToken?.symbol === token.symbol &&
                      selectedToken?.chainId === token.chainId &&
                      "bg-accent"
                  )}
                  onClick={() => {
                    onSelect(token)
                    setOpen(false)
                    setQuery("")
                  }}
                >
                  {renderTokenIcon?.(token.symbol, token.logoUri)}
                  <div className="flex flex-col">
                    <span className="font-medium">{token.symbol}</span>
                    <span className="text-xs text-muted-foreground">
                      {token.name}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
