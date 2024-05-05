import type { PluginOption } from 'vite'

import UniComponents from '@uni-helper/vite-plugin-uni-components'

export function pluginUniComponents(): PluginOption {
  return UniComponents({
    dirs: ['src/components'],
    dts: 'types/plugin-vue-components.d.ts',
    resolvers: [
      (componentName) => {
        if (['mp-html', 'MpHtml', 'mpHtml'].includes(componentName))
          return { name: componentName, from: 'mp-html/dist/uni-app/components/mp-html/mp-html.vue' }
      },
    ],
  })
}
