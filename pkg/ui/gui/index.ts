/**
 * @luxfi/ui Gui Configuration
 *
 * Exports Lux-customized Gui config based on @hanzo/ui system.
 *
 * Usage:
 *   import { guiConfig } from '@luxfi/ui/gui'
 *
 *   // In your app
 *   export default createGui(guiConfig)
 */

import { luxGuiConfig } from '../system'

// Export the Lux Gui config
export const config = luxGuiConfig
export const guiConfig = luxGuiConfig

// Re-export type
export type { GuiConfig } from '@hanzo/ui/system/generators/gui'

// Export individual parts for customization
export const { tokens, fonts, animations, media, themes } = luxGuiConfig
