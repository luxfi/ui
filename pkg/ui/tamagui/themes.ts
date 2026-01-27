/**
 * Themes for @luxfi/ui
 *
 * Dark-first monochrome design
 */
import { colors } from './colors'

// Base dark theme (default)
const darkTheme = {
  background: colors.black,
  backgroundHover: colors.gray900,
  backgroundPress: colors.gray850,
  backgroundFocus: colors.gray900,
  backgroundStrong: colors.gray950,
  backgroundTransparent: 'rgba(0, 0, 0, 0)',

  color: colors.white,
  colorHover: colors.gray100,
  colorPress: colors.gray200,
  colorFocus: colors.white,
  colorTransparent: 'rgba(255, 255, 255, 0)',

  borderColor: colors.gray800,
  borderColorHover: colors.gray700,
  borderColorPress: colors.gray600,
  borderColorFocus: colors.gray700,

  placeholderColor: colors.gray500,

  // Semantic
  success: colors.success,
  successBackground: colors.successDark,
  warning: colors.warning,
  warningBackground: colors.warningDark,
  error: colors.error,
  errorBackground: colors.errorDark,
  info: colors.info,
  infoBackground: colors.infoDark,

  // Card
  card: colors.gray900,
  cardHover: colors.gray800,

  // Primary (white on dark)
  primary: colors.white,
  primaryHover: colors.gray100,
  primaryPress: colors.gray200,

  // Secondary
  secondary: colors.gray800,
  secondaryHover: colors.gray700,
  secondaryPress: colors.gray600,

  // Muted
  muted: colors.gray800,
  mutedForeground: colors.gray400,

  // Accent
  accent: colors.accent,
  accentHover: colors.accentLight,
  accentPress: colors.accentDark,
}

// Light theme
const lightTheme = {
  background: colors.white,
  backgroundHover: colors.gray50,
  backgroundPress: colors.gray100,
  backgroundFocus: colors.gray50,
  backgroundStrong: colors.gray100,
  backgroundTransparent: 'rgba(255, 255, 255, 0)',

  color: colors.black,
  colorHover: colors.gray900,
  colorPress: colors.gray800,
  colorFocus: colors.black,
  colorTransparent: 'rgba(0, 0, 0, 0)',

  borderColor: colors.gray200,
  borderColorHover: colors.gray300,
  borderColorPress: colors.gray400,
  borderColorFocus: colors.gray300,

  placeholderColor: colors.gray500,

  // Semantic
  success: colors.success,
  successBackground: colors.successLight,
  warning: colors.warning,
  warningBackground: colors.warningLight,
  error: colors.error,
  errorBackground: colors.errorLight,
  info: colors.info,
  infoBackground: colors.infoLight,

  // Card
  card: colors.white,
  cardHover: colors.gray50,

  // Primary (black on light)
  primary: colors.black,
  primaryHover: colors.gray900,
  primaryPress: colors.gray800,

  // Secondary
  secondary: colors.gray100,
  secondaryHover: colors.gray200,
  secondaryPress: colors.gray300,

  // Muted
  muted: colors.gray100,
  mutedForeground: colors.gray600,

  // Accent
  accent: colors.accent,
  accentHover: colors.accentDark,
  accentPress: colors.accentLight,
}

export const themes = {
  dark: darkTheme,
  light: lightTheme,
}

export type ThemeKey = keyof typeof themes
export type ThemeTokens = typeof darkTheme
