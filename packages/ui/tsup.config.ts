import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'index': 'src/index.ts',
    'utils': 'src/utils.ts',
    'accordion': 'src/accordion.tsx',
    'alert': 'src/alert.tsx',
    'avatar': 'src/avatar.tsx',
    'badge': 'src/badge.tsx',
    'button': 'src/button.tsx',
    'checkbox': 'src/checkbox.tsx',
    'close-button': 'src/close-button.tsx',
    'collapsible': 'src/collapsible.tsx',
    'color-mode': 'src/color-mode.tsx',
    'dialog': 'src/dialog.tsx',
    'drawer': 'src/drawer.tsx',
    'empty-state': 'src/empty-state.tsx',
    'field': 'src/field.tsx',
    'heading': 'src/heading.tsx',
    'icon-button': 'src/icon-button.tsx',
    'image': 'src/image.tsx',
    'input': 'src/input.tsx',
    'input-group': 'src/input-group.tsx',
    'link': 'src/link.tsx',
    'menu': 'src/menu.tsx',
    'pin-input': 'src/pin-input.tsx',
    'popover': 'src/popover.tsx',
    'progress': 'src/progress.tsx',
    'progress-circle': 'src/progress-circle.tsx',
    'radio': 'src/radio.tsx',
    'rating': 'src/rating.tsx',
    'select': 'src/select.tsx',
    'separator': 'src/separator.tsx',
    'skeleton': 'src/skeleton.tsx',
    'slider': 'src/slider.tsx',
    'switch': 'src/switch.tsx',
    'table': 'src/table.tsx',
    'tabs': 'src/tabs.tsx',
    'tag': 'src/tag.tsx',
    'textarea': 'src/textarea.tsx',
    'toaster': 'src/toaster.tsx',
    'tooltip': 'src/tooltip.tsx',
    'provider': 'src/provider.tsx',
  },
  format: ['cjs', 'esm'],
  dts: false, // Requires pnpm install to complete; generate with tsc separately
  sourcemap: false,
  external: [
    /^react/,
    /^@radix-ui/,
    '@uidotdev/usehooks',
    'class-variance-authority',
    'clsx',
    'es-toolkit',
    'react-icons/lu',
    'tailwind-merge',
    'sonner',
  ],
  splitting: false,
  clean: true,
  target: 'es2020',
  outDir: 'dist',
  treeshake: true,
  esbuildOptions(options) {
    options.jsx = 'automatic';
    options.platform = 'neutral';
  },
  async onSuccess() {
    // Add 'use client' directive to all JS/MJS/CJS files
    const { readdirSync, readFileSync, writeFileSync } = await import('fs');
    const { join } = await import('path');
    const dir = './dist';
    for (const file of readdirSync(dir)) {
      if (file === 'utils.js' || file === 'utils.cjs') continue; // utils is server-safe
      if (file.endsWith('.js') || file.endsWith('.cjs')) {
        const filePath = join(dir, file);
        const content = readFileSync(filePath, 'utf-8');
        if (!content.startsWith('"use client"')) {
          writeFileSync(filePath, `"use client";\n${content}`);
        }
      }
    }
  },
});
