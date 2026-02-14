# Brand UI Template

This template provides the canonical structure for creating brand-specific UI packages that wrap `@hanzo/ui`.

## Key Principle: Unified CSS Variables

**ALL brands use the same `--ui-*` CSS variable names.** This ensures:
- Components work identically across all brands
- No code changes needed when switching brands
- Only the CSS variable VALUES differ per brand

## Architecture

```
@brand/brand (identity)        @brand/ui (components)
├── Logo components    ──────> Re-exports logo
├── Color palette      ──────> Uses for theming
├── Design system      ──────> Generates Tailwind
└── CSS variables      ──────> Imported in apps
                              │
                              │
@hanzo/ui (primitives) ───────> Re-exports primitives
├── Button, Card, etc.
├── Utilities (cn)
└── Types
```

## Quick Start

1. First create `@brand/brand` package from the brand-brand template
2. Copy this directory to your brand's ui package location
3. Replace `BRAND` with your brand name (e.g., `zoo`, `zen`, `pars`, `miga`)
4. Replace `Brand` with capitalized name (e.g., `Zoo`, `Zen`, `Pars`, `Miga`)
5. Update package.json with correct package names
6. Install dependencies: `pnpm install`
7. Build: `pnpm build`

## File Structure

```
@brand/ui/
├── index.ts                  # Main entry - re-exports @hanzo/ui + @brand/brand
├── system/
│   └── index.ts              # Generates Tailwind theme from @brand/brand config
├── style/
│   └── brand-colors.css      # Symlink to @brand/brand/style/brand-colors.css
├── tailwind.config.brand.ts  # Tailwind preset using unified --ui-* variables
├── package.json
├── tsconfig.json
└── tsup.config.ts
```

## CSS Variables Reference

All brands use these exact variable names:

```css
/* Foreground (text) */
--ui-fg-0          /* Strongest text */
--ui-fg-body       /* Body text */
--ui-fg-1          /* Secondary text */
--ui-fg-2          /* Tertiary text */
--ui-fg-3          /* Quaternary text */
--ui-fg-muted      /* Muted text */

/* Background (surfaces) */
--ui-bg-0          /* Base background */
--ui-bg-1          /* Elevated surface */
--ui-bg-2          /* Higher elevation */
--ui-bg-3          /* Highest elevation */
--ui-bg-overlay    /* Overlay/modal backdrop */

/* Semantic colors */
--ui-primary       /* Main action color */
--ui-primary-hover
--ui-primary-fg    /* Text on primary */

--ui-secondary
--ui-secondary-hover
--ui-secondary-fg

--ui-accent        /* Brand highlight (optional) */
--ui-accent-hover
--ui-accent-fg

--ui-destructive   /* Error/delete */
--ui-destructive-hover
--ui-destructive-fg

--ui-success       /* Success/positive */
--ui-success-hover
--ui-success-fg

--ui-warning       /* Warning/caution */
--ui-warning-hover
--ui-warning-fg

/* UI elements */
--ui-border
--ui-border-muted
--ui-ring          /* Focus ring */
--ui-radius        /* Border radius */

/* Navigation */
--ui-nav
--ui-nav-hover
--ui-nav-current
```

## Usage in Apps

```typescript
// In your app's layout
import '@brand/brand/style/brand-colors.css'  // CSS variables

// In your components
import { Button, Card, Logo, Wordmark } from '@brand/ui'

// In tailwind.config.js
import brandPreset from '@brand/ui/tailwind.config.brand'
export default { presets: [brandPreset] }
```

## Adding Brand-Specific Components

For components unique to your brand (beyond what's in @hanzo/ui):

1. Create in `@brand/brand/components/` (if just a wrapper around logo/identity)
2. Or create in `@brand/ui/components/` (if it uses @hanzo/ui primitives)

```typescript
// @brand/ui/components/branded-header.tsx
import React from 'react'
import { Wordmark } from '@brand/brand'
import { cn } from '@hanzo/ui/utils'

export function BrandedHeader({ className }: { className?: string }) {
  return (
    <header className={cn('bg-level-1 border-b border-border p-4', className)}>
      <Wordmark size="lg" />
    </header>
  )
}
```

Export from index.ts:
```typescript
export { BrandedHeader } from './components/branded-header'
```
