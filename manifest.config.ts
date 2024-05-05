import { cwd, env } from 'node:process'
import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'
import { loadEnv } from 'vite'

const mode = env.NODE_ENV || 'development'
const root = cwd()
const metaEnv = loadEnv(mode, root, 'VITE_') as unknown as ImportMetaEnv

export default defineManifestConfig({
  'name': metaEnv.VITE_APP_TITLE,
  'appid': metaEnv.VITE_UNI_APPID,
  'description': '',
  'versionName': '1.0.0',
  'versionCode': '100',
  'transformPx': false,
  'h5': {
    router: {
      base: metaEnv.VITE_APP_PUBLIC,
    },
  },
  'app-plus': {
    usingComponents: true,
    nvueStyleCompiler: 'uni-app',
    compilerVersion: 3,
    splashscreen: {
      alwaysShowBeforeRender: true,
      waiting: true,
      autoclose: true,
      delay: 0,
    },
    modules: {},
    distribute: {
      android: {
        permissions: [],
      },
      ios: {},
      sdkConfigs: {},
    },
  },
  'quickapp': {},
  'mp-weixin': {
    appid: metaEnv.VITE_MP_WX_APPID,
    setting: {
      urlCheck: false,
    },
    usingComponents: true,
  },
  'mp-alipay': {
    usingComponents: true,
  },
  'mp-baidu': {
    usingComponents: true,
  },
  'mp-toutiao': {
    usingComponents: true,
  },
  'uniStatistics': {
    enable: false,
  },
  'vueVersion': '3',
},
)
