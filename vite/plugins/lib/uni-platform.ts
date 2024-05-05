import type { PluginOption } from 'vite'

import UniPlatform from '@uni-helper/vite-plugin-uni-platform'

export function pluginUniPlatform(): PluginOption {
  return UniPlatform()
}
