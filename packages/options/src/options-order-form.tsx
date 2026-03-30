"use client"

import * as React from "react"
import { cn } from "./cn"
import type { OptionType, OrderSide, OrderType } from "./types"

// =============================================================================
// Props
// =============================================================================

export interface OptionsOrderFormProps {
  /** Underlying symbol, e.g. "LUX". */
  underlying: string | null
  /** Selected strike price. */
  strike: number | null
  /** Call or put. */
  optionSide: OptionType | null
  /** Expiration label. */
  expiration: string | null
  /** Whether the user's wallet is connected. Controls the CTA text. */
  isConnected?: boolean
  /** Called when the user submits the order. */
  onSubmit?: (order: {
    side: OrderSide
    orderType: OrderType
    quantity: number
    limitPrice: number | null
  }) => void
  /** Called when the CTA is clicked while disconnected. */
  onConnectWallet?: () => void
  className?: string
}

// =============================================================================
// Component
// =============================================================================

export function OptionsOrderForm({
  underlying,
  strike,
  optionSide,
  expiration,
  isConnected = false,
  onSubmit,
  onConnectWallet,
  className,
}: OptionsOrderFormProps) {
  const [side, setSide] = React.useState<OrderSide>("buy")
  const [orderType, setOrderType] = React.useState<OrderType>("limit")
  const [quantity, setQuantity] = React.useState("")
  const [limitPrice, setLimitPrice] = React.useState("")

  const hasSelection = underlying && strike !== null && optionSide && expiration

  const getButtonText = (): string => {
    if (!isConnected) return "Connect Wallet"
    if (!hasSelection) return "Select an Option"
    if (!quantity || parseFloat(quantity) <= 0) return "Enter Quantity"
    if (orderType === "limit" && (!limitPrice || parseFloat(limitPrice) <= 0)) {
      return "Enter Limit Price"
    }
    return `${side === "buy" ? "Buy" : "Sell"} ${optionSide?.toUpperCase()} ${underlying} ${strike}`
  }

  const isDisabled = (): boolean => {
    if (!isConnected) return false
    if (!hasSelection) return true
    if (!quantity || parseFloat(quantity) <= 0) return true
    if (orderType === "limit" && (!limitPrice || parseFloat(limitPrice) <= 0)) {
      return true
    }
    return false
  }

  const handleClick = () => {
    if (!isConnected) {
      onConnectWallet?.()
      return
    }
    if (isDisabled()) return
    onSubmit?.({
      side,
      orderType,
      quantity: parseFloat(quantity),
      limitPrice: orderType === "limit" && limitPrice ? parseFloat(limitPrice) : null,
    })
  }

  return (
    <div className={cn("w-full rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
      <div className="px-4 pt-4 pb-3">
        <h3 className="text-sm font-medium">Order</h3>
      </div>
      <div className="px-4 pb-4 space-y-4">
        {/* Option info */}
        {hasSelection ? (
          <div className="rounded-lg bg-muted px-3 py-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Contract</span>
              <span className="font-medium">
                {underlying}{" "}
                <span className={optionSide === "call" ? "text-green-500" : "text-red-500"}>
                  {strike} {optionSide?.toUpperCase()}
                </span>
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-muted-foreground">Expiration</span>
              <span className="font-medium">{expiration}</span>
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-muted px-3 py-4 text-center text-sm text-muted-foreground">
            Click on a bid/ask in the chain to select an option
          </div>
        )}

        {/* Buy / Sell toggle */}
        <div className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1">
          <button
            type="button"
            className={cn(
              "rounded-md py-1.5 text-sm font-medium transition-colors",
              side === "buy"
                ? "bg-green-500 text-white"
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setSide("buy")}
          >
            Buy
          </button>
          <button
            type="button"
            className={cn(
              "rounded-md py-1.5 text-sm font-medium transition-colors",
              side === "sell"
                ? "bg-red-500 text-white"
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setSide("sell")}
          >
            Sell
          </button>
        </div>

        {/* Order type toggle */}
        <div className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1">
          <button
            type="button"
            className={cn(
              "rounded-md py-1.5 text-xs font-medium transition-colors",
              orderType === "limit"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setOrderType("limit")}
          >
            Limit
          </button>
          <button
            type="button"
            className={cn(
              "rounded-md py-1.5 text-xs font-medium transition-colors",
              orderType === "market"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setOrderType("market")}
          >
            Market
          </button>
        </div>

        {/* Quantity */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Contracts
          </label>
          <input
            type="number"
            placeholder="0"
            min="0"
            step="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>

        {/* Limit price (only for limit orders) */}
        {orderType === "limit" && (
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Limit Price
            </label>
            <input
              type="number"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        )}

        {/* Estimated cost */}
        {quantity && parseFloat(quantity) > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Est. {side === "buy" ? "Cost" : "Credit"}
            </span>
            <span className="font-medium font-mono">
              {orderType === "limit" && limitPrice && parseFloat(limitPrice) > 0
                ? `${(parseFloat(quantity) * parseFloat(limitPrice)).toFixed(2)} ${underlying}`
                : "Market price"}
            </span>
          </div>
        )}

        {/* Submit button */}
        <button
          type="button"
          className={cn(
            "inline-flex w-full items-center justify-center rounded-md px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            side === "buy"
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
          )}
          disabled={isDisabled()}
          onClick={handleClick}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  )
}
