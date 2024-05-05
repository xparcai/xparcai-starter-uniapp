import type { PluginOption } from 'vite'
import { pluginMetaEnv } from './lib/meta-env'
import { pluginUniPlatform } from './lib/uni-platform'
import { pluginUniManifest } from './lib/uni-manifest'
import { pluginUniPages } from './lib/uni-pages'
import { pluginUniLayouts } from './lib/uni-layouts'
import { pluginUniComponents } from './lib/uni-components'
import { pluginUniApp } from './lib/uni-app'
import { pluginAutoImport } from './lib/auto-import'
import { pluginUnoCSS } from './lib/unocss'
import { pluginIcons } from './lib/icons'

export function vitePlugins(_metaEnv: ImportMetaEnv): PluginOption[] {
  const plugins: PluginOption[] = []

  plugins.push(pluginMetaEnv())
  plugins.push(pluginUniPlatform())
  plugins.push(pluginUniManifest())
  plugins.push(pluginUniPages())
  plugins.push(pluginUniLayouts())
  plugins.push(pluginUniComponents())
  plugins.push(pluginUniApp())
  plugins.push(pluginAutoImport())
  plugins.push(pluginUnoCSS())
  plugins.push(pluginIcons())

  return plugins
}
