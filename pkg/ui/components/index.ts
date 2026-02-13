// Component exports
// This file provides a central import point for all UI components
// Usage: import { Button, Card, cn } from '@luxfi/ui/components'

// Export commonly used utilities
export { cn, formatDate, absoluteUrl } from '../src/utils'

// Re-export all primitives as components for backward compatibility
export * from '../primitives/index-next'

// Lux-specific components
export { default as AccessCodeInput } from './access-code-input'
export { default as ChatWidget } from './chat-widget'
export { default as ContactDialog } from './contact-dialog'
export { default as Copyright} from './copyright'
export { default as Footer } from './footer'
export { default as Header } from './header'
export * as Icons from './icons'
export { default as Logo, type LogoVariant } from './logo'
export { default as Main } from './main'
export { default as MiniChart } from './mini-chart'
export { default as NotFound } from './not-found'

// Auth components
export { default as AuthListener } from './auth/auth-listener'
export { default as LoginPanel } from './auth/login-panel'
export { default as SignupPanel } from './auth/signup-panel'

// Commerce components
export { default as BuyDrawer } from './commerce/drawer'
export { default as BuyButton } from './commerce/buy-button'
export { default as CheckoutButton } from './commerce/checkout-button'
export { default as CheckoutPanel } from './commerce/checkout-panel'

// Utility components
export { default as BackButton } from './back-button'
export { default as DrawerMargin } from './drawer-margin'
export { default as Analytics } from './analytics'
export { default as Tooltip } from './tooltip'
export { default as CalEmbed } from './cal-embed'

// Third-party re-exports
export { default as EmblaAutoplay } from 'embla-carousel-autoplay'
