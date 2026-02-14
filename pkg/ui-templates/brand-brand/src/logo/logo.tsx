/**
 * Brand Logo React Component
 */

import React from 'react'
import { getLogoSVG } from './svg'

export type LogoVariant = 'color' | 'mono' | 'white'
export type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number

export interface LogoProps {
  /** Logo color variant */
  variant?: LogoVariant
  /** Predefined size or custom number in pixels */
  size?: LogoSize
  /** Additional CSS class */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
  /** Alt text for accessibility */
  alt?: string
}

const sizeMap: Record<Exclude<LogoSize, number>, number> = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
  '2xl': 96,
}

/**
 * Brand Logo Component
 *
 * @example
 * ```tsx
 * import { Logo } from '@brand/brand'
 *
 * <Logo size="lg" />
 * <Logo variant="mono" size={48} />
 * <Logo variant="white" className="opacity-80" />
 * ```
 */
export function Logo({
  variant = 'color',
  size = 'md',
  className = '',
  style = {},
  alt = 'Brand Logo',
}: LogoProps) {
  const pixelSize = typeof size === 'number' ? size : sizeMap[size]
  const svg = getLogoSVG(variant)

  return (
    <div
      role="img"
      aria-label={alt}
      className={`brand-logo brand-logo--${variant} ${className}`}
      style={{
        width: pixelSize,
        height: pixelSize,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

/**
 * Logo with explicit color prop
 * Useful when you need to override the color dynamically
 */
export function LogoIcon({
  size = 'md',
  color = 'currentColor',
  className = '',
  style = {},
}: Omit<LogoProps, 'variant' | 'alt'> & { color?: string }) {
  const pixelSize = typeof size === 'number' ? size : sizeMap[size]

  return (
    <div
      className={`brand-logo-icon ${className}`}
      style={{
        width: pixelSize,
        height: pixelSize,
        color,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: getLogoSVG('mono') }}
    />
  )
}

export default Logo
