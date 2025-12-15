'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'
import type { Brand } from '../brands'

const logoVariants = cva(
  'inline-flex items-center gap-2 font-semibold transition-opacity hover:opacity-80',
  {
    variants: {
      size: {
        sm: 'text-base',
        md: 'text-lg',
        lg: 'text-xl',
        xl: 'text-2xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const iconSizeMap = {
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
}

export interface LogoProps
  extends React.HTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof logoVariants> {
  /** Brand variant */
  brand: Brand
  /** Show text alongside icon */
  showText?: boolean
  /** Custom icon component */
  icon?: React.ReactNode
  /** Link href */
  href?: string
}

/**
 * Lux Icon - Stylized "L" with network nodes
 */
function LuxIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        width="32"
        height="32"
        rx="8"
        fill="currentColor"
        className="text-[var(--docs-primary)]"
      />
      <path
        d="M10 8v12h8"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="22" cy="10" r="2" fill="white" />
      <circle cx="22" cy="16" r="2" fill="white" />
      <path
        d="M18 20l4-4M18 20l4 4"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  )
}

/**
 * Hanzo Icon - Stylized "H" with AI nodes
 */
function HanzoIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        width="32"
        height="32"
        rx="8"
        fill="currentColor"
        className="text-[var(--docs-primary)]"
      />
      <path
        d="M9 8v16M23 8v16M9 16h14"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="16" cy="8" r="2" fill="white" opacity="0.6" />
      <circle cx="16" cy="24" r="2" fill="white" opacity="0.6" />
    </svg>
  )
}

/**
 * Zoo Icon - Stylized "Z" with organic curves
 */
function ZooIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        width="32"
        height="32"
        rx="8"
        fill="currentColor"
        className="text-[var(--docs-primary)]"
      />
      <path
        d="M10 10h12l-12 12h12"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="16" r="3" fill="white" opacity="0.4" />
    </svg>
  )
}

const brandIcons: Record<Brand, React.ComponentType<{ size?: number }>> = {
  lux: LuxIcon,
  hanzo: HanzoIcon,
  zoo: ZooIcon,
}

const brandNames: Record<Brand, string> = {
  lux: 'Lux',
  hanzo: 'Hanzo',
  zoo: 'Zoo',
}

const brandUrls: Record<Brand, string> = {
  lux: 'https://lux.network',
  hanzo: 'https://hanzo.ai',
  zoo: 'https://zoo.ngo',
}

/**
 * Logo component with brand variants
 *
 * @example
 * <Logo brand="lux" size="lg" />
 * <Logo brand="hanzo" showText={false} />
 * <Logo brand="zoo" href="/docs" />
 */
export const Logo = React.forwardRef<HTMLAnchorElement, LogoProps>(
  ({ brand, size = 'md', showText = true, icon, href, className, ...props }, ref) => {
    const IconComponent = brandIcons[brand]
    const iconSize = iconSizeMap[size || 'md']

    const content = (
      <>
        {icon || <IconComponent size={iconSize} />}
        {showText && (
          <span className="text-[var(--docs-fg)]">{brandNames[brand]}</span>
        )}
      </>
    )

    const finalHref = href || brandUrls[brand]

    return (
      <a
        ref={ref}
        href={finalHref}
        className={cn(logoVariants({ size }), className)}
        {...props}
      >
        {content}
      </a>
    )
  }
)

Logo.displayName = 'Logo'

export { LuxIcon, HanzoIcon, ZooIcon }
