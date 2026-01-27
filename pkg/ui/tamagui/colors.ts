/**
 * Color palette for @luxfi/ui
 *
 * Monochrome design system - pure black/white/gray
 * Inspired by shadcn/ui default theme
 */

// Base colors
const black = '#000000'
const white = '#FFFFFF'

// Gray scale (neutral)
const gray = {
  gray50: '#FAFAFA',
  gray100: '#F4F4F5',
  gray150: '#ECECED',
  gray200: '#E4E4E7',
  gray250: '#DCDCE0',
  gray300: '#D4D4D8',
  gray350: '#B9B9C0',
  gray400: '#A1A1AA',
  gray450: '#8B8B94',
  gray500: '#71717A',
  gray550: '#5F5F67',
  gray600: '#52525B',
  gray650: '#46464E',
  gray700: '#3F3F46',
  gray750: '#333338',
  gray800: '#27272A',
  gray850: '#202023',
  gray900: '#18181B',
  gray950: '#09090B',
}

// Semantic colors
const semantic = {
  // Status colors
  success: '#22C55E',
  successLight: '#4ADE80',
  successDark: '#16A34A',

  warning: '#F59E0B',
  warningLight: '#FBBF24',
  warningDark: '#D97706',

  error: '#EF4444',
  errorLight: '#F87171',
  errorDark: '#DC2626',

  info: '#3B82F6',
  infoLight: '#60A5FA',
  infoDark: '#2563EB',

  // Accent (subtle blue for interactive elements)
  accent: '#3B82F6',
  accentLight: '#60A5FA',
  accentDark: '#2563EB',
}

// All colors combined
export const colors = {
  // Base
  black,
  white,
  transparent: 'transparent',

  // Grays
  ...gray,

  // Semantic
  ...semantic,

  // Aliases for shadcn compatibility
  background: black,
  foreground: white,
  card: gray.gray900,
  cardForeground: white,
  popover: gray.gray900,
  popoverForeground: white,
  primary: white,
  primaryForeground: black,
  secondary: gray.gray800,
  secondaryForeground: white,
  muted: gray.gray800,
  mutedForeground: gray.gray400,
  border: gray.gray800,
  input: gray.gray800,
  ring: gray.gray700,

  // Hover states
  backgroundHovered: gray.gray900,
  cardHovered: gray.gray800,
  primaryHovered: gray.gray100,
  secondaryHovered: gray.gray700,
  mutedHovered: gray.gray700,
}

export type ColorKey = keyof typeof colors
