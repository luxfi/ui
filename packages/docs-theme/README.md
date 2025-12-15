# @hanzo/docs-theme

Shared Fumadocs theme package for the Lux, Hanzo, and Zoo ecosystems.

## Features

- **OKLCH Color Space**: Perceptually uniform colors for better accessibility
- **Three Brand Themes**: Lux (cyan), Hanzo (purple), Zoo (green)
- **Shared Components**: Logo, Footer, ThemeSwitcher, EcosystemNav
- **Tailwind Preset**: Easy integration with existing Tailwind configs
- **Dark Mode**: Full dark mode support with smooth transitions

## Installation

```bash
pnpm add @hanzo/docs-theme
```

## Quick Start

### 1. Import CSS

In your global CSS file (e.g., `globals.css`):

```css
/* Base theme (required) */
@import '@hanzo/docs-theme/css/base';

/* Choose ONE brand theme */
@import '@hanzo/docs-theme/css/brands/lux';
/* OR */
@import '@hanzo/docs-theme/css/brands/hanzo';
/* OR */
@import '@hanzo/docs-theme/css/brands/zoo';
```

### 2. Configure Tailwind

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import docsPreset from '@hanzo/docs-theme/tailwind-preset'

const config: Config = {
  presets: [docsPreset],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    // Include theme package components
    './node_modules/@hanzo/docs-theme/src/**/*.{ts,tsx}',
  ],
  // Your customizations...
}

export default config
```

### 3. Use Components

```tsx
import { Logo, Footer, ThemeSwitcher, EcosystemNav } from '@hanzo/docs-theme/components'

function DocsLayout({ children }) {
  return (
    <div className="docs-theme">
      <header className="flex items-center justify-between p-4">
        <Logo brand="lux" />
        <div className="flex items-center gap-4">
          <EcosystemNav brand="lux" variant="pills" />
          <ThemeSwitcher variant="dropdown" />
        </div>
      </header>

      <main>{children}</main>

      <Footer brand="lux" showEcosystem />
    </div>
  )
}
```

## CSS Custom Properties

The theme uses CSS custom properties for all colors. You can override any of these:

### Core Colors

| Variable | Description |
|----------|-------------|
| `--docs-bg` | Main background |
| `--docs-fg` | Main foreground/text |
| `--docs-primary` | Primary brand color |
| `--docs-secondary` | Secondary color |
| `--docs-accent` | Accent color |
| `--docs-border` | Border color |
| `--docs-ring` | Focus ring color |

### Sidebar Colors

| Variable | Description |
|----------|-------------|
| `--docs-sidebar-bg` | Sidebar background |
| `--docs-sidebar-fg` | Sidebar text |
| `--docs-sidebar-border` | Sidebar border |
| `--docs-sidebar-item-hover` | Hover state |
| `--docs-sidebar-item-active` | Active item background |
| `--docs-sidebar-item-active-fg` | Active item text |

### Code Block Colors

| Variable | Description |
|----------|-------------|
| `--docs-code-bg` | Code block background |
| `--docs-code-border` | Code block border |
| `--docs-code-fg` | Code text color |

### Callout Colors

| Variable | Description |
|----------|-------------|
| `--docs-info` | Info callout color |
| `--docs-warning` | Warning callout color |
| `--docs-error` | Error callout color |
| `--docs-success` | Success callout color |

## Brand Configurations

Access brand configurations programmatically:

```typescript
import { getBrand, brands, luxBrand, hanzoBrand, zooBrand } from '@hanzo/docs-theme/brands'

// Get a specific brand
const lux = getBrand('lux')
console.log(lux.primaryColor) // 'oklch(0.55 0.16 220)'

// Access all brands
Object.keys(brands) // ['lux', 'hanzo', 'zoo']
```

### Brand Properties

```typescript
interface BrandConfig {
  name: 'lux' | 'hanzo' | 'zoo'
  displayName: string
  tagline: string
  description: string
  primaryColor: string // OKLCH format
  hue: number
  url: string
  docsUrl: string
  repoUrl: string
  social: {
    twitter?: string
    github?: string
    discord?: string
    telegram?: string
  }
  ecosystemLinks: BrandLink[]
  features?: string[]
}
```

## Components

### Logo

```tsx
<Logo brand="lux" size="lg" showText />
<Logo brand="hanzo" size="md" showText={false} />
<Logo brand="zoo" href="/docs" />
```

Props:
- `brand`: 'lux' | 'hanzo' | 'zoo'
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `showText`: boolean
- `href`: string (optional)

### Footer

```tsx
<Footer
  brand="lux"
  showEcosystem
  links={[
    {
      label: 'Resources',
      items: [
        { label: 'Docs', href: '/docs' },
        { label: 'GitHub', href: 'https://github.com/luxfi', external: true },
      ],
    },
  ]}
/>
```

Props:
- `brand`: 'lux' | 'hanzo' | 'zoo'
- `showEcosystem`: boolean (show cross-ecosystem links)
- `links`: Custom navigation sections

### ThemeSwitcher

```tsx
// Button group (default)
<ThemeSwitcher variant="buttons" />

// Dropdown menu
<ThemeSwitcher variant="dropdown" />

// Simple toggle
<ThemeSwitcher variant="toggle" />

// Controlled
const [theme, setTheme] = useState('system')
<ThemeSwitcher theme={theme} onThemeChange={setTheme} />
```

### EcosystemNav

```tsx
// Pills (default)
<EcosystemNav brand="lux" variant="pills" />

// Dropdown
<EcosystemNav brand="hanzo" variant="dropdown" />

// Minimal links
<EcosystemNav brand="zoo" variant="minimal" />
```

## Tailwind Classes

The preset adds these utility classes:

```css
/* Colors */
.bg-docs-bg
.text-docs-fg
.border-docs-border
.bg-docs-primary
.text-docs-primary

/* Spacing */
.w-docs-sidebar    /* sidebar width */
.w-docs-toc        /* table of contents width */
.h-docs-header     /* header height */
.max-w-docs-content /* content max width */

/* Border radius */
.rounded-docs
.rounded-docs-sm
.rounded-docs-lg

/* Animations */
.animate-docs-fade-in
.animate-docs-slide-up
.animate-docs-slide-down
```

## Dynamic Theme Switching

To switch brands at runtime:

```typescript
import { setBrandTheme } from '@hanzo/docs-theme/brands'

// Switch to Hanzo theme
setBrandTheme('hanzo')

// This updates:
// - document.documentElement style (--docs-primary)
// - data-brand attribute
```

## Integration with Fumadocs

```tsx
// fumadocs.config.ts
import { defineConfig } from 'fumadocs-ui/config'
import { getBrand } from '@hanzo/docs-theme/brands'

const brand = getBrand('lux')

export default defineConfig({
  name: brand.displayName,
  url: brand.docsUrl,
  // ...
})
```

## Color Reference

### Lux (Cyan/Blue)
- Primary: `oklch(0.55 0.16 220)`
- Hue: 220

### Hanzo (Purple)
- Primary: `oklch(0.653 0.269 252.44)`
- Hue: 252

### Zoo (Green)
- Primary: `oklch(0.5 0.2 145)`
- Hue: 145

## License

MIT
