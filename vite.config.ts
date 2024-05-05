import process from 'node:process'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import { vitePlugins } from './vite/plugins'

function warpperEnv(metaEnv: Record<string, string>): ImportMetaEnv {
  const warpperMetaEnv: Partial<ImportMetaEnv> = {}
  for (const key in metaEnv) {
    // boolean
    const booleanMap: Record<string, boolean> = {
      true: true,
      false: false,
    }

    // number
    const sameNumber = /^\d+$/g.test(metaEnv[key]) ? +metaEnv[key] : metaEnv[key]

    warpperMetaEnv[key] = booleanMap[metaEnv[key]] ?? sameNumber
  }
  return warpperMetaEnv as ImportMetaEnv
}

export default defineConfig(({ mode }) => {
  const root = process.cwd()
  const metaEnv = warpperEnv(loadEnv(mode, root, 'VITE_'))
  return {
    root,
    plugins: vitePlugins(metaEnv),
    resolve: {
      alias: {
        '@': path.join(process.cwd(), './src'),
        '#': path.join(process.cwd(), './types'),
      },
    },
    build: {
      target: 'es2015',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: metaEnv.VITE_APP_DELETE_CONSOLE,
          drop_debugger: metaEnv.VITE_APP_DELETE_CONSOLE,
        },
      },
    },
  }
})
