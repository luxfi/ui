import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    chains: 'src/chains.ts',
    wagmi: 'src/wagmi.ts',
    explorer: 'src/explorer.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: false,
  external: [/^viem/, /^wagmi/, /^@wagmi/],
  splitting: false,
  clean: true,
  target: 'es2020',
  outDir: 'dist',
  treeshake: true,
})
