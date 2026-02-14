/**
 * @luxfi/ui Main Entry Point
 *
 * This is a thin wrapper over @hanzo/ui that:
 * 1. Re-exports ALL @hanzo/ui components unchanged
 * 2. Adds Lux-specific components (Logo, Footer, Header, etc.)
 * 3. Provides Lux design tokens
 *
 * Import pattern:
 *   import { Button, Card, Logo } from '@luxfi/ui'
 */

// ============================================================
// RE-EXPORT ALL @hanzo/ui COMPONENTS (unchanged)
// ============================================================

// All primitives
export * from '@hanzo/ui/primitives'

// Utilities
export { cn } from '@hanzo/ui/utils'
export type { ClassValue } from 'clsx'

// Registry and types
export * from '@hanzo/ui/registry'
export * from '@hanzo/ui/types'

// ============================================================
// LUX DESIGN SYSTEM
// ============================================================

export {
  luxTokens,
  luxTailwindTheme,
  luxTamaguiConfig,
  luxCSSVars,
  createLuxDesignSystem,
} from './system'

// ============================================================
// LUX-SPECIFIC COMPONENTS
// ============================================================

// Branding
export { default as Logo, type LogoVariant } from './components/logo'
export { default as Copyright } from './components/copyright'

// Layout
export { default as Header } from './components/header'
export { default as Footer } from './components/footer'
export { default as Main } from './components/main'
export { default as NotFound } from './components/not-found'

// Auth (Lux-specific UI on top of @hanzo/auth)
export { default as AuthListener } from './components/auth/auth-listener'
export { default as LoginPanel } from './components/auth/login-panel'
export { default as SignupPanel } from './components/auth/signup-panel'

// Commerce (Lux-specific UI on top of @hanzo/commerce)
export { default as BuyDrawer } from './components/commerce/drawer'
export { default as BuyButton } from './components/commerce/buy-button'
export { default as CheckoutButton } from './components/commerce/checkout-button'
export { default as CheckoutPanel } from './components/commerce/checkout-panel'

// Widgets
export { default as ChatWidget } from './components/chat-widget'
export { default as ContactDialog } from './components/contact-dialog'
export { default as MiniChart } from './components/mini-chart'
export { default as AccessCodeInput } from './components/access-code-input'

// Utilities
export { default as BackButton } from './components/back-button'
export { default as DrawerMargin } from './components/drawer-margin'
export { default as Analytics } from './components/analytics'
export { default as Tooltip } from './components/tooltip'
export { default as CalEmbed } from './components/cal-embed'

// Icons (Lux-specific)
export * as Icons from './components/icons'

// Third-party re-exports (for convenience)
export { default as EmblaAutoplay } from 'embla-carousel-autoplay'
