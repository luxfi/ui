/**
 * @luxfi/ui Tamagui Configuration
 *
 * Exports Lux-customized Tamagui config based on @hanzo/ui system.
 *
 * Usage:
 *   import { tamaguiConfig } from '@luxfi/ui/tamagui'
 *
 *   // In your app
 *   export default createTamagui(tamaguiConfig)
 */

import { luxTamaguiConfig } from '../system'

// Export the Lux Tamagui config
export const config = luxTamaguiConfig
export const tamaguiConfig = luxTamaguiConfig

// Re-export type
export type { TamaguiConfig } from '@hanzo/ui/system/generators/tamagui'

// Export individual parts for customization
export const { tokens, fonts, animations, media, themes } = luxTamaguiConfig
