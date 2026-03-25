/**
 * Gui Configuration for @luxfi/ui
 *
 * Provides cross-platform styling for web and React Native
 */
import { createGui } from '@hanzo/gui'
import { animations } from './animations'
import { fonts } from './fonts'
import { themes } from './themes'
import { tokens } from './tokens'
import { media } from './media'
import { shorthands } from './shorthands'

export type GuiGroupNames = 'item' | 'card'

export const configWithoutAnimations = {
  shorthands,
  fonts,
  themes,
  tokens,
  media,
  settings: {
    shouldAddPrefersColorThemes: true,
    themeClassNameOnRoot: true,
    disableSSR: true,
    onlyAllowShorthands: false,
    allowedStyleValues: false,
    autocompleteSpecificTokens: 'except-special' as const,
    fastSchemeChange: true,
  },
}

export const config = createGui({
  animations,
  ...configWithoutAnimations,
})

export default config

// Type exports
export type LuxConfig = typeof config
declare module 'gui' {
  interface GuiCustomConfig extends LuxConfig {}
}
