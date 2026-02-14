/**
 * Brand Logo SVG Data
 *
 * Replace these with your brand's actual logo SVG.
 * The viewBox should be consistent across variants.
 */

/**
 * Full color logo SVG
 * Used as the primary logo in most contexts
 */
export const logoColorSVG = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Replace with your brand logo -->
  <rect x="10" y="10" width="80" height="80" rx="8" fill="currentColor"/>
  <rect x="25" y="25" width="50" height="50" rx="4" fill="white" fill-opacity="0.2"/>
  <path d="M45 35L55 45L45 55L35 45L45 35Z" fill="white"/>
</svg>`

/**
 * Monochrome logo SVG
 * Used when color is not available or appropriate
 */
export const logoMonoSVG = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Replace with your brand logo (mono version) -->
  <rect x="10" y="10" width="80" height="80" rx="8" fill="currentColor"/>
  <rect x="25" y="25" width="50" height="50" rx="4" stroke="currentColor" stroke-width="2" fill="none" opacity="0.5"/>
  <path d="M45 35L55 45L45 55L35 45L45 35Z" fill="currentColor" opacity="0.8"/>
</svg>`

/**
 * White logo SVG
 * Used on dark backgrounds
 */
export const logoWhiteSVG = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Replace with your brand logo (white version) -->
  <rect x="10" y="10" width="80" height="80" rx="8" fill="white"/>
  <rect x="25" y="25" width="50" height="50" rx="4" fill="white" fill-opacity="0.2"/>
  <path d="M45 35L55 45L45 55L35 45L45 35Z" fill="rgba(0,0,0,0.8)"/>
</svg>`

/**
 * Get logo SVG by variant
 */
export function getLogoSVG(variant: 'color' | 'mono' | 'white' = 'color'): string {
  switch (variant) {
    case 'mono':
      return logoMonoSVG
    case 'white':
      return logoWhiteSVG
    default:
      return logoColorSVG
  }
}

/**
 * Get logo as data URL for use in img src
 */
export function getLogoDataURL(variant: 'color' | 'mono' | 'white' = 'color'): string {
  const svg = getLogoSVG(variant)
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
