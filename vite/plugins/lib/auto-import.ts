// auto imports
import type { PluginOption } from 'vite'

import AutoImport from 'unplugin-auto-import/vite'

export function pluginAutoImport(): PluginOption {
  return AutoImport({
    imports: [
      'vue',
      'pinia',
      {
        '@dcloudio/uni-app': ['onLaunch', 'onLoad', 'onShow', 'onHide'],
        'uni-mini-router': ['useRouter', 'useRoute'],
        'alova': ['useRequest', 'useWatcher', 'useFetcher'],
        '@alova/scene-vue': ['usePagination'],
      },
    ],
    dirs: ['src/utils'],
    dts: 'types/plugin-auto-import.d.ts',
    resolvers: [],
  })
}
