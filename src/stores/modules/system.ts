import { defineStore } from 'pinia'

interface SystemState {
  screenHeight: number
  statusBarHeight: number
  navBarHeight: number
  navHeight: number
  tabHeight: number
  safeBottomHeight: number
  tabBarHeight: number
  tabPageHeight: number
}

export const useSystemStore = defineStore(
  'system',
  {
    state: (): SystemState => ({
      screenHeight: 0,
      statusBarHeight: 0,
      navBarHeight: 0,
      navHeight: 0,
      tabHeight: 0,
      safeBottomHeight: 0,
      tabBarHeight: 0,
      tabPageHeight: 0,
    }),
    actions: {
      setSystemInfo(systemInfo: UniApp.GetSystemInfoResult) {
        console.log('系统信息 => ', systemInfo)

        // 屏幕高度
        const screenHeight = systemInfo?.screenHeight ?? 0
        console.log('屏幕高度 => ', screenHeight)

        // 状态栏高度
        const statusBarHeight = systemInfo?.statusBarHeight ?? 0
        console.log('状态栏高度 => ', statusBarHeight)

        // 导航栏高度
        let navBarHeight = 40
        console.log('导航栏高度 => ', navBarHeight)

        // #ifdef MP-WEIXIN
        // 微信小程序胶囊位置
        const capsule = wx.getMenuButtonBoundingClientRect()
        navBarHeight = capsule.height + (capsule.top - statusBarHeight) * 2
        // #endif

        // 顶部总高度
        const navHeight = statusBarHeight + navBarHeight
        console.log('顶部总高度 => ', navHeight)

        // 底部安全区高度
        const safeBottomHeight = screenHeight - (systemInfo?.safeArea?.bottom ?? screenHeight)
        console.log('底部安全区高度 => ', safeBottomHeight)

        // 底部导航栏高度
        let tabBarHeight = screenHeight - (systemInfo?.windowHeight ?? screenHeight) - safeBottomHeight
        // #ifdef H5
        tabBarHeight = 50
        // #endif
        console.log('底部导航栏高度 => ', tabBarHeight)

        // 底部总高度
        const tabHeight = tabBarHeight + safeBottomHeight
        console.log('底部总高度 => ', tabHeight)

        // 导航页面高度
        const tabPageHeight = screenHeight - navHeight - tabHeight
        console.log('导航页面高度 => ', tabPageHeight)

        this.$patch({
          screenHeight,
          statusBarHeight,
          navBarHeight,
          navHeight,
          tabHeight,
          safeBottomHeight,
          tabBarHeight,
          tabPageHeight,
        })
      },
    },
  },
)
