import type { PluginOption } from 'vite'

import UniApp from '@dcloudio/vite-plugin-uni'

export function pluginUniApp(): PluginOption {
  return UniApp()
}
