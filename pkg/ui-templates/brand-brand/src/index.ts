/**
 * @brand/brand - Brand Identity Package
 *
 * Provides logos, colors, and design system configuration.
 * Works with @hanzo/ui and @brand/ui.
 *
 * @example
 * ```typescript
 * // Import everything
 * import { Logo, Wordmark, palette, brandSystem } from '@brand/brand'
 *
 * // Import CSS variables
 * import '@brand/brand/style/brand-colors.css'
 *
 * // Use components
 * <Logo size="lg" />
 * <Wordmark brandName="MyBrand" />
 * ```
 */

// Logo components and utilities
export {
  Logo,
  LogoIcon,
  Wordmark,
  Favicon,
  getFaviconMetadata,
  getLogoSVG,
  getLogoDataURL,
  logoColorSVG,
  logoMonoSVG,
  logoWhiteSVG,
  type LogoProps,
  type LogoVariant,
  type LogoSize,
  type WordmarkProps,
} from './logo'

// Colors
export {
  palette,
  colors,
  type Palette,
} from './colors'

// Design system
export {
  brandSystem,
  brandTailwindTheme,
  generateTailwindTheme,
  type BrandSystemConfig,
} from './system'

// Default export for convenience
export { Logo as default } from './logo'
