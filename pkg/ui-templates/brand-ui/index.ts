/**
 * @BRAND/ui Main Entry Point
 *
 * This is a thin wrapper over @hanzo/ui that:
 * 1. Re-exports ALL @hanzo/ui components unchanged
 * 2. Re-exports brand identity from @brand/brand (logo, colors)
 * 3. Provides brand-specific Tailwind preset
 *
 * Import pattern:
 *   import { Button, Card, Logo } from '@brand/ui'
 */

// ============================================================
// RE-EXPORT ALL @hanzo/ui COMPONENTS (unchanged)
// ============================================================

// All primitives
export * from '@hanzo/ui/primitives'

// Utilities
export { cn } from '@hanzo/ui/utils'
export type { ClassValue } from 'clsx'

// Registry and types
export * from '@hanzo/ui/registry'
export * from '@hanzo/ui/types'

// ============================================================
// RE-EXPORT BRAND IDENTITY FROM @brand/brand
// ============================================================

// Logo components
export {
  Logo,
  LogoIcon,
  Wordmark,
  Favicon,
  getFaviconMetadata,
  type LogoProps,
  type LogoVariant,
  type LogoSize,
  type WordmarkProps,
} from '@brand/brand'

// Color palette (for programmatic access)
export { palette, colors, type Palette } from '@brand/brand'

// ============================================================
// BRAND DESIGN SYSTEM (for Tailwind preset)
// ============================================================

export {
  brandSystem,
  brandTailwindTheme,
} from './system'
