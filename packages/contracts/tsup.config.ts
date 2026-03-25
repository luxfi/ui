import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    addresses: 'src/addresses.ts',
    abis: 'src/abis.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: false,
  external: [/^viem/],
  splitting: false,
  clean: true,
  target: 'es2020',
  outDir: 'dist',
  treeshake: true,
})
