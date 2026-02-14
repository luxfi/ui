# @luxfi/ui-templates

Brand UI templates for creating `@brand/brand` and `@brand/ui` packages that work with `@hanzo/ui`.

## Templates

### `brand-brand/` - Brand Identity Package

Template for creating brand identity packages containing:
- Logo components (Logo, Wordmark, Favicon)
- Color palette
- Design system config (typography, spacing)
- CSS variables with unified `--ui-*` prefix

### `brand-ui/` - UI Components Package

Template for creating brand UI packages that:
- Re-export ALL `@hanzo/ui` components unchanged
- Re-export logo components from `@brand/brand`
- Provide Tailwind preset using unified `--ui-*` variables

## Quick Start

```bash
# 1. Copy brand-brand template
cp -r node_modules/@luxfi/ui-templates/brand-brand ./packages/brand

# 2. Copy brand-ui template
cp -r node_modules/@luxfi/ui-templates/brand-ui ./packages/ui

# 3. Find/replace placeholders:
#    - @brand/brand → @zooai/brand (or your brand)
#    - @brand/ui → @zooai/ui
#    - Brand → Zoo

# 4. Customize:
#    - brand/src/logo/svg.ts - Your logo SVG
#    - brand/src/colors/palette.ts - Your colors
#    - brand/style/brand-colors.css - CSS variable values
```

## Architecture

```
@brand/brand (identity)        @brand/ui (components)
├── Logo, Wordmark     ──────> Re-exports logo
├── Color palette      ──────> Uses for theming
├── Design system      ──────> Generates Tailwind theme
└── CSS variables      ──────> Imported in apps
                              │
@hanzo/ui (primitives) ───────> Re-exports unchanged
├── Button, Card, etc.
```

## Key Principle: Unified CSS Variables

**ALL brands use the same `--ui-*` CSS variable names.**

This ensures:
- Components work identically across all brands
- No code changes needed when switching brands
- Only the CSS variable VALUES differ per brand

## CSS Variables

```css
/* Foreground */
--ui-fg-0, --ui-fg-body, --ui-fg-1, --ui-fg-2, --ui-fg-3, --ui-fg-muted

/* Background */
--ui-bg-0, --ui-bg-1, --ui-bg-2, --ui-bg-3, --ui-bg-overlay

/* Semantic */
--ui-primary, --ui-secondary, --ui-accent
--ui-destructive, --ui-success, --ui-warning

/* UI Elements */
--ui-border, --ui-border-muted, --ui-ring, --ui-radius

/* Navigation */
--ui-nav, --ui-nav-hover, --ui-nav-current
```

## Usage in Apps

```typescript
// Import CSS variables from brand
import '@zooai/brand/style/brand-colors.css'

// Import components from brand UI
import { Button, Card, Logo, Wordmark } from '@zooai/ui'

// Tailwind config
import brandPreset from '@zooai/ui/tailwind.config.brand'
export default { presets: [brandPreset] }
```

## Supported Brands

These templates are used by:
- `@luxfi/brand` + `@luxfi/ui`
- `@zooai/brand` + `@zooai/ui`
- `@pars/brand` + `@pars/ui`
- And any other brand following the pattern

## License

MIT
