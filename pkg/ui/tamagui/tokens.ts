/**
 * Design tokens for @luxfi/ui
 *
 * Monochrome design system inspired by shadcn/ui and Vercel
 */
import { createTokens } from '@tamagui/core'
import { colors } from './colors'

// Spacing scale
export const spacing = {
  spacing0: 0,
  spacing1: 1,
  spacing2: 2,
  spacing4: 4,
  spacing6: 6,
  spacing8: 8,
  spacing10: 10,
  spacing12: 12,
  spacing14: 14,
  spacing16: 16,
  spacing18: 18,
  spacing20: 20,
  spacing24: 24,
  spacing28: 28,
  spacing32: 32,
  spacing36: 36,
  spacing40: 40,
  spacing48: 48,
  spacing60: 60,
  spacing64: 64,
  spacing80: 80,
  spacing100: 100,
  spacing120: 120,
}

export const padding = {
  padding0: 0,
  padding2: 2,
  padding4: 4,
  padding6: 6,
  padding8: 8,
  padding10: 10,
  padding12: 12,
  padding16: 16,
  padding20: 20,
  padding24: 24,
  padding32: 32,
  padding36: 36,
  padding48: 48,
}

export const gap = {
  gap2: 2,
  gap4: 4,
  gap8: 8,
  gap12: 12,
  gap16: 16,
  gap20: 20,
  gap24: 24,
  gap36: 36,
}

// Border radii
export const borderRadii = {
  none: 0,
  rounded4: 4,
  rounded6: 6,
  rounded8: 8,
  rounded12: 12,
  rounded16: 16,
  rounded20: 20,
  rounded24: 24,
  rounded32: 32,
  roundedFull: 9999,
}

// Icon sizes
export const iconSizes = {
  icon8: 8,
  icon12: 12,
  icon16: 16,
  icon18: 18,
  icon20: 20,
  icon24: 24,
  icon28: 28,
  icon36: 36,
  icon40: 40,
  icon48: 48,
  icon64: 64,
  icon70: 70,
  icon100: 100,
}

// Image sizes
export const imageSizes = {
  image16: 16,
  image20: 20,
  image24: 24,
  image32: 32,
  image36: 36,
  image40: 40,
  image48: 48,
  image64: 64,
  image100: 100,
}

// Z-indexes
export const zIndexes = {
  default: 1,
  background: -1,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
}

// Font sizes (based on Inter)
const fontSize = {
  heading1: 52,
  heading2: 36,
  heading3: 24,
  subheading1: 18,
  subheading2: 16,
  body1: 18,
  body2: 16,
  body3: 14,
  buttonLabel1: 18,
  buttonLabel2: 16,
  buttonLabel3: 14,
  buttonLabel4: 12,
  monospace: 14,
  true: 16,
}

const space = { ...spacing, ...padding, ...gap, true: spacing.spacing8 }
const size = space
const iconSize = {
  true: iconSizes.icon40,
  8: iconSizes.icon8,
  12: iconSizes.icon12,
  16: iconSizes.icon16,
  18: iconSizes.icon18,
  20: iconSizes.icon20,
  24: iconSizes.icon24,
  28: iconSizes.icon28,
  36: iconSizes.icon36,
  40: iconSizes.icon40,
  48: iconSizes.icon48,
  64: iconSizes.icon64,
  70: iconSizes.icon70,
  100: iconSizes.icon100,
}
const imageSize = { ...imageSizes, true: imageSizes.image40 }
const radius = { ...borderRadii, true: borderRadii.none }
const zIndex = { ...zIndexes, true: zIndexes.default }

export const tokens = createTokens({
  color: colors,
  space,
  size,
  font: fontSize,
  icon: iconSize,
  image: imageSize,
  zIndex,
  radius,
})

export type IconSizeTokens = `$icon.${keyof typeof iconSize}`
