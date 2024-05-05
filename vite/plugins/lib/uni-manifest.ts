import type { PluginOption } from 'vite'

import UniManifest from '@uni-helper/vite-plugin-uni-manifest'

export function pluginUniManifest(): PluginOption {
  return UniManifest()
}
