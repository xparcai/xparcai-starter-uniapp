import type { PluginOption } from 'vite'

import Icons from 'unplugin-icons/vite'
import { localIconCollections } from '../../utils'

export function pluginIcons(): PluginOption {
  return Icons({
    scale: 1,
    defaultClass: 'svg-icon',
    defaultStyle: 'display: inline-block; vertical-align: middle;',
    compiler: 'vue3',
    autoInstall: true,
    customCollections: localIconCollections,
  })
}
