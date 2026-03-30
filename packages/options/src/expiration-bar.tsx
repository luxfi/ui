"use client"

import * as React from "react"
import { cn } from "./cn"

// =============================================================================
// Props
// =============================================================================

export interface ExpirationBarProps {
  /** List of expiration date labels (e.g. "2026-04-18"). */
  expirations: string[]
  /** Currently selected expiration, or null. */
  selected: string | null
  /** Called when the user clicks an expiration chip. */
  onSelect: (expiration: string) => void
  className?: string
}

// =============================================================================
// Component
// =============================================================================

export function ExpirationBar({
  expirations,
  selected,
  onSelect,
  className,
}: ExpirationBarProps) {
  if (expirations.length === 0) {
    return (
      <div className={cn("flex items-center gap-2 text-sm text-muted-foreground", className)}>
        Select an underlying to view expirations
      </div>
    )
  }

  return (
    <div className={cn("flex items-center gap-1 overflow-x-auto no-scrollbar", className)}>
      <span className="text-xs font-medium text-muted-foreground mr-2 shrink-0">
        Exp
      </span>
      {expirations.map((exp) => (
        <button
          key={exp}
          type="button"
          onClick={() => onSelect(exp)}
          className={cn(
            "shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
            selected === exp
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          )}
        >
          {exp}
        </button>
      ))}
    </div>
  )
}
