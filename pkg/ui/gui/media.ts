/**
 * Media queries for @luxfi/ui
 *
 * Responsive breakpoints matching Tailwind/shadcn conventions
 */

export const media = {
  // Mobile first breakpoints
  xs: { maxWidth: 639 },
  sm: { minWidth: 640 },
  md: { minWidth: 768 },
  lg: { minWidth: 1024 },
  xl: { minWidth: 1280 },
  xxl: { minWidth: 1536 },

  // Short height (for mobile landscape)
  short: { maxHeight: 820 },
  tall: { minHeight: 821 },

  // Touch devices
  pointerCoarse: { pointer: 'coarse' },
  pointerFine: { pointer: 'fine' },

  // Hover capability
  hoverNone: { hover: 'none' },
  hoverHover: { hover: 'hover' },

  // Reduced motion preference
  reducedMotion: { prefersReducedMotion: 'reduce' },

  // Platform detection
  web: true,
  native: false,
  ios: false,
  android: false,
}

export type MediaQueryKey = keyof typeof media
