import { isNull, isUndefined } from '@vtrbo/utils'

export function createCache(prefixKey: string = import.meta.env.VITE_APP_CACHE_PREFIX, timeout: number | null = null) {
  class Cache {
    private prefixKey: string

    constructor() {
      this.prefixKey = prefixKey
    }

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase()
    }

    set(key: string, value: any, expire: number | null = timeout) {
      try {
        const stringData = JSON.stringify({
          value,
          time: Date.now(),
          expire: !(isNull(expire) || isUndefined(expire)) ? new Date().getTime() + expire * 1000 : null,
        })
        uni.setStorageSync(this.getKey(key), stringData)
      }
      catch (err) {
        throw new Error(`setStorageSync error: ${err}`)
      }
    }

    get<T = any>(key: string, def: any = null): T {
      const val = uni.getStorageSync(this.getKey(key))
      if (!val)
        return def
      try {
        const data = JSON.parse(val)
        const { value, expire } = data
        if (!isNull(expire) && !isUndefined(expire) && expire < new Date().getTime()) {
          this.remove(key)
          return def
        }
        return value
      }
      catch (e) {
        return def
      }
    }

    remove(key: string) {
      uni.removeStorageSync(this.getKey(key))
    }

    clear(): void {
      uni.clearStorageSync()
    }
  }

  return new Cache()
}

const cache = createCache(import.meta.env.VITE_APP_CACHE_PREFIX)

export function setCache(key: string, value: any, expire?: number | null): void {
  cache.set(key, value, expire)
}

export function getCache<T = any>(key: string): T {
  return cache.get<T>(key)
}

export function removeCache(key: string): void {
  return cache.remove(key)
}

export function clearCache(): void {
  return cache.clear()
}
