# Brand Identity Template

This template provides the canonical structure for creating brand identity packages that work with `@hanzo/ui`.

## Key Principle: Unified CSS Variables

**ALL brands use the same `--ui-*` CSS variable names.** This ensures:
- Components work identically across all brands
- No code changes needed when switching brands
- Only the CSS variable VALUES differ per brand

## Quick Start

1. Copy this directory to your brand's package location
2. Replace `BRAND` with your brand name (e.g., `zoo`, `zen`, `pars`, `miga`, `lux`)
3. Replace `Brand` with capitalized name (e.g., `Zoo`, `Zen`, `Pars`, `Miga`, `Lux`)
4. Update logo SVG in `logo/svg.ts`
5. Customize colors in `colors/palette.ts`
6. Customize typography in `system/index.ts`
7. Generate CSS with `--ui-*` variables in `style/brand-colors.css`

## File Structure

```
@brand/brand/
├── src/
│   ├── index.ts              # Main entry - exports everything
│   ├── logo/
│   │   ├── index.ts          # Logo exports
│   │   ├── logo.tsx          # React logo component
│   │   ├── wordmark.tsx      # Logo + brand name
│   │   ├── favicon.tsx       # Favicon component
│   │   └── svg.ts            # Inline SVG data (color, mono, white)
│   ├── colors/
│   │   ├── index.ts          # Color exports
│   │   └── palette.ts        # Brand color palette (hex values)
│   ├── system/
│   │   └── index.ts          # Design system config (typography, spacing)
│   └── style/
│       └── brand-colors.css  # CSS variables (--ui-* prefix)
├── style/
│   └── brand-colors.css      # Symlink or copy for dist
├── package.json
├── tsconfig.json
├── tsup.config.ts
└── README.md
```

## Relationship to @brand/ui

```
@brand/brand (this package)     @brand/ui (UI components)
├── Logo components     ──────> Re-exports logo
├── Color palette       ──────> Uses for theming
├── System config       ──────> Extends @hanzo/ui system
└── CSS variables       ──────> Imported in apps
```

The `@brand/ui` package is a thin wrapper that:
1. Re-exports `@hanzo/ui` components
2. Re-exports logo from `@brand/brand`
3. Provides brand-specific Tailwind preset

## Usage in Apps

```typescript
// Import brand identity
import { Logo, Wordmark, palette } from '@brand/brand'

// Import CSS variables
import '@brand/brand/style/brand-colors.css'

// Use logo component
<Logo size={48} />
<Wordmark size="large" />

// Access color values (for non-CSS use)
console.log(palette.primary.DEFAULT) // '#0A0A0B'
```

## CSS Variables Reference

All brands use these exact variable names (only VALUES differ):

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

--ui-accent        /* Brand highlight */
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

## Customization Guide

### Logo (logo/svg.ts)

Replace the SVG content with your brand's logo:

```typescript
export const logoColorSVG = `<svg viewBox="0 0 100 100" ...>
  <!-- Your brand logo SVG -->
</svg>`
```

### Colors (colors/palette.ts)

Define your brand's color palette:

```typescript
export const palette = {
  primary: {
    DEFAULT: '#YOUR_PRIMARY',
    50: '#LIGHTEST',
    // ... shades
    950: '#DARKEST',
  },
  accent: {
    DEFAULT: '#YOUR_ACCENT',
    light: '#LIGHTER',
    dark: '#DARKER',
  },
  // ...
}
```

### Typography (system/index.ts)

Configure fonts and spacing:

```typescript
export const brandSystem = {
  typography: {
    fonts: {
      display: ['Your Display Font', 'sans-serif'],
      heading: ['Your Heading Font', 'sans-serif'],
      body: ['Your Body Font', 'sans-serif'],
      mono: ['Your Mono Font', 'monospace'],
    },
  },
  spacing: {
    multiplier: 1.0,  // 0.9 = denser, 1.1 = spacious
  },
}
```

### CSS Variables (style/brand-colors.css)

Map your palette to unified variables:

```css
:root, .dark, [data-theme='dark'] {
  --ui-fg-0: hsl(/* your strongest text */);
  --ui-bg-0: hsl(/* your base background */);
  --ui-primary: hsl(/* your primary action */);
  /* ... */
}
```
