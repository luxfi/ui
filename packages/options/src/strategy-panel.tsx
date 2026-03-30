"use client"

import * as React from "react"
import { cn } from "./cn"
import type { StrategyLeg, StrategyTemplate } from "./types"

// =============================================================================
// Built-in templates
// =============================================================================

const DEFAULT_TEMPLATES: StrategyTemplate[] = [
  {
    name: "Covered Call",
    description: "Long underlying + short call. Earn premium on held assets.",
    legs: [
      { side: "sell", optionType: "call", strike: "", quantity: "1" },
    ],
  },
  {
    name: "Protective Put",
    description: "Long underlying + long put. Downside protection.",
    legs: [
      { side: "buy", optionType: "put", strike: "", quantity: "1" },
    ],
  },
  {
    name: "Bull Call Spread",
    description: "Long lower call + short higher call. Limited risk bullish bet.",
    legs: [
      { side: "buy", optionType: "call", strike: "", quantity: "1" },
      { side: "sell", optionType: "call", strike: "", quantity: "1" },
    ],
  },
  {
    name: "Bear Put Spread",
    description: "Long higher put + short lower put. Limited risk bearish bet.",
    legs: [
      { side: "buy", optionType: "put", strike: "", quantity: "1" },
      { side: "sell", optionType: "put", strike: "", quantity: "1" },
    ],
  },
  {
    name: "Long Straddle",
    description: "Long call + long put at same strike. Profit from high volatility.",
    legs: [
      { side: "buy", optionType: "call", strike: "", quantity: "1" },
      { side: "buy", optionType: "put", strike: "", quantity: "1" },
    ],
  },
  {
    name: "Long Strangle",
    description: "Long OTM call + long OTM put. Cheaper vol play than straddle.",
    legs: [
      { side: "buy", optionType: "call", strike: "", quantity: "1" },
      { side: "buy", optionType: "put", strike: "", quantity: "1" },
    ],
  },
  {
    name: "Iron Condor",
    description: "Short strangle + long wings. Profit from low volatility.",
    legs: [
      { side: "buy", optionType: "put", strike: "", quantity: "1" },
      { side: "sell", optionType: "put", strike: "", quantity: "1" },
      { side: "sell", optionType: "call", strike: "", quantity: "1" },
      { side: "buy", optionType: "call", strike: "", quantity: "1" },
    ],
  },
]

// =============================================================================
// Props
// =============================================================================

export interface StrategyPanelProps {
  /** Underlying symbol, e.g. "LUX". */
  underlying: string | null
  /** Selected expiration label. */
  expiration: string | null
  /** Override the built-in strategy templates. */
  templates?: StrategyTemplate[]
  /** Called when the strategy legs change. */
  onLegsChange?: (legs: StrategyLeg[]) => void
  className?: string
}

// =============================================================================
// Component
// =============================================================================

let nextLegId = 0
function createLegId(): string {
  return `leg-${++nextLegId}`
}

export function StrategyPanel({
  underlying,
  expiration,
  templates = DEFAULT_TEMPLATES,
  onLegsChange,
  className,
}: StrategyPanelProps) {
  const [legs, setLegs] = React.useState<StrategyLeg[]>([])
  const [showTemplates, setShowTemplates] = React.useState(false)
  const templateRef = React.useRef<HTMLDivElement>(null)

  // Notify parent of leg changes
  React.useEffect(() => {
    onLegsChange?.(legs)
  }, [legs, onLegsChange])

  // Close templates dropdown on outside click
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (templateRef.current && !templateRef.current.contains(e.target as Node)) {
        setShowTemplates(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const addLeg = () => {
    setLegs((prev) => [
      ...prev,
      {
        id: createLegId(),
        side: "buy",
        optionType: "call",
        strike: "",
        quantity: "1",
      },
    ])
  }

  const removeLeg = (id: string) => {
    setLegs((prev) => prev.filter((l) => l.id !== id))
  }

  const updateLeg = (id: string, field: keyof StrategyLeg, value: string) => {
    setLegs((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    )
  }

  const applyTemplate = (template: StrategyTemplate) => {
    setLegs(
      template.legs.map((leg) => ({
        ...leg,
        id: createLegId(),
      }))
    )
    setShowTemplates(false)
  }

  const clearLegs = () => {
    setLegs([])
  }

  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Strategy Builder</h3>
          <div className="flex items-center gap-1">
            {legs.length > 0 && (
              <button
                type="button"
                className="inline-flex h-7 items-center rounded-md px-2 text-xs font-medium hover:bg-accent transition-colors"
                onClick={clearLegs}
              >
                Clear
              </button>
            )}
            <div ref={templateRef} className="relative">
              <button
                type="button"
                className="inline-flex h-7 items-center gap-1 rounded-md border border-input bg-background px-2 text-xs font-medium hover:bg-accent transition-colors"
                onClick={() => setShowTemplates(!showTemplates)}
              >
                Templates
                <svg
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showTemplates && (
                <div className="absolute right-0 top-full z-50 mt-1 w-72 rounded-lg border bg-popover p-2 shadow-lg">
                  <div className="space-y-1">
                    {templates.map((t) => (
                      <button
                        key={t.name}
                        type="button"
                        className="flex w-full flex-col rounded-md px-3 py-2 text-left transition-colors hover:bg-accent"
                        onClick={() => applyTemplate(t)}
                      >
                        <span className="text-sm font-medium">{t.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {t.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4 space-y-3">
        {!underlying && (
          <div className="rounded-lg bg-muted px-3 py-4 text-center text-sm text-muted-foreground">
            Select an underlying token to build a strategy
          </div>
        )}

        {underlying && legs.length === 0 && (
          <div className="rounded-lg bg-muted px-3 py-4 text-center text-sm text-muted-foreground">
            <p>Add legs manually or pick a template above</p>
          </div>
        )}

        {/* Legs */}
        {legs.map((leg, idx) => (
          <div
            key={leg.id}
            className="rounded-lg border bg-muted/50 p-3 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                Leg {idx + 1}
              </span>
              <button
                type="button"
                onClick={() => removeLeg(leg.id)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {/* Buy/Sell */}
              <select
                value={leg.side}
                onChange={(e) =>
                  updateLeg(leg.id, "side", e.target.value)
                }
                className="rounded-md border bg-background px-2 py-1.5 text-xs"
              >
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>

              {/* Call/Put */}
              <select
                value={leg.optionType}
                onChange={(e) =>
                  updateLeg(leg.id, "optionType", e.target.value)
                }
                className="rounded-md border bg-background px-2 py-1.5 text-xs"
              >
                <option value="call">Call</option>
                <option value="put">Put</option>
              </select>

              {/* Strike */}
              <input
                type="number"
                placeholder="Strike"
                value={leg.strike}
                onChange={(e) =>
                  updateLeg(leg.id, "strike", e.target.value)
                }
                className="flex h-7 w-full rounded-md border border-input bg-background px-2 text-xs shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />

              {/* Quantity */}
              <input
                type="number"
                placeholder="Qty"
                value={leg.quantity}
                onChange={(e) =>
                  updateLeg(leg.id, "quantity", e.target.value)
                }
                className="flex h-7 w-full rounded-md border border-input bg-background px-2 text-xs shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                min="1"
              />
            </div>
          </div>
        ))}

        {/* Add leg button */}
        {underlying && (
          <button
            type="button"
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent transition-colors"
            onClick={addLeg}
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Leg
          </button>
        )}

        {/* Strategy summary */}
        {legs.length > 0 && (
          <div className="rounded-lg border bg-muted/30 p-3 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Strategy Summary
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Underlying</span>
                <span className="font-medium">{underlying}</span>
              </div>
              {expiration && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expiration</span>
                  <span className="font-medium">{expiration}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Legs</span>
                <span className="font-medium">{legs.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Max Risk</span>
                <span className="font-medium text-muted-foreground">
                  Requires pricing data
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
