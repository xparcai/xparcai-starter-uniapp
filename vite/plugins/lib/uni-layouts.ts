import type { PluginOption } from 'vite'

import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'

export function pluginUniLayouts(): PluginOption {
  return UniLayouts()
}
