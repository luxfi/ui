/**
 * @luxfi/ui Primitives Wrapper
 *
 * Re-exports ALL primitives from @hanzo/ui.
 * No modifications - just pass-through.
 *
 * This ensures @luxfi/ui has full API compatibility with @hanzo/ui.
 */

// Re-export all primitives from @hanzo/ui
export * from '@hanzo/ui/primitives'

// Also export the button variants for convenience
export { buttonVariants } from '@hanzo/ui/primitives'
export { badgeVariants } from '@hanzo/ui/primitives'
export { toggleVariants } from '@hanzo/ui/primitives'
export { alertVariants } from '@hanzo/ui/primitives'
