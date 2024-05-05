import process from 'node:process'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export const staticIconKey: string = 'icon'

export const localIconCollections = {
  [staticIconKey]: FileSystemIconLoader(
    'src/static/icons',
    svg => svg
      .replace(/width=".*?"/g, '')
      .replace(/height=".*?"/g, ''),
  ),
}

export const isH5 = process.env?.UNI_PLATFORM === 'h5'
export const isMp = process.env?.UNI_PLATFORM?.startsWith('mp') ?? false
