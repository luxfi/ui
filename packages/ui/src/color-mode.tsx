'use client';

import * as React from 'react';

export type ColorMode = 'light' | 'dark';

// ---------------------------------------------------------------------------
// Context — framework-agnostic color mode via React context.
// Consumers (Next.js apps, Vite apps, etc.) wrap with their own theme provider
// and pass the resolved color mode + setter into this context.
// ---------------------------------------------------------------------------

interface ColorModeContextValue {
  readonly colorMode: ColorMode;
  readonly setColorMode: (mode: string) => void;
  readonly toggleColorMode: () => void;
}

const ColorModeContext = React.createContext<ColorModeContextValue | undefined>(undefined);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export interface ColorModeProviderProps {
  readonly children?: React.ReactNode;
  /** Initial/default color mode. Defaults to 'light'. */
  readonly defaultTheme?: string;
  /** Controlled color mode value from an external theme provider. */
  readonly value?: string;
  /** Called when the color mode changes. */
  readonly onValueChange?: (mode: string) => void;
  /** Any extra props are accepted and ignored for compat with next-themes ThemeProviderProps. */
  readonly [key: string]: unknown;
}

export function ColorModeProvider(props: ColorModeProviderProps) {
  const { children, defaultTheme = 'light', value: controlledValue, onValueChange } = props;

  const [ internalMode, setInternalMode ] = React.useState<ColorMode>(() => {
    // SSR-safe: check document.documentElement for existing class
    if (controlledValue === 'dark' || controlledValue === 'light') {
      return controlledValue;
    }
    if (typeof document !== 'undefined') {
      if (document.documentElement.classList.contains('dark')) return 'dark';
    }
    return (defaultTheme === 'dark' ? 'dark' : 'light');
  });

  const colorMode = (controlledValue === 'dark' || controlledValue === 'light')
    ? controlledValue
    : internalMode;

  const setColorMode = React.useCallback((mode: string) => {
    const resolved = mode === 'dark' ? 'dark' : 'light';
    setInternalMode(resolved);
    onValueChange?.(resolved);
    // Sync class on documentElement
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', resolved === 'dark');
      document.documentElement.classList.toggle('light', resolved === 'light');
    }
  }, [ onValueChange ]);

  const toggleColorMode = React.useCallback(() => {
    setColorMode(colorMode === 'dark' ? 'light' : 'dark');
  }, [ colorMode, setColorMode ]);

  const ctx = React.useMemo<ColorModeContextValue>(
    () => ({ colorMode, setColorMode, toggleColorMode }),
    [ colorMode, setColorMode, toggleColorMode ],
  );

  return (
    <ColorModeContext.Provider value={ ctx }>
      { children }
    </ColorModeContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

export function useColorMode(): ColorModeContextValue {
  const ctx = React.useContext(ColorModeContext);
  if (!ctx) {
    // Fallback: if no provider is mounted, return a noop implementation
    // that reads from the document class. This allows components to work
    // without an explicit provider (e.g., in Storybook, tests).
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [ mode, setMode ] = React.useState<ColorMode>(() => {
      if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
        return 'dark';
      }
      return 'light';
    });
    return {
      colorMode: mode,
      setColorMode: (m: string) => {
        const resolved = m === 'dark' ? 'dark' : 'light';
        setMode(resolved);
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark', resolved === 'dark');
          document.documentElement.classList.toggle('light', resolved === 'light');
        }
      },
      toggleColorMode: () => {
        const next = mode === 'dark' ? 'light' : 'dark';
        setMode(next);
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark', next === 'dark');
          document.documentElement.classList.toggle('light', next === 'light');
        }
      },
    };
  }
  return ctx;
}

export function useColorModeValue<T>(light: T, dark: T): T {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? dark : light;
}
