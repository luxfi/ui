/**
 * @hanzo/docs-theme - Brand Configurations
 *
 * TypeScript configurations for each ecosystem brand.
 * Use these to configure components, metadata, and navigation.
 */

export type Brand = 'lux' | 'hanzo' | 'zoo'

export interface BrandLink {
  label: string
  href: string
  external?: boolean
}

export interface BrandSocial {
  twitter?: string
  github?: string
  discord?: string
  telegram?: string
}

export interface BrandConfig {
  name: Brand
  displayName: string
  tagline: string
  description: string

  /** Primary brand color in OKLCH */
  primaryColor: string
  /** Hue value for OKLCH color adjustments */
  hue: number

  /** URLs */
  url: string
  docsUrl: string
  repoUrl: string

  /** Social links */
  social: BrandSocial

  /** Cross-ecosystem navigation */
  ecosystemLinks: BrandLink[]

  /** Brand-specific features */
  features?: string[]
}

/**
 * Lux - Blockchain Technology
 */
export const luxBrand: BrandConfig = {
  name: 'lux',
  displayName: 'Lux',
  tagline: 'Multi-Consensus Blockchain',
  description: 'High-performance blockchain with post-quantum cryptography and multi-consensus architecture.',

  primaryColor: 'oklch(0.55 0.16 220)',
  hue: 220,

  url: 'https://lux.network',
  docsUrl: 'https://docs.lux.network',
  repoUrl: 'https://github.com/luxfi',

  social: {
    twitter: 'https://twitter.com/luxfi',
    github: 'https://github.com/luxfi',
    discord: 'https://discord.gg/lux',
    telegram: 'https://t.me/luxfi',
  },

  ecosystemLinks: [
    { label: 'Hanzo AI', href: 'https://hanzo.ai' },
    { label: 'Zoo Labs', href: 'https://zoo.ngo' },
    { label: 'Lux Bridge', href: 'https://bridge.lux.network' },
    { label: 'Lux Explorer', href: 'https://explorer.lux.network' },
  ],

  features: [
    'Multi-consensus engine',
    'Post-quantum cryptography',
    'Cross-chain bridges',
    'High throughput (10,000+ TPS)',
  ],
}

/**
 * Hanzo - AI Company
 */
export const hanzoBrand: BrandConfig = {
  name: 'hanzo',
  displayName: 'Hanzo AI',
  tagline: 'Frontier AI & Foundational Models',
  description: 'Building cutting-edge AI infrastructure, LLMs, and the Model Context Protocol (MCP).',

  primaryColor: 'oklch(0.653 0.269 252.44)',
  hue: 252,

  url: 'https://hanzo.ai',
  docsUrl: 'https://docs.hanzo.ai',
  repoUrl: 'https://github.com/hanzoai',

  social: {
    twitter: 'https://twitter.com/hanaboroshi',
    github: 'https://github.com/hanzoai',
    discord: 'https://discord.gg/hanzo',
  },

  ecosystemLinks: [
    { label: 'Lux Network', href: 'https://lux.network' },
    { label: 'Zoo Labs', href: 'https://zoo.ngo' },
    { label: 'Hanzo UI', href: 'https://ui.hanzo.ai' },
    { label: 'Hanzo MCP', href: 'https://mcp.hanzo.ai' },
  ],

  features: [
    'Large Language Models',
    'Model Context Protocol',
    'AI Agent Frameworks',
    'Multimodal AI (Jin)',
  ],
}

/**
 * Zoo - Open AI Research Network
 */
export const zooBrand: BrandConfig = {
  name: 'zoo',
  displayName: 'Zoo Labs',
  tagline: 'Open AI Research Network',
  description: 'Zoo Labs Foundation - Decentralized AI research and DeSci initiatives.',

  primaryColor: 'oklch(0.5 0.2 145)',
  hue: 145,

  url: 'https://zoo.ngo',
  docsUrl: 'https://docs.zoo.ngo',
  repoUrl: 'https://github.com/zoolabs',

  social: {
    twitter: 'https://twitter.com/zoolabs',
    github: 'https://github.com/zoolabs',
    discord: 'https://discord.gg/zoo',
  },

  ecosystemLinks: [
    { label: 'Hanzo AI', href: 'https://hanzo.ai' },
    { label: 'Lux Network', href: 'https://lux.network' },
    { label: 'ZIPs Governance', href: 'https://zips.zoo.ngo' },
    { label: 'Zoo Research', href: 'https://research.zoo.ngo' },
  ],

  features: [
    'Decentralized AI (DeAI)',
    'Decentralized Science (DeSci)',
    'ZIPs Governance',
    'Open Research Network',
  ],
}

/**
 * All brand configurations
 */
export const brands: Record<Brand, BrandConfig> = {
  lux: luxBrand,
  hanzo: hanzoBrand,
  zoo: zooBrand,
}

/**
 * Get brand configuration by name
 */
export function getBrand(name: Brand): BrandConfig {
  return brands[name]
}

/**
 * Get all ecosystem links for cross-navigation
 * Excludes the current brand from the list
 */
export function getEcosystemLinks(currentBrand: Brand): BrandLink[] {
  const allLinks: BrandLink[] = [
    { label: 'Lux Network', href: 'https://lux.network' },
    { label: 'Hanzo AI', href: 'https://hanzo.ai' },
    { label: 'Zoo Labs', href: 'https://zoo.ngo' },
  ]

  return allLinks.filter((link) => {
    const brandUrls: Record<Brand, string> = {
      lux: 'https://lux.network',
      hanzo: 'https://hanzo.ai',
      zoo: 'https://zoo.ngo',
    }
    return link.href !== brandUrls[currentBrand]
  })
}

/**
 * CSS variable setter for brand theming
 * Call this to dynamically switch brands in JavaScript
 */
export function setBrandTheme(brand: Brand): void {
  const config = getBrand(brand)
  const root = document.documentElement

  root.style.setProperty('--docs-primary', config.primaryColor)
  root.setAttribute('data-brand', brand)
}
