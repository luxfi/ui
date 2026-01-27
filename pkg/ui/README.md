# @luxfi/ui

Unified Tamagui UI library for Lux - web and mobile. Cross-platform components with shadcn patterns and React Native support.

## Version 0.1.0

## Features

- **Tamagui-powered** - Cross-platform styling for web and React Native
- **161+ Components** - Comprehensive component library
- **Multi-Framework** - React, Vue, Svelte, React Native support
- **Monochrome Design** - Clean, professional shadcn-style theming
- **Type-safe** - Full TypeScript support

## Installation

```bash
npm install @luxfi/ui
# or
pnpm add @luxfi/ui
# or
yarn add @luxfi/ui
```

## Quick Start

### Web (React)

```tsx
import { Button, Card, Input } from '@luxfi/ui'

function App() {
  return (
    <Card>
      <Input placeholder="Enter text..." />
      <Button>Submit</Button>
    </Card>
  )
}
```

### React Native

```tsx
import { Button, Card, Text } from '@luxfi/ui/react-native'
import { TamaguiProvider } from 'tamagui'
import { config } from '@luxfi/ui/tamagui/config'

function App() {
  return (
    <TamaguiProvider config={config}>
      <Card>
        <Text>Hello Lux</Text>
        <Button>Press me</Button>
      </Card>
    </TamaguiProvider>
  )
}
```

## Tamagui Configuration

@luxfi/ui includes a complete Tamagui configuration with tokens, themes, and animations.

```tsx
// Import the config
import { config } from '@luxfi/ui/tamagui/config'

// Or import individual pieces
import { tokens } from '@luxfi/ui/tamagui/tokens'
import { themes } from '@luxfi/ui/tamagui/themes'
import { colors } from '@luxfi/ui/tamagui/colors'
import { fonts } from '@luxfi/ui/tamagui/fonts'
import { animations } from '@luxfi/ui/tamagui/animations'
```

### Using with TamaguiProvider

```tsx
import { TamaguiProvider } from 'tamagui'
import { config } from '@luxfi/ui/tamagui/config'

function Root() {
  return (
    <TamaguiProvider config={config} defaultTheme="dark">
      <App />
    </TamaguiProvider>
  )
}
```

## Design System

### Colors

Monochrome design with semantic accents:

```tsx
// Base colors
colors.black    // #000000
colors.white    // #FFFFFF

// Gray scale
colors.gray100  // #F4F4F5
colors.gray500  // #71717A
colors.gray900  // #18181B

// Semantic
colors.success  // #22C55E
colors.error    // #EF4444
colors.warning  // #F59E0B
colors.info     // #3B82F6
```

### Themes

Dark-first design with light theme support:

```tsx
// Dark theme (default)
themes.dark.background   // black
themes.dark.color        // white
themes.dark.card         // gray900

// Light theme
themes.light.background  // white
themes.light.color       // black
themes.light.card        // white
```

### Spacing Tokens

```tsx
// Available spacing tokens
spacing.spacing4   // 4px
spacing.spacing8   // 8px
spacing.spacing16  // 16px
spacing.spacing24  // 24px
spacing.spacing32  // 32px
// ... and more
```

## Components

### Primitives

Core UI components based on Radix UI primitives:

- Accordion, Alert, AlertDialog, Avatar, Badge
- Button, Calendar, Card, Carousel, Checkbox
- Dialog, Drawer, DropdownMenu, Form
- Input, InputOTP, Label, Popover, Progress
- RadioGroup, ScrollArea, Select, Sheet
- Skeleton, Slider, Switch, Table, Tabs
- TextArea, Toast, Toggle, Tooltip

### Blocks

Production-ready templates:

- Sidebar layouts (16 variants)
- Calendar views (32 variants)
- Dashboard layouts
- Auth flows (Login, Signup, OTP)

### Assets

Icon components for AI providers, file types, and more.

## Multi-Framework Support

```tsx
// React (default)
import { Button } from '@luxfi/ui'

// Vue
import { Button } from '@luxfi/ui/vue'

// Svelte
import { Button } from '@luxfi/ui/svelte'

// React Native
import { Button } from '@luxfi/ui/react-native'
```

## CLI

Install components individually:

```bash
npx @luxfi/ui add button
npx @luxfi/ui add card dialog
```

## Migration from @hanzo/ui

@luxfi/ui is a migration target from @hanzo/ui. To migrate:

1. Update imports from `@hanzo/ui` to `@luxfi/ui`
2. Update theme colors to monochrome palette
3. Add TamaguiProvider for cross-platform support

## Dependencies

Key peer dependencies:
- React 18.3.1+
- React DOM 18.3.1+
- tamagui ^1.141.5 (for cross-platform)
- lucide-react 0.456.0
- next-themes ^0.2.1

## License

MIT

## Author

Lux Partners

## Repository

https://github.com/luxfi/ui
