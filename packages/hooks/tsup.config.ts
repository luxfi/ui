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
  async onSuccess() {
    const { readdirSync, readFileSync, writeFileSync } = await import('fs')
    const { join } = await import('path')
    const dir = './dist'
    for (const file of readdirSync(dir)) {
      if (file.endsWith('.js') || file.endsWith('.cjs')) {
        const filePath = join(dir, file)
        const content = readFileSync(filePath, 'utf-8')
        if (!content.startsWith('"use client"')) {
          writeFileSync(filePath, `"use client";\n${content}`)
        }
      }
    }
  },
})
