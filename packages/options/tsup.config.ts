import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    types: 'src/types.ts',
    'symbol-search': 'src/symbol-search.tsx',
    'expiration-bar': 'src/expiration-bar.tsx',
    'options-chain': 'src/options-chain.tsx',
    'options-order-form': 'src/options-order-form.tsx',
    'positions-table': 'src/positions-table.tsx',
    'strategy-panel': 'src/strategy-panel.tsx',
  },
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: false,
  external: [/^react/, /^react-dom/],
  splitting: false,
  clean: true,
  target: 'es2020',
  outDir: 'dist',
  treeshake: true,
  banner: {
    js: '"use client";',
  },
})
