'use client'

import * as React from 'react'
import { cn } from '../lib/utils'
import type { Brand, BrandConfig } from '../brands'
import { getBrand, getEcosystemLinks } from '../brands'
import { Logo } from './logo'
import { Github, Twitter, MessageCircle } from 'lucide-react'

interface NavItem {
  label: string
  href: string
  external?: boolean
}

interface NavSection {
  label: string
  items: NavItem[]
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Current brand */
  brand: Brand
  /** Additional navigation links */
  links?: NavSection[]
  /** Show ecosystem cross-links */
  showEcosystem?: boolean
  /** Custom logo */
  logo?: React.ReactNode
}

/**
 * Social icon mapping
 */
function SocialIcon({ type, className }: { type: string; className?: string }) {
  const iconClass = cn('h-5 w-5', className)

  switch (type) {
    case 'twitter':
      return <Twitter className={iconClass} />
    case 'github':
      return <Github className={iconClass} />
    case 'discord':
    case 'telegram':
      return <MessageCircle className={iconClass} />
    default:
      return null
  }
}

/**
 * Unified footer component for all ecosystem docs
 *
 * Features:
 * - Brand logo
 * - Navigation links
 * - Cross-ecosystem links
 * - Social links
 * - Copyright
 *
 * @example
 * <Footer brand="lux" showEcosystem />
 */
export function Footer({
  brand,
  links = [],
  showEcosystem = true,
  logo,
  className,
  ...props
}: FooterProps) {
  const config = getBrand(brand)
  const ecosystemLinks = showEcosystem ? getEcosystemLinks(brand) : []
  const currentYear = new Date().getFullYear()

  // Default navigation structure
  const defaultLinks: NavSection[] = [
    {
      label: 'Documentation',
      items: [
        { label: 'Getting Started', href: '/docs' },
        { label: 'Guides', href: '/docs/guides' },
        { label: 'API Reference', href: '/docs/api' },
      ],
    },
    {
      label: 'Community',
      items: [
        { label: 'GitHub', href: config.repoUrl, external: true },
        ...(config.social.discord
          ? [{ label: 'Discord', href: config.social.discord, external: true }]
          : []),
        ...(config.social.twitter
          ? [{ label: 'Twitter', href: config.social.twitter, external: true }]
          : []),
      ],
    },
  ]

  const navLinks = links.length > 0 ? links : defaultLinks

  return (
    <footer
      className={cn(
        'border-t border-[var(--docs-border)] bg-[var(--docs-bg-subtle)]',
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            {logo || <Logo brand={brand} size="lg" className="mb-4" />}
            <p className="mt-4 text-sm text-[var(--docs-fg-muted)] max-w-xs">
              {config.description}
            </p>

            {/* Social links */}
            <div className="mt-6 flex gap-4">
              {Object.entries(config.social).map(([type, url]) =>
                url ? (
                  <a
                    key={type}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--docs-fg-muted)] hover:text-[var(--docs-primary)] transition-colors"
                    aria-label={type}
                  >
                    <SocialIcon type={type} />
                  </a>
                ) : null
              )}
            </div>
          </div>

          {/* Navigation columns */}
          {navLinks.map((section) => (
            <div key={section.label}>
              <h4 className="font-semibold text-[var(--docs-fg)] mb-4">
                {section.label}
              </h4>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-[var(--docs-fg-muted)] hover:text-[var(--docs-primary)] transition-colors"
                    >
                      {item.label}
                      {item.external && (
                        <span className="ml-1 text-xs opacity-50">&#8599;</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Ecosystem column */}
          {showEcosystem && ecosystemLinks.length > 0 && (
            <div>
              <h4 className="font-semibold text-[var(--docs-fg)] mb-4">
                Ecosystem
              </h4>
              <ul className="space-y-3">
                {ecosystemLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--docs-fg-muted)] hover:text-[var(--docs-primary)] transition-colors"
                    >
                      {link.label}
                      <span className="ml-1 text-xs opacity-50">&#8599;</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--docs-border)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[var(--docs-fg-muted)]">
              &copy; {currentYear} {config.displayName}. All rights reserved.
            </p>

            {/* Ecosystem badges */}
            <div className="flex items-center gap-6">
              <span className="text-xs text-[var(--docs-fg-muted)]">
                Part of the
              </span>
              <div className="flex items-center gap-4">
                <a
                  href="https://lux.network"
                  className="text-xs text-[var(--docs-fg-muted)] hover:text-[var(--docs-fg)] transition-colors"
                >
                  Lux
                </a>
                <span className="text-[var(--docs-border)]">|</span>
                <a
                  href="https://hanzo.ai"
                  className="text-xs text-[var(--docs-fg-muted)] hover:text-[var(--docs-fg)] transition-colors"
                >
                  Hanzo
                </a>
                <span className="text-[var(--docs-border)]">|</span>
                <a
                  href="https://zoo.ngo"
                  className="text-xs text-[var(--docs-fg-muted)] hover:text-[var(--docs-fg)] transition-colors"
                >
                  Zoo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
