/**
 * Font configuration for @luxfi/ui
 *
 * Uses Inter as the primary font family
 */
import { createFont } from '@tamagui/core'

const interFace = {
  normal: { normal: 'Inter' },
  bold: { normal: 'InterBold' },
}

// Font definitions with proper weights
const heading1 = {
  fontSize: 52,
  lineHeight: 60,
  fontWeight: '500' as const,
  letterSpacing: -0.5,
}

const heading2 = {
  fontSize: 36,
  lineHeight: 44,
  fontWeight: '500' as const,
  letterSpacing: -0.25,
}

const heading3 = {
  fontSize: 24,
  lineHeight: 32,
  fontWeight: '500' as const,
  letterSpacing: 0,
}

const subheading1 = {
  fontSize: 18,
  lineHeight: 24,
  fontWeight: '500' as const,
  letterSpacing: 0,
}

const subheading2 = {
  fontSize: 16,
  lineHeight: 24,
  fontWeight: '500' as const,
  letterSpacing: 0,
}

const body1 = {
  fontSize: 18,
  lineHeight: 28,
  fontWeight: '400' as const,
  letterSpacing: 0,
}

const body2 = {
  fontSize: 16,
  lineHeight: 24,
  fontWeight: '400' as const,
  letterSpacing: 0,
}

const body3 = {
  fontSize: 14,
  lineHeight: 20,
  fontWeight: '400' as const,
  letterSpacing: 0,
}

const buttonLabel1 = {
  fontSize: 18,
  lineHeight: 24,
  fontWeight: '500' as const,
  letterSpacing: 0,
}

const buttonLabel2 = {
  fontSize: 16,
  lineHeight: 24,
  fontWeight: '500' as const,
  letterSpacing: 0,
}

const buttonLabel3 = {
  fontSize: 14,
  lineHeight: 20,
  fontWeight: '500' as const,
  letterSpacing: 0,
}

const buttonLabel4 = {
  fontSize: 12,
  lineHeight: 16,
  fontWeight: '500' as const,
  letterSpacing: 0,
}

const monospace = {
  fontSize: 14,
  lineHeight: 20,
  fontWeight: '400' as const,
  letterSpacing: 0,
}

export const fontSizes = {
  heading1,
  heading2,
  heading3,
  subheading1,
  subheading2,
  body1,
  body2,
  body3,
  buttonLabel1,
  buttonLabel2,
  buttonLabel3,
  buttonLabel4,
  monospace,
}

// Create Tamagui fonts
const interFont = createFont({
  family: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 48,
    12: 52,
    true: 16,
  },
  lineHeight: {
    1: 16,
    2: 20,
    3: 24,
    4: 28,
    5: 28,
    6: 32,
    7: 36,
    8: 40,
    9: 44,
    10: 48,
    11: 56,
    12: 60,
    true: 24,
  },
  weight: {
    1: '400',
    2: '400',
    3: '400',
    4: '500',
    5: '500',
    6: '600',
    7: '700',
    true: '400',
  },
  letterSpacing: {
    1: 0,
    2: 0,
    3: 0,
    4: -0.25,
    5: -0.25,
    6: -0.5,
    true: 0,
  },
  face: interFace,
})

const monoFont = createFont({
  family: '"SF Mono", "Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',
  size: {
    1: 12,
    2: 14,
    3: 16,
    true: 14,
  },
  lineHeight: {
    1: 16,
    2: 20,
    3: 24,
    true: 20,
  },
  weight: {
    1: '400',
    true: '400',
  },
  letterSpacing: {
    1: 0,
    true: 0,
  },
})

export const fonts = {
  heading: interFont,
  body: interFont,
  mono: monoFont,
}

export const allFonts = fonts
