/**
 * @BRAND/ui Design System
 *
 * Imports configuration from @brand/brand and generates
 * Tailwind theme for use in @brand/ui's preset.
 */

import { createDesignSystem, type DesignSystemConfig } from '@hanzo/ui/system'
import { brandSystem as brandConfig } from '@brand/brand'

// Re-export @hanzo/ui system types
export type { DesignSystemConfig }

/**
 * Create @hanzo/ui design system from @brand/brand config
 */
export const brandSystem = createDesignSystem({
  typography: {
    fonts: brandConfig.typography.fonts,
    sizes: brandConfig.typography.sizes,
  },
  spacing: brandConfig.spacing,
  grid: brandConfig.grid,
  cssVarsPrefix: 'ui', // Unified prefix for all brands
})

// Tailwind theme for use in tailwind.config.brand.ts
export const brandTailwindTheme = brandSystem.tailwind
