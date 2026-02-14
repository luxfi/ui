/**
 * Brand Favicon Component
 */

import React from 'react'
import { getLogoDataURL } from './svg'

/**
 * Favicon Component
 *
 * Renders link tags for favicon in document head.
 * Use in your app's <head> or with Next.js Metadata.
 *
 * @example
 * ```tsx
 * import { Favicon } from '@brand/brand'
 *
 * // In your layout head
 * <head>
 *   <Favicon />
 * </head>
 * ```
 */
export function Favicon() {
  const faviconUrl = getLogoDataURL('color')

  return (
    <>
      <link rel="icon" type="image/svg+xml" href={faviconUrl} />
      <link rel="apple-touch-icon" href={faviconUrl} />
    </>
  )
}

/**
 * Get favicon URLs for use with Next.js Metadata API
 *
 * @example
 * ```typescript
 * import { getFaviconMetadata } from '@brand/brand'
 *
 * export const metadata = {
 *   icons: getFaviconMetadata(),
 * }
 * ```
 */
export function getFaviconMetadata() {
  const faviconUrl = getLogoDataURL('color')

  return {
    icon: faviconUrl,
    apple: faviconUrl,
  }
}

export default Favicon
