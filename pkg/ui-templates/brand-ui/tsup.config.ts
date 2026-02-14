import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'index.ts',
    'system/index.ts',
    'tailwind.config.brand.ts',
  ],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'next',
    '@hanzo/ui',
    '@hanzo/ui/*',
    '@brand/brand',
  ],
})
