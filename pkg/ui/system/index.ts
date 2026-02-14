/**
 * @luxfi/ui Design System
 *
 * Thin wrapper over @hanzo/ui system with Lux-specific customizations.
 * This is the ONLY place where Lux design customizations should live.
 */

import { createDesignSystem, type DesignSystemConfig } from '@hanzo/ui/system'

// Re-export everything from @hanzo/ui system
export * from '@hanzo/ui/system'

/**
 * Lux Design System Configuration
 *
 * Customizations on top of @hanzo/ui defaults:
 * - Monochrome color palette (dark-first)
 * - Slightly denser spacing for trading UIs
 * - Custom display fonts for branding
 */
export const luxConfig: DesignSystemConfig = {
  typography: {
    fonts: {
      // Keep Inter for body, but allow Lux-specific display font
      display: ['Inter', 'system-ui', 'sans-serif'],
      heading: ['Inter', 'system-ui', 'sans-serif'],
      // Monospace for trading/numbers
      mono: ['JetBrains Mono', 'SF Mono', 'Fira Code', 'monospace'],
    },
    // Slightly larger base for readability on trading screens
    sizes: {
      base: { size: 15, lineHeight: 22 },
    },
  },

  spacing: {
    // 90% of default - slightly denser for data-rich UIs
    multiplier: 0.9,
  },

  grid: {
    // Tighter gutters for trading layouts
    gutter: 12,
  },

  // Unified CSS variable prefix (same for ALL brands)
  cssVarsPrefix: 'ui',
}

/**
 * Pre-built Lux Design System
 *
 * Usage:
 *
 * // tailwind.config.js
 * import { luxTokens } from '@luxfi/ui/system'
 * export default { theme: luxTokens.tailwind }
 *
 * // tamagui.config.ts
 * import { luxTokens } from '@luxfi/ui/system'
 * export default createTamagui(luxTokens.tamagui)
 *
 * // globals.css
 * import { luxTokens } from '@luxfi/ui/system'
 * // luxTokens.cssVars contains the CSS variable definitions
 */
export const luxTokens = createDesignSystem(luxConfig)

// Convenience exports
export const luxTailwindTheme = luxTokens.tailwind
export const luxTamaguiConfig = luxTokens.tamagui
export const luxCSSVars = luxTokens.cssVars

/**
 * Create a custom Lux design system with additional overrides
 *
 * @example
 * ```ts
 * // For a specific app that needs even denser spacing
 * const appTokens = createLuxDesignSystem({
 *   spacing: { multiplier: 0.8 }
 * })
 * ```
 */
export function createLuxDesignSystem(overrides: Partial<DesignSystemConfig> = {}) {
  return createDesignSystem({
    ...luxConfig,
    typography: {
      ...luxConfig.typography,
      ...overrides.typography,
      fonts: {
        ...luxConfig.typography?.fonts,
        ...overrides.typography?.fonts,
      },
    },
    spacing: {
      ...luxConfig.spacing,
      ...overrides.spacing,
    },
    grid: {
      ...luxConfig.grid,
      ...overrides.grid,
    },
    cssVarsPrefix: overrides.cssVarsPrefix || luxConfig.cssVarsPrefix,
  })
}
