# @duplicis/preact-plugin

<p align="center">
  <img alt="Duplicis logo" src="https://duplicis.app/logo.svg" width="33%" />
</p>
<p align="center">Duplicis preact plugin.</p>

Preact framework plugin for Duplicis!

Reasonably simple example for creating your own FrameworkPlugins.

## Usage:

### Installation:

TODO: plugin-preact npm link!

### Building:

Ensure you mark this plugin and preacts runtime as external.

<details>
  <summary>Vite</summary>

```ts
import { defineConfig } from 'vite'

// plugins
import duplicis from '@duplicis/config/vite'
import preact from '@preact/preset-vite'

// build config
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['@duplicis/plugin-settings', 'preact/jsx-runtime'],
    },
  },
  plugins: [duplicis({ index: './src/index.tsx' }), preact()],
})
```

</details>

<details>
  <summary>Rollup</summary>

```ts
import { defineConfig } from '@duplicis/config/rollup'

// plugins
import alias from '@preact/preset-vite'

// build config
export default defineConfig({
  input: { index: './src/index.tsx' },
  output: {
    dir: './dist',
    format: 'es',
  },
  external: ['@duplicis/plugin-settings', 'preact/jsx-runtime'],
  plugins: [
    alias({
      entries: [
        { find: 'react', replacement: 'preact/compat' },
        { find: 'react-dom/test-utils', replacement: 'preact/test-utils' },
        { find: 'react-dom', replacement: 'preact/compat' },
        { find: 'react/jsx-runtime', replacement: 'preact/jsx-runtime' },
      ],
    }),
  ],
})
```

</details>

### Usage

```ts
import { Plugin } from '@duplicis/core'
import { PreactPlugin } from '@duplicis/plugin-preact'

/**
 * My plugin icon.
 * @returns Icon
 */
export const Icon = () => <p>🚀</p>

/**
 * My plugin menu.
 * @returns Menu
 */
export const Menu = () => {
  return (
    <div>
      <h2>Hello from the menu!</h2>
    </div>
  )
}

/**
 * Example plugin.
 * @class
 */
export class MyPlugin extends Plugin {
  static override icon = PreactPlugin.component(Icon)
  static override menu = PreactPlugin.component(Menu)
  static override name = 'my-plugin-name'

  override async onLoad() {
    console.log(`Let's do this!`)
  }

  override async onExit() {
    console.log('Oh... well, at least I have chicken...')
  }
}

export default MyPlugin
```
