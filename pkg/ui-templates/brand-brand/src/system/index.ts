/**
 * Brand Design System Configuration
 *
 * This configuration extends @hanzo/ui's design system with brand-specific values.
 * Used by @brand/ui to generate Tailwind theme and other outputs.
 */

export interface BrandSystemConfig {
  typography: {
    fonts: {
      display: string[]
      heading: string[]
      body: string[]
      mono: string[]
    }
    sizes?: {
      base?: { size: number; lineHeight: number }
    }
  }
  spacing: {
    /** Multiplier for spacing scale: 0.9 = denser, 1.0 = default, 1.1 = spacious */
    multiplier: number
  }
  grid?: {
    gutter: number
  }
  radius?: {
    /** Default border radius in pixels */
    default: number
  }
}

/**
 * Brand Design System Configuration
 *
 * Customize these values for your brand:
 * - typography.fonts: Your brand's font stacks
 * - spacing.multiplier: 0.9 for dense UIs (trading), 1.1 for spacious
 * - radius.default: Sharp (2-4px) vs rounded (8-12px)
 */
export const brandSystem: BrandSystemConfig = {
  typography: {
    fonts: {
      // Replace with your brand's fonts
      display: ['Inter', 'system-ui', 'sans-serif'],
      heading: ['Inter', 'system-ui', 'sans-serif'],
      body: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'SF Mono', 'Fira Code', 'monospace'],
    },
    sizes: {
      base: { size: 16, lineHeight: 24 },
    },
  },
  spacing: {
    // 1.0 = default, 0.9 = denser (trading UIs), 1.1 = more spacious
    multiplier: 1.0,
  },
  grid: {
    gutter: 16,
  },
  radius: {
    default: 8,
  },
}

/**
 * Generate Tailwind theme extension from brand system config
 */
export function generateTailwindTheme(config: BrandSystemConfig = brandSystem) {
  const { typography, spacing, radius } = config

  return {
    fontFamily: {
      display: typography.fonts.display,
      heading: typography.fonts.heading,
      sans: typography.fonts.body,
      mono: typography.fonts.mono,
    },
    fontSize: {
      // Scale base size by multiplier
      base: [
        `${(typography.sizes?.base?.size ?? 16) * spacing.multiplier}px`,
        { lineHeight: `${(typography.sizes?.base?.lineHeight ?? 24) * spacing.multiplier}px` },
      ],
    },
    spacing: {
      // Apply multiplier to common spacing values
      0.5: `${2 * spacing.multiplier}px`,
      1: `${4 * spacing.multiplier}px`,
      2: `${8 * spacing.multiplier}px`,
      3: `${12 * spacing.multiplier}px`,
      4: `${16 * spacing.multiplier}px`,
      5: `${20 * spacing.multiplier}px`,
      6: `${24 * spacing.multiplier}px`,
      8: `${32 * spacing.multiplier}px`,
      10: `${40 * spacing.multiplier}px`,
      12: `${48 * spacing.multiplier}px`,
      16: `${64 * spacing.multiplier}px`,
    },
    borderRadius: {
      DEFAULT: `${radius?.default ?? 8}px`,
      sm: `${(radius?.default ?? 8) * 0.5}px`,
      md: `${radius?.default ?? 8}px`,
      lg: `${(radius?.default ?? 8) * 1.5}px`,
      xl: `${(radius?.default ?? 8) * 2}px`,
    },
  }
}

export const brandTailwindTheme = generateTailwindTheme(brandSystem)

export default brandSystem
