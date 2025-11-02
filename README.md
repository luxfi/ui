# @lux/ui

Accessible and customizable components for React, Vue, Svelte, and React Native. **Built on shadcn/ui with multi-framework support, 3D components, AI components, and advanced features.**

![hero](app/public/og.jpg)

## Features

- 🎯 **161+ Components** - 3x more than shadcn/ui
- 🌐 **Multi-Framework** - React, Vue, Svelte, React Native
- 🎨 **Two Themes** - Default & New York variants
- 🤖 **AI Components** - Chat, assistants, playground
- 🎮 **3D Components** - Interactive 3D elements
- ✨ **Animations** - Advanced motion components
- 🎛️ **Page Builder** - Visual drag-drop interface
- 🏷️ **White-Label** - Fork and rebrand easily
- 📦 **Blocks** - 24+ production-ready templates
- ♿ **Accessible** - Built with Radix UI primitives
- 🎭 **Customizable** - Tailwind CSS powered
- 📘 **TypeScript** - Fully typed

## Quick Start

### Installation

```bash
npm install @luxfi/ui
# or
pnpm add @luxfi/ui
```

### Usage

```tsx
import { Button, Card, Input } from '@luxfi/ui'

export function App() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Welcome</Card.Title>
      </Card.Header>
      <Card.Content>
        <Input placeholder="Enter text..." />
      </Card.Content>
      <Card.Footer>
        <Button>Submit</Button>
      </Card.Footer>
    </Card>
  )
}
```

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

## Documentation

📚 Visit **[ui.lux.finance](https://ui.lux.finance)** for:

- [Component Documentation](https://ui.lux.finance/docs/components)
- [Framework Guides](https://ui.lux.finance/docs/frameworks)
- [Installation Guide](https://ui.lux.finance/docs/installation)
- [Examples](https://ui.lux.finance/examples)
- [Page Builder](https://ui.lux.finance/builder)
- [Theme Generator](https://ui.lux.finance/theme-generator)

## CLI

Install components individually:

```bash
npx @luxfi/ui add button
npx @luxfi/ui add card dialog
```

## What's Different from shadcn/ui?

| Feature | shadcn/ui | @luxfi/ui |
|---------|-----------|-----------|
| Components | 58 | **161** |
| Frameworks | React only | React, Vue, Svelte, React Native |
| 3D Components | ❌ | ✅ (9 components) |
| AI Components | ❌ | ✅ (12 components) |
| Page Builder | ❌ | ✅ |
| White-Label | ❌ | ✅ |
| Blocks | Limited | **24+ templates** |

## Packages

- `@luxfi/ui` - Main UI library (161 components)
- `@luxfi/auth` - Authentication components
- `@luxfi/commerce` - E-commerce components
- `@luxfi/brand` - Branding system

## Examples

```tsx
// 3D Components
import { ThreeDButton, ThreeDCard } from '@luxfi/ui'

// AI Components
import { AIChat, AIAssistant } from '@luxfi/ui'

// Animations
import { AnimatedBeam, AnimatedText } from '@luxfi/ui'
```

## Development

```bash
# Clone repository
git clone https://github.com/luxfi/ui.git
cd ui

# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build packages
pnpm build

# Run tests
pnpm test
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md).

## License

MIT - See [LICENSE.md](./LICENSE.md) for details.

## Links

- [Documentation](https://ui.lux.finance)
- [GitHub](https://github.com/luxfi/ui)
- [npm](https://www.npmjs.com/package/@luxfi/ui)
- [Discord](https://discord.gg/lux)
- [Twitter](https://twitter.com/luxfi)

---

Built with ❤️ by [Lux Network](https://lux.network)
