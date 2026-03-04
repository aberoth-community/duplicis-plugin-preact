import { defineConfig } from 'vite'
import { duplicis } from '@duplicis/config/vite'

export default defineConfig({
  plugins: [
    duplicis({
      index: './src/index.ts',
      'preact/index': './src/preact/index.ts',
      'preact/jsx-runtime': './src/preact/jsx-runtime.ts',
    }),
  ],
})
