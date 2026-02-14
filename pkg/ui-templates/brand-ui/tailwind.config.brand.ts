/**
 * Brand Tailwind Configuration
 *
 * Uses unified --ui-* CSS variables (same across all brands).
 * Import brand colors CSS to provide values for these variables.
 *
 * Usage in your app's tailwind.config.js:
 *
 *   import brandPreset from '@brand/ui/tailwind.config.brand'
 *
 *   export default {
 *     presets: [brandPreset],
 *     // ... your app-specific config
 *   }
 */

import type { Config } from 'tailwindcss'
import { brandTailwindTheme } from './system'

const brandPreset: Partial<Config> = {
  darkMode: 'class',
  theme: {
    extend: {
      // Brand design tokens (spacing, typography, etc.)
      ...brandTailwindTheme,

      // Unified color system using --ui-* CSS variables
      colors: {
        background: 'var(--ui-bg-0)',
        foreground: 'var(--ui-fg-body)',
        accent: {
          DEFAULT: 'var(--ui-accent)',
          hover: 'var(--ui-accent-hover)',
          foreground: 'var(--ui-accent-fg)',
        },

        muted: {
          DEFAULT: 'var(--ui-fg-2)',
          foreground: 'var(--ui-fg-muted)',
        },

        primary: {
          DEFAULT: 'var(--ui-primary)',
          hover: 'var(--ui-primary-hover)',
          foreground: 'var(--ui-primary-fg)',
        },

        secondary: {
          DEFAULT: 'var(--ui-secondary)',
          hover: 'var(--ui-secondary-hover)',
          foreground: 'var(--ui-secondary-fg)',
        },

        destructive: {
          DEFAULT: 'var(--ui-destructive)',
          hover: 'var(--ui-destructive-hover)',
          foreground: 'var(--ui-destructive-fg)',
        },

        success: {
          DEFAULT: 'var(--ui-success)',
          hover: 'var(--ui-success-hover)',
          foreground: 'var(--ui-success-fg)',
        },

        warning: {
          DEFAULT: 'var(--ui-warning)',
          hover: 'var(--ui-warning-hover)',
          foreground: 'var(--ui-warning-fg)',
        },

        border: 'var(--ui-border)',
        input: 'var(--ui-border)',
        ring: 'var(--ui-ring)',

        // Elevation/surface levels
        level: {
          0: 'var(--ui-bg-0)',
          1: 'var(--ui-bg-1)',
          2: 'var(--ui-bg-2)',
          3: 'var(--ui-bg-3)',
        },

        // Foreground levels
        fg: {
          0: 'var(--ui-fg-0)',
          body: 'var(--ui-fg-body)',
          1: 'var(--ui-fg-1)',
          2: 'var(--ui-fg-2)',
          3: 'var(--ui-fg-3)',
          muted: 'var(--ui-fg-muted)',
        },

        // Navigation
        nav: {
          DEFAULT: 'var(--ui-nav)',
          hover: 'var(--ui-nav-hover)',
          current: 'var(--ui-nav-current)',
        },
      },

      // Radius
      borderRadius: {
        DEFAULT: 'var(--ui-radius)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/container-queries'),
  ],
}

export default brandPreset
