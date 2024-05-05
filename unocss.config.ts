import type { Preset } from 'unocss'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import {
  presetApplet,
  presetRemRpx,
  transformerApplet,
  transformerAttributify,
} from 'unocss-applet'

import { isH5, isMp, localIconCollections } from './vite/utils'

const presets: Preset[] = []
if (!isMp)
  presets.push(presetAttributify())

if (!isH5)
  presets.push(presetRemRpx())

export default defineConfig({
  presets: [
    presetApplet({ enable: !isH5 }),
    ...presets,
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      autoInstall: true,
      collections: localIconCollections,
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    transformerAttributify(),
    transformerApplet(),
  ],
  rules: [
    // 安全区
    ['p-safe', {
      padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
    }],
    ['pt-safe', { 'padding-top': 'env(safe-area-inset-top)' }],
    ['pr-safe', { 'padding-right': 'env(safe-area-inset-right)' }],
    ['pb-safe', { 'padding-bottom': 'env(safe-area-inset-bottom)' }],
    ['pl-safe', { 'padding-left': 'env(safe-area-inset-left)' }],

    // 分散对齐
    ['text-disperse', {
      'text-align': 'justify',
      'text-justify': 'distribute-all-lines',
      'text-align-last': 'left',
      'word-break': 'break-all',
      'white-space': 'pre-wrap',
    }],

    // 阴影
    ['cp-shadow', {
      'box-shadow': '10rpx 16rpx 54rpx 0rpx rgba(34,34,34,0.03)',
    }],
  ],
  shortcuts: [],
})
