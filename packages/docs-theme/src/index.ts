/**
 * @hanzo/docs-theme
 *
 * Shared Fumadocs theme for Lux, Hanzo, and Zoo ecosystems.
 *
 * @example
 * // Import brand configurations
 * import { getBrand, brands, luxBrand } from '@hanzo/docs-theme/brands'
 *
 * // Import components
 * import { Logo, Footer, ThemeSwitcher } from '@hanzo/docs-theme/components'
 *
 * // Import Tailwind preset
 * import docsPreset from '@hanzo/docs-theme/tailwind-preset'
 *
 * // Import CSS (in your global CSS file)
 * // @import '@hanzo/docs-theme/css/base';
 * // @import '@hanzo/docs-theme/css/brands/lux';
 */

// Re-export everything for convenience
export * from './brands'
export * from './components'
export { cn } from './lib/utils'

// Type exports
export type { Brand, BrandConfig, BrandLink, BrandSocial } from './brands'
export type { LogoProps, FooterProps, ThemeSwitcherProps, EcosystemNavProps } from './components'
