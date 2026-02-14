/**
 * Brand Logo Exports
 */

// SVG data and utilities
export {
  logoColorSVG,
  logoMonoSVG,
  logoWhiteSVG,
  getLogoSVG,
  getLogoDataURL,
} from './svg'

// React components
export {
  Logo,
  LogoIcon,
  type LogoProps,
  type LogoVariant,
  type LogoSize,
} from './logo'

export {
  Wordmark,
  type WordmarkProps,
} from './wordmark'

export {
  Favicon,
  getFaviconMetadata,
} from './favicon'

// Default export
export { Logo as default } from './logo'
