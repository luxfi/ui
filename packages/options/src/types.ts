// =============================================================================
// Token types
// =============================================================================

/** Minimal token representation for the symbol search component. */
export interface Token {
  symbol: string
  name: string
  address: string
  chainId: number
  decimals: number
  logoUri?: string
}

// =============================================================================
// Options chain types
// =============================================================================

export type OptionType = "call" | "put"
export type OrderSide = "buy" | "sell"
export type OrderType = "limit" | "market"

export interface OptionQuote {
  bid: number | null
  ask: number | null
  last: number | null
  volume: number
  openInterest: number
  iv: number | null
  delta: number | null
}

export interface OptionStrike {
  strike: number
  call: OptionQuote
  put: OptionQuote
}

// =============================================================================
// Position types
// =============================================================================

export interface OptionPosition {
  id: string
  underlying: string
  strike: number
  side: OptionType
  direction: "long" | "short"
  quantity: number
  avgEntry: number
  markPrice: number
  expiration: string
  pnl: number
  pnlPercent: number
}

// =============================================================================
// Strategy types
// =============================================================================

export interface StrategyLeg {
  id: string
  side: OrderSide
  optionType: OptionType
  strike: string
  quantity: string
}

export interface StrategyTemplate {
  name: string
  description: string
  legs: Omit<StrategyLeg, "id">[]
}
