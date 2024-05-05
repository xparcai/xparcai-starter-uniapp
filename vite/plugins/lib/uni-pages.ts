import type { PluginOption } from 'vite'

import UniPages from '@uni-helper/vite-plugin-uni-pages'

export function pluginUniPages(): PluginOption {
  return UniPages({
    dts: 'types/plugin-uni-pages.d.ts',
    exclude: ['**/components/**/**.*'],
    routeBlockLang: 'json5',
    homePage: 'pages/home/index', // 首页
    subPackages: [], // 子包
  })
}
