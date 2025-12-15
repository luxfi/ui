'use client'

import * as React from 'react'
import { cn } from '../lib/utils'
import { Moon, Sun, Monitor } from 'lucide-react'

type Theme = 'light' | 'dark' | 'system'

export interface ThemeSwitcherProps {
  /** Current theme */
  theme?: Theme
  /** Callback when theme changes */
  onThemeChange?: (theme: Theme) => void
  /** Variant style */
  variant?: 'buttons' | 'dropdown' | 'toggle'
  /** Additional class names */
  className?: string
}

/**
 * Theme switcher component
 *
 * Provides light/dark/system theme switching.
 * Integrates with next-themes or custom theme providers.
 *
 * @example
 * // With next-themes
 * const { theme, setTheme } = useTheme()
 * <ThemeSwitcher theme={theme} onThemeChange={setTheme} />
 *
 * // Simple toggle
 * <ThemeSwitcher variant="toggle" />
 */
export function ThemeSwitcher({
  theme: controlledTheme,
  onThemeChange,
  variant = 'buttons',
  className,
}: ThemeSwitcherProps) {
  const [internalTheme, setInternalTheme] = React.useState<Theme>('system')

  const theme = controlledTheme ?? internalTheme
  const setTheme = onThemeChange ?? setInternalTheme

  // Apply theme to document
  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const root = document.documentElement
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (theme === 'system') {
      root.classList.toggle('dark', systemDark)
    } else {
      root.classList.toggle('dark', theme === 'dark')
    }
  }, [theme])

  const themes: { value: Theme; icon: React.ReactNode; label: string }[] = [
    { value: 'light', icon: <Sun className="h-4 w-4" />, label: 'Light' },
    { value: 'dark', icon: <Moon className="h-4 w-4" />, label: 'Dark' },
    { value: 'system', icon: <Monitor className="h-4 w-4" />, label: 'System' },
  ]

  if (variant === 'toggle') {
    // Simple light/dark toggle
    const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches)

    return (
      <button
        type="button"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className={cn(
          'inline-flex items-center justify-center rounded-md p-2',
          'text-[var(--docs-fg-muted)] hover:text-[var(--docs-fg)]',
          'bg-[var(--docs-bg-muted)] hover:bg-[var(--docs-secondary-hover)]',
          'transition-colors',
          className
        )}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    )
  }

  if (variant === 'dropdown') {
    // Dropdown menu variant
    const [open, setOpen] = React.useState(false)
    const currentIcon = themes.find((t) => t.value === theme)?.icon

    return (
      <div className={cn('relative', className)}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cn(
            'inline-flex items-center justify-center rounded-md p-2',
            'text-[var(--docs-fg-muted)] hover:text-[var(--docs-fg)]',
            'bg-[var(--docs-bg-muted)] hover:bg-[var(--docs-secondary-hover)]',
            'transition-colors'
          )}
          aria-label="Change theme"
          aria-expanded={open}
        >
          {currentIcon}
        </button>

        {open && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />

            {/* Dropdown */}
            <div className="absolute right-0 top-full mt-2 z-50 min-w-[120px] rounded-md border border-[var(--docs-border)] bg-[var(--docs-bg)] shadow-lg">
              {themes.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => {
                    setTheme(t.value)
                    setOpen(false)
                  }}
                  className={cn(
                    'flex w-full items-center gap-2 px-3 py-2 text-sm',
                    'hover:bg-[var(--docs-bg-muted)] transition-colors',
                    theme === t.value
                      ? 'text-[var(--docs-primary)]'
                      : 'text-[var(--docs-fg)]'
                  )}
                >
                  {t.icon}
                  {t.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  // Button group variant (default)
  return (
    <div
      className={cn(
        'inline-flex rounded-md border border-[var(--docs-border)] p-1',
        'bg-[var(--docs-bg-muted)]',
        className
      )}
      role="group"
    >
      {themes.map((t) => (
        <button
          key={t.value}
          type="button"
          onClick={() => setTheme(t.value)}
          className={cn(
            'inline-flex items-center justify-center rounded px-3 py-1.5',
            'text-sm transition-colors',
            theme === t.value
              ? 'bg-[var(--docs-bg)] text-[var(--docs-fg)] shadow-sm'
              : 'text-[var(--docs-fg-muted)] hover:text-[var(--docs-fg)]'
          )}
          aria-label={t.label}
          aria-pressed={theme === t.value}
        >
          {t.icon}
          <span className="sr-only">{t.label}</span>
        </button>
      ))}
    </div>
  )
}
