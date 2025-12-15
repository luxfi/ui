'use client'

import * as React from 'react'
import { cn } from '../lib/utils'
import type { Brand } from '../brands'
import { brands, getEcosystemLinks } from '../brands'

export interface EcosystemNavProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current brand */
  brand: Brand
  /** Variant style */
  variant?: 'pills' | 'dropdown' | 'minimal'
  /** Show brand icons */
  showIcons?: boolean
}

/**
 * Brand color classes for ecosystem nav items
 */
const brandColorClasses: Record<Brand, string> = {
  lux: 'hover:text-[oklch(0.55_0.16_220)] data-[active=true]:text-[oklch(0.55_0.16_220)]',
  hanzo: 'hover:text-[oklch(0.653_0.269_252.44)] data-[active=true]:text-[oklch(0.653_0.269_252.44)]',
  zoo: 'hover:text-[oklch(0.5_0.2_145)] data-[active=true]:text-[oklch(0.5_0.2_145)]',
}

const brandUrls: Record<Brand, string> = {
  lux: 'https://lux.network',
  hanzo: 'https://hanzo.ai',
  zoo: 'https://zoo.ngo',
}

/**
 * Ecosystem navigation component
 *
 * Provides cross-ecosystem navigation between Lux, Hanzo, and Zoo.
 *
 * @example
 * <EcosystemNav brand="lux" variant="pills" />
 */
export function EcosystemNav({
  brand,
  variant = 'pills',
  showIcons = false,
  className,
  ...props
}: EcosystemNavProps) {
  const allBrands = Object.values(brands)

  if (variant === 'minimal') {
    return (
      <nav
        className={cn('flex items-center gap-4', className)}
        aria-label="Ecosystem navigation"
        {...props}
      >
        {allBrands.map((b) => (
          <a
            key={b.name}
            href={brandUrls[b.name]}
            data-active={b.name === brand}
            className={cn(
              'text-sm text-[var(--docs-fg-muted)] transition-colors',
              brandColorClasses[b.name],
              b.name === brand && 'font-medium'
            )}
          >
            {b.displayName}
          </a>
        ))}
      </nav>
    )
  }

  if (variant === 'dropdown') {
    const [open, setOpen] = React.useState(false)
    const currentBrand = brands[brand]

    return (
      <div className={cn('relative', className)} {...props}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cn(
            'inline-flex items-center gap-2 rounded-md px-3 py-2',
            'text-sm font-medium text-[var(--docs-fg)]',
            'bg-[var(--docs-bg-muted)] hover:bg-[var(--docs-secondary-hover)]',
            'transition-colors'
          )}
          aria-expanded={open}
          aria-haspopup="menu"
        >
          {currentBrand.displayName}
          <svg
            className={cn('h-4 w-4 transition-transform', open && 'rotate-180')}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <div className="absolute left-0 top-full mt-2 z-50 min-w-[180px] rounded-md border border-[var(--docs-border)] bg-[var(--docs-bg)] shadow-lg">
              {allBrands.map((b) => (
                <a
                  key={b.name}
                  href={brandUrls[b.name]}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 text-sm',
                    'hover:bg-[var(--docs-bg-muted)] transition-colors',
                    b.name === brand
                      ? 'text-[var(--docs-primary)] bg-[var(--docs-primary-subtle)]'
                      : 'text-[var(--docs-fg)]'
                  )}
                  onClick={() => setOpen(false)}
                >
                  <div className="flex-1">
                    <div className="font-medium">{b.displayName}</div>
                    <div className="text-xs text-[var(--docs-fg-muted)]">
                      {b.tagline}
                    </div>
                  </div>
                  {b.name === brand && (
                    <span className="text-xs text-[var(--docs-fg-muted)]">
                      Current
                    </span>
                  )}
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  // Pills variant (default)
  return (
    <nav
      className={cn(
        'inline-flex rounded-lg border border-[var(--docs-border)] p-1',
        'bg-[var(--docs-bg-muted)]',
        className
      )}
      aria-label="Ecosystem navigation"
      {...props}
    >
      {allBrands.map((b) => (
        <a
          key={b.name}
          href={brandUrls[b.name]}
          data-active={b.name === brand}
          className={cn(
            'inline-flex items-center rounded-md px-4 py-2 text-sm font-medium',
            'transition-colors',
            b.name === brand
              ? 'bg-[var(--docs-bg)] text-[var(--docs-fg)] shadow-sm'
              : 'text-[var(--docs-fg-muted)] hover:text-[var(--docs-fg)]'
          )}
        >
          {b.displayName}
        </a>
      ))}
    </nav>
  )
}
