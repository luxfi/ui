import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'use-chain': 'src/use-chain.ts',
    'use-nft-data': 'src/use-nft-data.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: false,
  external: [/^react/, /^@tanstack/, /^@luxfi/],
  splitting: false,
  clean: true,
  target: 'es2020',
  outDir: 'dist',
  treeshake: true,
  esbuildOptions(options) {
    options.jsx = 'automatic'
    options.platform = 'neutral'
  },
  banner: {
    js: '"use client";',
  },
})
