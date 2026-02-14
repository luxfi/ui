/**
 * Brand Color Palette
 *
 * These are the raw color VALUES for your brand.
 * They get mapped to --ui-* CSS variables in style/brand-colors.css
 */

export const palette = {
  // Primary brand color
  primary: {
    DEFAULT: '#0A0A0B',
    50: '#F5F5F5',
    100: '#E5E5E5',
    200: '#C4C4C4',
    300: '#A3A3A3',
    400: '#737373',
    500: '#525252',
    600: '#404040',
    700: '#262626',
    800: '#171717',
    900: '#0A0A0B',
    950: '#050505',
  },

  // Secondary color
  secondary: {
    DEFAULT: '#F5F5F5',
    dark: '#E5E5E5',
    darker: '#C4C4C4',
  },

  // Accent / highlight color
  accent: {
    DEFAULT: '#3B82F6',
    light: '#60A5FA',
    dark: '#2563EB',
  },

  // Semantic: Success
  success: {
    DEFAULT: '#10B981',
    light: '#34D399',
    dark: '#059669',
    bg: '#ECFDF5',
    border: '#A7F3D0',
  },

  // Semantic: Warning
  warning: {
    DEFAULT: '#F59E0B',
    light: '#FCD34D',
    dark: '#D97706',
    bg: '#FFFBEB',
    border: '#FDE68A',
  },

  // Semantic: Error/Destructive
  destructive: {
    DEFAULT: '#EF4444',
    light: '#F87171',
    dark: '#DC2626',
    bg: '#FEF2F2',
    border: '#FECACA',
  },

  // Semantic: Info
  info: {
    DEFAULT: '#3B82F6',
    light: '#60A5FA',
    dark: '#2563EB',
    bg: '#EFF6FF',
    border: '#BFDBFE',
  },

  // Neutral scale
  neutral: {
    0: '#FFFFFF',
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0A',
    1000: '#000000',
  },

  // Background colors
  background: {
    light: '#FFFFFF',
    lightSecondary: '#FAFAFA',
    lightTertiary: '#F5F5F5',
    dark: '#0A0A0B',
    darkSecondary: '#171717',
    darkTertiary: '#262626',
  },

  // Text colors
  text: {
    primary: '#0A0A0B',
    secondary: '#525252',
    tertiary: '#737373',
    muted: '#A3A3A3',
    inverse: '#FFFFFF',
    link: '#3B82F6',
  },

  // Border colors
  border: {
    DEFAULT: '#E5E5E5',
    muted: '#F5F5F5',
    strong: '#D4D4D4',
    dark: '#262626',
    darkMuted: '#404040',
  },
} as const

export type Palette = typeof palette
export default palette
