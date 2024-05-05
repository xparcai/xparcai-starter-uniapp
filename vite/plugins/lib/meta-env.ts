import type { PluginOption } from 'vite'

import MetaEnv from 'vite-plugin-meta-env-dts'

export function pluginMetaEnv(): PluginOption {
  return MetaEnv({
    dts: 'types/plugin-meta-env.d.ts',
  }) as PluginOption
}
