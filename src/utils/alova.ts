import { createAlova } from 'alova'
import AdapterUniApp from '@alova/adapter-uniapp'
import { getCache } from '@/utils/cache'

export const alovaInstance = createAlova({
  baseURL: import.meta.env.VITE_APP_REQUEST_BASE,
  ...AdapterUniApp(),
  beforeRequest: (method) => {
    uni.showLoading({
      title: '加载中',
    })

    if (!method.config.headers?.['Content-Type'])
      method.config.headers['Content-Type'] = 'application/json;charset:utf-8'

    method.config.headers.token = getCache('token')
  },
  responded: {
    onSuccess: (response: any) => {
      return new Promise((resolve, reject) => {
        try {
          if (response?.statusCode === 400) {
            uni.showToast({
              title: response?.data?.message,
              icon: 'none',
            })
            throw new Error(response?.data?.message)
          }
          else if (response?.statusCode === 401) {
            clearCache()
            uni.showToast({
              title: '暂无权限',
              icon: 'none',
            })
            throw new Error('暂无权限')
          }
          else if (response?.statusCode === 403) {
            clearCache()
            uni.showToast({
              title: '暂无权限',
              icon: 'none',
            })
            throw new Error('暂无权限')
          }
          else if (response?.statusCode === 404) {
            uni.showToast({
              title: '接口不存在',
              icon: 'none',
            })
            throw new Error('接口不存在')
          }
          else if (response?.statusCode === 500) {
            uni.showToast({
              title: '系统接口异常',
              icon: 'none',
            })
            throw new Error('系统接口异常')
          }
          else if (response?.data?.code === 401) {
            clearCache()
            uni.showToast({
              title: response?.data?.message,
              icon: 'none',
            })
            throw new Error(response?.data?.message)
          }
          else if (response?.data?.code === 403) {
            clearCache()
            uni.showToast({
              title: response?.data?.message || '暂无权限',
              icon: 'none',
            })
            throw new Error(response?.data?.message || '暂无权限')
          }
          else if (response?.data?.code === 400) {
            uni.showToast({
              title: response?.data?.message || '请求参数错误',
              icon: 'none',
            })
            throw new Error(response?.data?.message || '请求参数错误')
          }
          else if (response?.data?.code === 404) {
            uni.showToast({
              title: response?.data?.message || '接口不存在',
              icon: 'none',
            })
            throw new Error(response?.data?.message || '接口不存在')
          }
          else if (response?.data?.code === 500) {
            uni.showToast({
              title: response?.data?.message || '系统接口异常',
              icon: 'none',
            })
            throw new Error(response?.data?.message || '系统接口异常')
          }

          uni.hideLoading()
          resolve(response?.data?.data ?? response?.data)
        }
        catch (error) {
          reject(error)
        }
      })
    },
    onError: (response) => {
      return response
    },
  },
})
