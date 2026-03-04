import { FrameworkPlugin, type Duplicis } from '@duplicis/core'
import { render, cloneElement, type JSX } from 'preact'
import { createRawSnippet, type Snippet } from 'svelte'
import Logo from './asset/preact.svg'

/**
 * Duplicis preact plugin.
 * @class
 */
export class PreactPlugin extends FrameworkPlugin<JSX.Element> {
  static override name = '@duplicis/plugin-preact'
  static override logo = Logo

  /**
   * Create framework component.
   * @param component JSX Component.
   * @param props     JSX Component props.
   * @returns         Duplicis plugin component.
   */
  static override component(
    component: JSX.Element | (() => JSX.Element),
    props?: Record<string, unknown>,
  ): Duplicis.PluginComponent<JSX.Element> {
    return {
      component: typeof component === 'function' ? component() : component,
      framework: this,
      props,
    }
  }

  /**
   * Wrap Preact JSX into a Svelte snippet.
   * @example
   * ```svelte
   * <script>
   *   const component = <div>Hello from Preact!</div>
   * </script>
   *
   * {@render PreactPlugin.instance.wrap(component)({ color: 'blue' })}
   * ```
   */
  override wrap(component: JSX.Element): Snippet<[any]> {
    return createRawSnippet((getProps) => {
      return {
        render: () => `<div></div>`,
        setup: (node: Element) => {
          // Get snippet props
          const props = typeof getProps === 'function' ? getProps() : undefined
          // Clone the JSX element & modify props
          const element = props ? cloneElement(component, props) : component
          // Mount JSX
          render(element, node)
          // Unmount JSX
          return () => {
            render(null, node)
          }
        },
      }
    })
  }
}

/** Preact plugin translations. */
export const i18n = PreactPlugin.translations({
  en: {
    display_name: 'preact',
    description: 'preact provider plugin.',
  },
  es: {
    display_name: 'preact',
    description: 'complemento de proveedor de preact.',
  },
  'pt-BR': {
    display_name: 'preact',
    description: 'plugin provedor preact.',
  },
})

export default PreactPlugin
