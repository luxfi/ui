/**
 * Animation presets for @luxfi/ui
 *
 * Smooth, subtle animations for professional feel
 */
import { createAnimations } from '@tamagui/animations-css'

// CSS-based animations for web
export const animations = createAnimations({
  fast: 'ease-in-out 150ms',
  medium: 'ease-in-out 250ms',
  slow: 'ease-in-out 350ms',

  // Bouncy for interactive elements
  bouncy: 'cubic-bezier(0.68, -0.55, 0.265, 1.55) 300ms',

  // Smooth for modals/sheets
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1) 300ms',

  // Quick for micro-interactions
  quick: 'ease-out 100ms',

  // Lazy for background elements
  lazy: 'ease-in-out 500ms',

  // Tooltip animations
  tooltip: 'ease-out 200ms',

  // 100ms delay variant
  '100ms': 'ease-in-out 100ms',
  '200ms': 'ease-in-out 200ms',
  '300ms': 'ease-in-out 300ms',
})

// Animation presets for common use cases
export const animationPresets = {
  fadeIn: {
    opacity: 1,
    animation: 'fast',
  },
  fadeOut: {
    opacity: 0,
    animation: 'fast',
  },
  scaleIn: {
    scale: 1,
    opacity: 1,
    animation: 'bouncy',
  },
  scaleOut: {
    scale: 0.95,
    opacity: 0,
    animation: 'fast',
  },
  slideUp: {
    y: 0,
    opacity: 1,
    animation: 'smooth',
  },
  slideDown: {
    y: 10,
    opacity: 0,
    animation: 'smooth',
  },
}

export type AnimationName = keyof typeof animations
