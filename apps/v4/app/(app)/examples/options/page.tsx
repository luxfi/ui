"use client"

import * as React from "react"

import {
  ExpirationBar,
  OptionsChain,
  OptionsOrderForm,
  PositionsTable,
  StrategyPanel,
  SymbolSearch,
} from "@luxfi/options"
import type {
  OptionPosition,
  OptionStrike,
  OptionType,
  Token,
} from "@luxfi/options"

// =============================================================================
// Sample data
// =============================================================================

const SAMPLE_TOKENS: Token[] = [
  {
    symbol: "LUX",
    name: "Lux",
    address: "0x0000000000000000000000000000000000000000",
    chainId: 96369,
    decimals: 18,
  },
  {
    symbol: "ZOO",
    name: "Zoo",
    address: "0x0000000000000000000000000000000000000000",
    chainId: 200200,
    decimals: 18,
  },
  {
    symbol: "LETH",
    name: "Lux ETH",
    address: "0xAA3AE950000000000000000000000000000000aa",
    chainId: 96369,
    decimals: 18,
  },
  {
    symbol: "LBTC",
    name: "Lux BTC",
    address: "0x526903E000000000000000000000000000000526",
    chainId: 96369,
    decimals: 8,
  },
]

const EXPIRATIONS = [
  "2026-04-04",
  "2026-04-11",
  "2026-04-18",
  "2026-04-25",
  "2026-05-16",
  "2026-06-19",
]

const SPOT_PRICE = 12.5

function buildStrikes(): OptionStrike[] {
  const strikes = [8, 9, 10, 11, 12, 13, 14, 15, 16, 18]
  return strikes.map((strike) => {
    const dist = Math.abs(strike - SPOT_PRICE)
    const baseIv = 0.65 + dist * 0.03
    const callIntrinsic = Math.max(SPOT_PRICE - strike, 0)
    const putIntrinsic = Math.max(strike - SPOT_PRICE, 0)
    const timeValue = 0.8 + Math.random() * 0.4
    const callMid = callIntrinsic + timeValue
    const putMid = putIntrinsic + timeValue

    return {
      strike,
      call: {
        bid: parseFloat((callMid - 0.05).toFixed(2)),
        ask: parseFloat((callMid + 0.05).toFixed(2)),
        last: parseFloat(callMid.toFixed(2)),
        volume: Math.floor(Math.random() * 2000),
        openInterest: Math.floor(Math.random() * 8000 + 500),
        iv: baseIv,
        delta: parseFloat(
          (0.5 + (SPOT_PRICE - strike) * 0.08).toFixed(3)
        ),
      },
      put: {
        bid: parseFloat((putMid - 0.05).toFixed(2)),
        ask: parseFloat((putMid + 0.05).toFixed(2)),
        last: parseFloat(putMid.toFixed(2)),
        volume: Math.floor(Math.random() * 1500),
        openInterest: Math.floor(Math.random() * 6000 + 300),
        iv: baseIv + 0.02,
        delta: parseFloat(
          (-0.5 + (SPOT_PRICE - strike) * 0.08).toFixed(3)
        ),
      },
    }
  })
}

const SAMPLE_POSITIONS: OptionPosition[] = [
  {
    id: "pos-1",
    underlying: "LUX",
    strike: 12,
    side: "call",
    direction: "long",
    quantity: 10,
    avgEntry: 1.25,
    markPrice: 1.58,
    expiration: "2026-04-18",
    pnl: 3.3,
    pnlPercent: 26.4,
  },
  {
    id: "pos-2",
    underlying: "LUX",
    strike: 14,
    side: "put",
    direction: "short",
    quantity: 5,
    avgEntry: 2.1,
    markPrice: 1.85,
    expiration: "2026-04-25",
    pnl: 1.25,
    pnlPercent: 11.9,
  },
  {
    id: "pos-3",
    underlying: "LUX",
    strike: 10,
    side: "call",
    direction: "long",
    quantity: 20,
    avgEntry: 3.0,
    markPrice: 2.72,
    expiration: "2026-05-16",
    pnl: -5.6,
    pnlPercent: -9.3,
  },
]

// =============================================================================
// Page
// =============================================================================

export default function OptionsPage() {
  const [selectedToken, setSelectedToken] = React.useState<Token | null>(
    SAMPLE_TOKENS[0]
  )
  const [selectedExpiration, setSelectedExpiration] = React.useState<
    string | null
  >(EXPIRATIONS[2])
  const [selectedStrike, setSelectedStrike] = React.useState<number | null>(
    null
  )
  const [selectedSide, setSelectedSide] = React.useState<OptionType | null>(
    null
  )

  const strikes = React.useMemo(() => buildStrikes(), [])

  return (
    <div className="flex h-full flex-1 flex-col gap-6 p-6 md:p-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold tracking-tight">Options</h2>
        <p className="text-muted-foreground">
          On-chain options trading components for the Lux Network.
        </p>
      </div>

      {/* Top bar: token selector + expirations */}
      <div className="flex flex-wrap items-center gap-4">
        <SymbolSearch
          tokens={SAMPLE_TOKENS}
          selectedToken={selectedToken}
          onSelect={setSelectedToken}
        />
        <ExpirationBar
          expirations={EXPIRATIONS}
          selected={selectedExpiration}
          onSelect={setSelectedExpiration}
          className="flex-1"
        />
      </div>

      {/* Main grid: chain + sidebar */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          <OptionsChain
            strikes={strikes}
            spotPrice={SPOT_PRICE}
            selectedStrike={selectedStrike}
            selectedSide={selectedSide}
            onSelectOption={(strike, side) => {
              setSelectedStrike(strike)
              setSelectedSide(side)
            }}
          />
          <PositionsTable
            positions={SAMPLE_POSITIONS}
            isConnected
            onClose={(id) =>
              console.log("[options demo] close position", id)
            }
          />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <OptionsOrderForm
            underlying={selectedToken?.symbol ?? null}
            strike={selectedStrike}
            optionSide={selectedSide}
            expiration={selectedExpiration}
            isConnected
            onSubmit={(order) =>
              console.log("[options demo] submit order", order)
            }
          />
          <StrategyPanel
            underlying={selectedToken?.symbol ?? null}
            expiration={selectedExpiration}
            onLegsChange={(legs) =>
              console.log("[options demo] legs changed", legs)
            }
          />
        </div>
      </div>
    </div>
  )
}
