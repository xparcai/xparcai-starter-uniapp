import type { PluginOption } from 'vite'

import UnoCSS from 'unocss/vite'

export function pluginUnoCSS(): PluginOption {
  return UnoCSS()
}
