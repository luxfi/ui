/**
 * @hanzo/docs-theme - Tailwind CSS Preset
 *
 * Use this preset to integrate the docs theme with your Tailwind configuration.
 *
 * @example
 * // tailwind.config.ts
 * import docsPreset from '@hanzo/docs-theme/tailwind-preset'
 *
 * export default {
 *   presets: [docsPreset],
 *   content: [...],
 * }
 */

import type { Config } from 'tailwindcss'

const docsThemePreset: Partial<Config> = {
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        // Map CSS variables to Tailwind colors
        docs: {
          bg: {
            DEFAULT: 'var(--docs-bg)',
            subtle: 'var(--docs-bg-subtle)',
            muted: 'var(--docs-bg-muted)',
            overlay: 'var(--docs-bg-overlay)',
          },
          fg: {
            DEFAULT: 'var(--docs-fg)',
            subtle: 'var(--docs-fg-subtle)',
            muted: 'var(--docs-fg-muted)',
            'on-primary': 'var(--docs-fg-on-primary)',
          },
          primary: {
            DEFAULT: 'var(--docs-primary)',
            hover: 'var(--docs-primary-hover)',
            subtle: 'var(--docs-primary-subtle)',
          },
          secondary: {
            DEFAULT: 'var(--docs-secondary)',
            hover: 'var(--docs-secondary-hover)',
            fg: 'var(--docs-secondary-fg)',
          },
          accent: {
            DEFAULT: 'var(--docs-accent)',
            hover: 'var(--docs-accent-hover)',
            fg: 'var(--docs-accent-fg)',
          },
          border: {
            DEFAULT: 'var(--docs-border)',
            strong: 'var(--docs-border-strong)',
          },
          input: 'var(--docs-input)',
          ring: 'var(--docs-ring)',
          sidebar: {
            bg: 'var(--docs-sidebar-bg)',
            fg: 'var(--docs-sidebar-fg)',
            border: 'var(--docs-sidebar-border)',
            'item-hover': 'var(--docs-sidebar-item-hover)',
            'item-active': 'var(--docs-sidebar-item-active)',
            'item-active-fg': 'var(--docs-sidebar-item-active-fg)',
          },
          code: {
            bg: 'var(--docs-code-bg)',
            border: 'var(--docs-code-border)',
            fg: 'var(--docs-code-fg)',
          },
          info: {
            DEFAULT: 'var(--docs-info)',
            bg: 'var(--docs-info-bg)',
          },
          warning: {
            DEFAULT: 'var(--docs-warning)',
            bg: 'var(--docs-warning-bg)',
          },
          error: {
            DEFAULT: 'var(--docs-error)',
            bg: 'var(--docs-error-bg)',
          },
          success: {
            DEFAULT: 'var(--docs-success)',
            bg: 'var(--docs-success-bg)',
          },
          chart: {
            1: 'var(--docs-chart-1)',
            2: 'var(--docs-chart-2)',
            3: 'var(--docs-chart-3)',
            4: 'var(--docs-chart-4)',
            5: 'var(--docs-chart-5)',
          },
        },
      },

      borderRadius: {
        docs: 'var(--docs-radius)',
        'docs-sm': 'var(--docs-radius-sm)',
        'docs-md': 'var(--docs-radius-md)',
        'docs-lg': 'var(--docs-radius-lg)',
        'docs-xl': 'var(--docs-radius-xl)',
      },

      spacing: {
        'docs-sidebar': 'var(--docs-sidebar-width)',
        'docs-toc': 'var(--docs-toc-width)',
        'docs-header': 'var(--docs-header-height)',
      },

      maxWidth: {
        'docs-content': 'var(--docs-content-max-width)',
      },

      fontFamily: {
        'docs-sans': 'var(--docs-font-sans)',
        'docs-mono': 'var(--docs-font-mono)',
      },

      transitionDuration: {
        'docs-fast': 'var(--docs-transition-fast)',
        'docs-normal': 'var(--docs-transition-normal)',
        'docs-slow': 'var(--docs-transition-slow)',
      },

      zIndex: {
        'docs-header': 'var(--docs-z-header)',
        'docs-sidebar': 'var(--docs-z-sidebar)',
        'docs-overlay': 'var(--docs-z-overlay)',
        'docs-modal': 'var(--docs-z-modal)',
      },

      // Animations
      keyframes: {
        'docs-fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'docs-slide-up': {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'docs-slide-down': {
          from: { transform: 'translateY(-10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },

      animation: {
        'docs-fade-in': 'docs-fade-in var(--docs-transition-normal) ease-out',
        'docs-slide-up': 'docs-slide-up var(--docs-transition-normal) ease-out',
        'docs-slide-down': 'docs-slide-down var(--docs-transition-normal) ease-out',
      },
    },
  },
}

export default docsThemePreset
